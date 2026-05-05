const STORAGE_KEY = "prof-home-content-v1";

function mergeDeep(base, over) {
  if (!over || typeof over !== "object") return base;
  const out = { ...base };
  for (const k of Object.keys(over)) {
    if (Array.isArray(over[k])) {
      out[k] = over[k];
    } else if (over[k] && typeof over[k] === "object") {
      out[k] = mergeDeep(base[k] || {}, over[k]);
    } else {
      out[k] = over[k];
    }
  }
  return out;
}

export function loadContent(defaults) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(defaults);
    const parsed = JSON.parse(raw);
    return mergeDeep(structuredClone(defaults), parsed);
  } catch {
    return structuredClone(defaults);
  }
}

export function persistContent(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function clearStoredContent() {
  localStorage.removeItem(STORAGE_KEY);
}
