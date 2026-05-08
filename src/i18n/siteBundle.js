import { BUNDLE_VERSION, LOCALE_ORDER, buildDefaultBundle } from "./defaultBundleData.js";

function mergeDeep(base, over) {
  if (!over || typeof over !== "object") return base;
  const out = { ...base };
  for (const k of Object.keys(over)) {
    if (Array.isArray(over[k])) {
      out[k] = over[k];
    } else if (over[k] && typeof over[k] === "object" && !(over[k] instanceof Date)) {
      out[k] = mergeDeep(base[k] || {}, over[k]);
    } else {
      out[k] = over[k];
    }
  }
  return out;
}

function stripLegacyEmail(obj) {
  if (!obj || typeof obj !== "object") return {};
  const { email: _e, ...rest } = obj;
  return rest;
}

/**
 * v1 플랫 문서 → 현재 번들로 이주 (한국어만 오버레이 유지)
 */
function migrateLegacyFlat(parsed, defaults) {
  const email = parsed.email ?? defaults.email;
  const mergedKo = mergeDeep(structuredClone(defaults.locales.ko), stripLegacyEmail(parsed));
  return {
    version: BUNDLE_VERSION,
    email,
    locales: {
      ...structuredClone(defaults.locales),
      ko: mergedKo,
    },
  };
}

/**
 * v2 → v3 마이그레이션
 *  - 한국어 오버레이만 보존, 나머지 언어는 새 기본값으로 재구성
 *  - (v2 시점에 저장된 다국어가 옛 기본값에 잠겨버리는 문제 해결)
 */
function migrateV2(parsed, d) {
  const email =
    typeof parsed.email === "string" && parsed.email.trim() ? parsed.email.trim() : d.email;
  const locales = {};
  for (const lc of LOCALE_ORDER) {
    if (lc === "ko") {
      locales[lc] = mergeDeep(structuredClone(d.locales.ko), parsed.locales?.ko || {});
    } else {
      locales[lc] = structuredClone(d.locales[lc]);
    }
  }
  return { version: BUNDLE_VERSION, email, locales };
}

export function normalizeBundle(parsed, defaults) {
  const d = structuredClone(defaults);
  if (!parsed || typeof parsed !== "object") return d;

  if (parsed.version === BUNDLE_VERSION && parsed.locales && typeof parsed.locales === "object") {
    const email = typeof parsed.email === "string" && parsed.email.trim() ? parsed.email.trim() : d.email;
    const locales = {};
    for (const lc of LOCALE_ORDER) {
      locales[lc] = mergeDeep(structuredClone(d.locales[lc]), parsed.locales[lc] || {});
    }
    return { version: BUNDLE_VERSION, email, locales };
  }

  if (parsed.version === 2 && parsed.locales && typeof parsed.locales === "object") {
    return migrateV2(parsed, d);
  }

  if ("brandTitle" in parsed || "heroTitle" in parsed) {
    return migrateLegacyFlat(parsed, d);
  }

  return d;
}

export function getPageContent(bundle, locale) {
  const lc = LOCALE_ORDER.includes(locale) ? locale : "ko";
  const segment = bundle.locales[lc] ?? bundle.locales.ko;
  return {
    ...structuredClone(segment),
    email: bundle.email,
  };
}
