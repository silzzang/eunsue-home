import { normalizeBundle } from "./i18n/siteBundle.js";
import { buildDefaultBundle } from "./i18n/defaultBundleData.js";
import { createClient } from "@supabase/supabase-js";

const STORAGE_KEY = "prof-home-content-v1";
const TABLE_NAME = "site_content";
const PRIMARY_KEY = "homepage";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

function hasSupabase() {
  return Boolean(supabase);
}

function getDefaults() {
  return buildDefaultBundle();
}

function readLocalFallback(defaults) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(defaults);
    const parsed = JSON.parse(raw);
    return normalizeBundle(parsed, defaults);
  } catch {
    return structuredClone(defaults);
  }
}

function writeLocalFallback(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export async function loadContentBundle() {
  const defaults = getDefaults();

  if (!hasSupabase()) {
    return readLocalFallback(defaults);
  }

  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select("content")
      .eq("id", PRIMARY_KEY)
      .maybeSingle();

    if (error) {
      console.error("Failed to load content from Supabase:", error);
      return readLocalFallback(defaults);
    }

    if (!data?.content) return structuredClone(defaults);
    return normalizeBundle(data.content, defaults);
  } catch (error) {
    console.error("Unexpected Supabase load error:", error);
    return readLocalFallback(defaults);
  }
}

export async function persistContentBundle(data) {
  writeLocalFallback(data);

  if (!hasSupabase()) return;

  const payload = {
    id: PRIMARY_KEY,
    content: data,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from(TABLE_NAME).upsert(payload, { onConflict: "id" });
  if (error) {
    throw new Error(`DB 저장 실패: ${error.message}`);
  }
}

export async function clearStoredContent() {
  localStorage.removeItem(STORAGE_KEY);

  if (!hasSupabase()) return;

  const defaults = getDefaults();
  const payload = {
    id: PRIMARY_KEY,
    content: defaults,
    updated_at: new Date().toISOString(),
  };
  const { error } = await supabase.from(TABLE_NAME).upsert(payload, { onConflict: "id" });
  if (error) {
    throw new Error(`DB 초기화 실패: ${error.message}`);
  }
}
