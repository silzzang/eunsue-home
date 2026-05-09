import { normalizeBundle } from "./i18n/siteBundle.js";
import { buildDefaultBundle } from "./i18n/defaultBundleData.js";
import { createClient } from "@supabase/supabase-js";

const TABLE_NAME = "site_content";
const PRIMARY_KEY = "homepage";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

function getSupabaseConfigIssue() {
  if (!supabaseUrl || !supabaseAnonKey) {
    return "Supabase 환경변수(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)가 비어 있습니다.";
  }

  const hasPlaceholder =
    /your_/i.test(supabaseUrl) ||
    /your_/i.test(supabaseAnonKey) ||
    supabaseUrl.trim() === "https://xxxxx.supabase.co" ||
    supabaseAnonKey.trim() === "xxxxxxxx";
  if (hasPlaceholder) {
    return "Supabase URL 또는 anon key가 예시값(placeholder)입니다. Dashboard의 실제 값을 넣어 주세요.";
  }

  if (!/^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(supabaseUrl.trim())) {
    return "VITE_SUPABASE_URL 형식이 올바르지 않습니다. 예: https://<project-ref>.supabase.co";
  }

  return null;
}

const supabaseConfigIssue = getSupabaseConfigIssue();
const supabase = !supabaseConfigIssue ? createClient(supabaseUrl, supabaseAnonKey) : null;

if (typeof window !== "undefined" && !window.__CONTENT_STORAGE_MODE_LOGGED__) {
  if (supabase) {
    console.info("[contentStorage] Supabase connected (DB mode)");
  } else {
    console.error(`[contentStorage] Supabase disabled: ${supabaseConfigIssue}`);
  }
  window.__CONTENT_STORAGE_MODE_LOGGED__ = true;
}

function hasSupabase() {
  return Boolean(supabase);
}

function getDefaults() {
  return buildDefaultBundle();
}

function requireSupabaseForWrite() {
  if (hasSupabase()) return;
  throw new Error(`DB 저장 불가: ${supabaseConfigIssue}`);
}

export async function loadContentBundle() {
  const defaults = getDefaults();

  if (!hasSupabase()) {
    return structuredClone(defaults);
  }

  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select("content")
      .eq("id", PRIMARY_KEY)
      .maybeSingle();

    if (error) {
      console.error("Failed to load content from Supabase:", error);
      return structuredClone(defaults);
    }

    if (!data?.content) return structuredClone(defaults);
    return normalizeBundle(data.content, defaults);
  } catch (error) {
    console.error("Unexpected Supabase load error:", error);
    return structuredClone(defaults);
  }
}

export async function persistContentBundle(data) {
  requireSupabaseForWrite();

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
  requireSupabaseForWrite();

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
