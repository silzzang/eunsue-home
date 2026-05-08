const TARGET_LOCALES = ["en", "zh", "vi", "ne"];

const TARGET_LABELS = {
  en: "English",
  zh: "中文",
  vi: "Tiếng Việt",
  ne: "नेपाली",
};

const MYMEMORY_LOCALES = {
  en: "en-US",
  zh: "zh-CN",
  vi: "vi-VN",
  ne: "ne-NP",
};

const STRING_KEYS = [
  "brandTitle",
  "brandTag",
  "navHome",
  "navResearch",
  "navCourses",
  "navUpdates",
  "heroEyebrow",
  "heroTitle",
  "heroLead",
  "highlightsAriaLabel",
  "inquiryAriaLabel",
  "adminLinkLabel",
  "researchLabel",
  "researchNote",
  "coursesLabel",
  "coursesNote",
  "contactLabel",
  "contactHours",
  "contactOffice",
  "updatesKicker",
  "updatesDesc",
  "ctaTitle",
  "ctaDesc",
  "ctaButton",
  "collaborationSubject",
];

const ARRAY_KEYS = ["researchItems", "courseItems"];

function decodeHtmlEntities(text) {
  if (typeof text !== "string") return text;
  return text
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

async function translateText(text, targetLocale) {
  if (typeof text !== "string" || !text.trim()) return text;

  const params = new URLSearchParams({
    q: text,
    langpair: `ko-KR|${MYMEMORY_LOCALES[targetLocale]}`,
  });

  const res = await fetch(`https://api.mymemory.translated.net/get?${params.toString()}`);
  if (!res.ok) throw new Error(`번역 API 오류: HTTP ${res.status}`);

  const data = await res.json();
  if (data?.responseStatus && Number(data.responseStatus) !== 200) {
    throw new Error(data?.responseDetails || "번역 API 응답 오류");
  }
  if (data?.quotaFinished) {
    throw new Error("무료 번역 API 일일 사용량을 초과했습니다. 내일 다시 시도해 주세요.");
  }

  const translated = data?.responseData?.translatedText;
  if (typeof translated !== "string" || !translated.trim()) {
    throw new Error("번역 결과가 비어 있습니다.");
  }
  return decodeHtmlEntities(translated);
}

function collectTasks(koSegment) {
  const tasks = [];

  for (const key of STRING_KEYS) {
    const value = koSegment[key];
    if (typeof value === "string" && value.trim()) {
      tasks.push({ path: [key], text: value });
    }
  }

  for (const key of ARRAY_KEYS) {
    const items = koSegment[key];
    if (!Array.isArray(items)) continue;
    items.forEach((text, index) => {
      if (typeof text === "string" && text.trim()) {
        tasks.push({ path: [key, index], text });
      }
    });
  }

  if (Array.isArray(koSegment.newsItems)) {
    koSegment.newsItems.forEach((item, index) => {
      if (typeof item?.title === "string" && item.title.trim()) {
        tasks.push({ path: ["newsItems", index, "title"], text: item.title });
      }
      if (typeof item?.detail === "string" && item.detail.trim()) {
        tasks.push({ path: ["newsItems", index, "detail"], text: item.detail });
      }
    });
  }

  return tasks;
}

function setByPath(target, path, value) {
  let cur = target;
  for (let i = 0; i < path.length - 1; i += 1) {
    cur = cur[path[i]];
  }
  cur[path[path.length - 1]] = value;
}

async function translateSegment(koSegment, targetLocale, onProgress) {
  const translatedSegment = structuredClone(koSegment);
  const tasks = collectTasks(koSegment);

  if (Array.isArray(translatedSegment.newsItems)) {
    translatedSegment.newsItems = translatedSegment.newsItems.map((item) => ({
      ...item,
    }));
  }

  for (let i = 0; i < tasks.length; i += 1) {
    const task = tasks[i];
    const translated = await translateText(task.text, targetLocale);
    setByPath(translatedSegment, task.path, translated);
    onProgress?.({ locale: targetLocale, done: i + 1, total: tasks.length });
  }

  return translatedSegment;
}

export async function translateKoToAll(koSegment, { onProgress } = {}) {
  const result = {};

  for (let i = 0; i < TARGET_LOCALES.length; i += 1) {
    const locale = TARGET_LOCALES[i];
    result[locale] = await translateSegment(koSegment, locale, (progress) => {
      onProgress?.({
        ...progress,
        localeIndex: i,
        localeCount: TARGET_LOCALES.length,
      });
    });
  }

  return result;
}

export { TARGET_LABELS, TARGET_LOCALES };
