import { useCallback, useEffect, useState } from "react";
import AdminPage from "./AdminPage.jsx";
import HomePage from "./HomePage.jsx";
import { LOCALE_LABELS, LOCALE_ORDER } from "./i18n/defaultBundleData.js";
import { getPageContent } from "./i18n/siteBundle.js";
import { loadContentBundle } from "./contentStorage.js";
import "./App.css";

const LANG_KEY = "prof-home-locale";

function routeFromHash() {
  const raw = window.location.hash.replace(/^#/, "").replace(/^\//, "");
  return raw === "admin" ? "admin" : "home";
}

export default function App() {
  const [route, setRoute] = useState(routeFromHash);
  const [bundle, setBundle] = useState(null);
  const [locale, setLocale] = useState(() => {
    const saved = localStorage.getItem(LANG_KEY);
    return LOCALE_ORDER.includes(saved) ? saved : "ko";
  });

  useEffect(() => {
    localStorage.setItem(LANG_KEY, locale);
    const langMap = { ko: "ko", en: "en", zh: "zh-Hans", vi: "vi", ne: "ne" };
    document.documentElement.lang = langMap[locale] ?? "ko";
  }, [locale]);

  useEffect(() => {
    let alive = true;
    loadContentBundle().then((loaded) => {
      if (alive) setBundle(loaded);
    });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    const onHash = () => setRoute(routeFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const onSavedBundle = useCallback((next) => {
    setBundle(next);
  }, []);

  if (!bundle) return null;

  const pageContent = getPageContent(bundle, locale);

  if (route === "admin") {
    return <AdminPage bundle={bundle} onSaved={onSavedBundle} />;
  }

  return (
    <HomePage
      content={pageContent}
      locale={locale}
      locales={LOCALE_ORDER.map((lc) => ({ code: lc, label: LOCALE_LABELS[lc] }))}
      onLocaleChange={setLocale}
    />
  );
}
