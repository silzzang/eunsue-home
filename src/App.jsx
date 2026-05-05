import { useCallback, useEffect, useState } from "react";
import AdminPage from "./AdminPage.jsx";
import HomePage from "./HomePage.jsx";
import { defaultContent } from "./defaultContent.js";
import { loadContent } from "./contentStorage.js";
import "./App.css";

function routeFromHash() {
  const raw = window.location.hash.replace(/^#/, "").replace(/^\//, "");
  return raw === "admin" ? "admin" : "home";
}

export default function App() {
  const [route, setRoute] = useState(routeFromHash);
  const [content, setContent] = useState(() => loadContent(defaultContent));

  useEffect(() => {
    const onHash = () => setRoute(routeFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const onSaved = useCallback((next) => {
    setContent(next);
  }, []);

  if (route === "admin") {
    return <AdminPage content={content} onSaved={onSaved} />;
  }

  return <HomePage content={content} />;
}
