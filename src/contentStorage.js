import { normalizeBundle } from "./i18n/siteBundle.js";
import { buildDefaultBundle } from "./i18n/defaultBundleData.js";

const STORAGE_KEY = "prof-home-content-v1";

function getDefaults() {
  return buildDefaultBundle();
}

export function loadContentBundle() {
  const defaults = getDefaults();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(defaults);
    const parsed = JSON.parse(raw);
    return normalizeBundle(parsed, defaults);
  } catch {
    return structuredClone(defaults);
  }
}

export function persistContentBundle(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function clearStoredContent() {
  localStorage.removeItem(STORAGE_KEY);
}
