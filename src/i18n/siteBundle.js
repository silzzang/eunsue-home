import { LOCALE_ORDER, buildDefaultBundle } from "./defaultBundleData.js";

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
 * v1 플랫 문서 → v2 번들로 이주 (한국어만 오버레이 유지)
 */
function migrateLegacyFlat(parsed, defaults) {
  const email = parsed.email ?? defaults.email;
  const mergedKo = mergeDeep(structuredClone(defaults.locales.ko), stripLegacyEmail(parsed));
  return {
    version: 2,
    email,
    locales: {
      ...structuredClone(defaults.locales),
      ko: mergedKo,
    },
  };
}

export function normalizeBundle(parsed, defaults) {
  const d = structuredClone(defaults);
  if (!parsed || typeof parsed !== "object") return d;

  if (parsed.version === 2 && parsed.locales && typeof parsed.locales === "object") {
    const email = typeof parsed.email === "string" && parsed.email.trim() ? parsed.email.trim() : d.email;
    const locales = {};
    for (const lc of LOCALE_ORDER) {
      locales[lc] = mergeDeep(structuredClone(d.locales[lc]), parsed.locales[lc] || {});
    }
    return { version: 2, email, locales };
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
