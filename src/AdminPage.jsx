import { useEffect, useMemo, useState } from "react";
import {
  BUNDLE_VERSION,
  buildDefaultBundle,
  LOCALE_LABELS,
  LOCALE_ORDER,
} from "./i18n/defaultBundleData.js";
import { clearStoredContent, persistContentBundle } from "./contentStorage.js";

const AUTH_KEY = "prof-admin-auth";

function getExpectedPassword() {
  const v = import.meta.env.VITE_ADMIN_PASSWORD;
  if (v !== undefined && v !== "") return v;
  return "changeme";
}

function linesToItems(text) {
  return text
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function itemsToLines(items) {
  return Array.isArray(items) ? items.join("\n") : "";
}

export default function AdminPage({ bundle, onSaved }) {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(AUTH_KEY) === "1");
  const [passInput, setPassInput] = useState("");
  const [passErr, setPassErr] = useState("");
  const [activeLocale, setActiveLocale] = useState("ko");
  const [localBundle, setLocalBundle] = useState(() => structuredClone(bundle));
  const [emailDraft, setEmailDraft] = useState(bundle.email);
  const [draft, setDraft] = useState(() => structuredClone(bundle.locales.ko));
  const [researchText, setResearchText] = useState(() => itemsToLines(bundle.locales.ko.researchItems));
  const [coursesText, setCoursesText] = useState(() => itemsToLines(bundle.locales.ko.courseItems));
  const [msg, setMsg] = useState("");

  const expected = useMemo(() => getExpectedPassword(), []);

  useEffect(() => {
    setLocalBundle(structuredClone(bundle));
    setEmailDraft(bundle.email);
  }, [bundle]);

  useEffect(() => {
    const seg = localBundle.locales[activeLocale];
    setDraft(structuredClone(seg));
    setResearchText(itemsToLines(seg.researchItems));
    setCoursesText(itemsToLines(seg.courseItems));
  }, [activeLocale, localBundle]);

  const login = (e) => {
    e.preventDefault();
    if (passInput === expected) {
      sessionStorage.setItem(AUTH_KEY, "1");
      setAuthed(true);
      setPassErr("");
      setPassInput("");
    } else {
      setPassErr("비밀번호가 올바르지 않습니다.");
    }
  };

  const logout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setAuthed(false);
  };

  const patch = (partial) => setDraft((d) => ({ ...d, ...partial }));

  const patchNews = (index, field, value) => {
    setDraft((d) => {
      const newsItems = d.newsItems.map((row, i) => (i === index ? { ...row, [field]: value } : row));
      return { ...d, newsItems };
    });
  };

  const addNews = () => {
    setDraft((d) => ({
      ...d,
      newsItems: [
        ...d.newsItems,
        { id: `n-${Date.now()}`, date: "", title: "", detail: "" },
      ],
    }));
  };

  const removeNews = (index) => {
    setDraft((d) => ({
      ...d,
      newsItems: d.newsItems.filter((_, i) => i !== index),
    }));
  };

  const flushSegment = () => ({
    ...draft,
    researchItems: linesToItems(researchText),
    courseItems: linesToItems(coursesText),
  });

  const goLocale = (next) => {
    if (next === activeLocale) return;
    setLocalBundle((prev) => ({
      ...prev,
      locales: {
        ...prev.locales,
        [activeLocale]: flushSegment(),
      },
    }));
    setActiveLocale(next);
  };

  const save = () => {
    const seg = flushSegment();
    const next = {
      version: BUNDLE_VERSION,
      email: emailDraft.trim() || localBundle.email,
      locales: {
        ...localBundle.locales,
        [activeLocale]: seg,
      },
    };
    persistContentBundle(next);
    onSaved(next);
    setLocalBundle(structuredClone(next));
    setMsg("저장되었습니다. 메인 페이지로 이동해 확인하세요.");
    setTimeout(() => setMsg(""), 4000);
  };

  const resetAll = () => {
    if (!window.confirm("저장된 내용을 지우고 기본값으로 되돌릴까요?")) return;
    clearStoredContent();
    const fresh = structuredClone(buildDefaultBundle());
    onSaved(fresh);
    setLocalBundle(fresh);
    setEmailDraft(fresh.email);
    setActiveLocale("ko");
    setMsg("기본값으로 초기화했습니다.");
    setTimeout(() => setMsg(""), 4000);
  };

  if (!authed) {
    return (
      <div className="page admin-page">
        <div className="nl-shell admin-shell">
          <div className="admin-card">
            <h1 className="admin-h1">관리자 로그인</h1>
            <p className="admin-hint">
              비밀번호는 환경 변수 <code>VITE_ADMIN_PASSWORD</code>로 설정할 수 있습니다. 미설정 시 기본값{" "}
              <code>changeme</code> 입니다.
            </p>
            <form onSubmit={login} className="admin-form">
              <label className="admin-label">
                비밀번호
                <input
                  type="password"
                  className="admin-input"
                  value={passInput}
                  onChange={(e) => setPassInput(e.target.value)}
                  autoComplete="current-password"
                />
              </label>
              {passErr ? <p className="admin-error">{passErr}</p> : null}
              <button type="submit" className="admin-btn admin-btn-primary">
                들어가기
              </button>
            </form>
            <p className="admin-back">
              <a href="#/">← 메인으로</a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page admin-page">
      <div className="nl-shell admin-shell">
        <header className="admin-toolbar">
          <h1 className="admin-toolbar-title">콘텐츠 편집</h1>
          <div className="admin-toolbar-actions">
            <button type="button" className="admin-btn" onClick={logout}>
              로그아웃
            </button>
            <a className="admin-btn admin-btn-ghost" href="#/">
              메인 보기
            </a>
            <button type="button" className="admin-btn admin-btn-warn" onClick={resetAll}>
              기본값 초기화
            </button>
            <button type="button" className="admin-btn admin-btn-primary" onClick={save}>
              저장
            </button>
          </div>
        </header>

        <div className="admin-email-bar">
          <label className="admin-label admin-label-inline-row">
            <span>공통 이메일 (모든 언어의 문의 주소)</span>
            <input
              className="admin-input"
              type="email"
              value={emailDraft}
              onChange={(e) => setEmailDraft(e.target.value)}
            />
          </label>
        </div>

        <div className="admin-lang-tabs" role="tablist" aria-label="편집 언어">
          {LOCALE_ORDER.map((lc) => (
            <button
              key={lc}
              type="button"
              role="tab"
              aria-selected={activeLocale === lc}
              className={`admin-lang-tab${activeLocale === lc ? " admin-lang-tab--active" : ""}`}
              onClick={() => goLocale(lc)}
            >
              {LOCALE_LABELS[lc]}
            </button>
          ))}
        </div>

        {msg ? <p className="admin-toast">{msg}</p> : null}

        <div className="admin-grid">
          <section className="admin-section">
            <h2 className="admin-section-title">헤더 · 히어로 · 내비</h2>
            <label className="admin-label">
              브랜드 제목
              <input className="admin-input" value={draft.brandTitle} onChange={(e) => patch({ brandTitle: e.target.value })} />
            </label>
            <label className="admin-label">
              브랜드 부제
              <input className="admin-input" value={draft.brandTag} onChange={(e) => patch({ brandTag: e.target.value })} />
            </label>
            <label className="admin-label">
              내비—Home 라벨
              <input className="admin-input" value={draft.navHome} onChange={(e) => patch({ navHome: e.target.value })} />
            </label>
            <label className="admin-label">
              내비—Research
              <input className="admin-input" value={draft.navResearch} onChange={(e) => patch({ navResearch: e.target.value })} />
            </label>
            <label className="admin-label">
              내비—Courses
              <input className="admin-input" value={draft.navCourses} onChange={(e) => patch({ navCourses: e.target.value })} />
            </label>
            <label className="admin-label">
              내비—Updates
              <input className="admin-input" value={draft.navUpdates} onChange={(e) => patch({ navUpdates: e.target.value })} />
            </label>
            <label className="admin-label">
              히어로 뱃지 문구
              <input className="admin-input" value={draft.heroEyebrow} onChange={(e) => patch({ heroEyebrow: e.target.value })} />
            </label>
            <label className="admin-label">
              히어로 제목
              <input className="admin-input" value={draft.heroTitle} onChange={(e) => patch({ heroTitle: e.target.value })} />
            </label>
            <label className="admin-label">
              히어로 본문
              <textarea className="admin-textarea" rows={3} value={draft.heroLead} onChange={(e) => patch({ heroLead: e.target.value })} />
            </label>
            <label className="admin-label">
              하이라이트 영역 aria 라벨
              <input
                className="admin-input"
                value={draft.highlightsAriaLabel}
                onChange={(e) => patch({ highlightsAriaLabel: e.target.value })}
              />
            </label>
            <label className="admin-label">
              문의 CTA 영역 aria 라벨
              <input
                className="admin-input"
                value={draft.inquiryAriaLabel}
                onChange={(e) => patch({ inquiryAriaLabel: e.target.value })}
              />
            </label>
            <label className="admin-label">
              관리자 링크 글자
              <input className="admin-input" value={draft.adminLinkLabel} onChange={(e) => patch({ adminLinkLabel: e.target.value })} />
            </label>
          </section>

          <section className="admin-section">
            <h2 className="admin-section-title">연구 · 강좌</h2>
            <label className="admin-label">
              연구 카드 제목
              <input className="admin-input" value={draft.researchLabel} onChange={(e) => patch({ researchLabel: e.target.value })} />
            </label>
            <label className="admin-label">
              연구 항목 (줄마다 하나)
              <textarea className="admin-textarea" rows={5} value={researchText} onChange={(e) => setResearchText(e.target.value)} />
            </label>
            <label className="admin-label">
              연구 카드 하단 안내
              <input className="admin-input" value={draft.researchNote} onChange={(e) => patch({ researchNote: e.target.value })} />
            </label>
            <label className="admin-label">
              강좌 카드 제목
              <input className="admin-input" value={draft.coursesLabel} onChange={(e) => patch({ coursesLabel: e.target.value })} />
            </label>
            <label className="admin-label">
              강좌 목록 (줄마다 하나)
              <textarea className="admin-textarea" rows={4} value={coursesText} onChange={(e) => setCoursesText(e.target.value)} />
            </label>
            <label className="admin-label">
              강좌 카드 하단 안내
              <input className="admin-input" value={draft.coursesNote} onChange={(e) => patch({ coursesNote: e.target.value })} />
            </label>
          </section>

          <section className="admin-section">
            <h2 className="admin-section-title">연락 · CTA · Gmail 제목</h2>
            <label className="admin-label">
              연락 카드 제목
              <input className="admin-input" value={draft.contactLabel} onChange={(e) => patch({ contactLabel: e.target.value })} />
            </label>
            <label className="admin-label">
              면담 시간 안내
              <input className="admin-input" value={draft.contactHours} onChange={(e) => patch({ contactHours: e.target.value })} />
            </label>
            <label className="admin-label">
              연구실 등 (한 줄)
              <input className="admin-input" value={draft.contactOffice} onChange={(e) => patch({ contactOffice: e.target.value })} />
            </label>
            <label className="admin-label">
              CTA 제목
              <input className="admin-input" value={draft.ctaTitle} onChange={(e) => patch({ ctaTitle: e.target.value })} />
            </label>
            <label className="admin-label">
              CTA 설명
              <textarea className="admin-textarea" rows={2} value={draft.ctaDesc} onChange={(e) => patch({ ctaDesc: e.target.value })} />
            </label>
            <label className="admin-label">
              CTA 버튼 글자
              <input className="admin-input" value={draft.ctaButton} onChange={(e) => patch({ ctaButton: e.target.value })} />
            </label>
            <label className="admin-label">
              Gmail 작성창 기본 제목 (협업 문의)
              <input
                className="admin-input"
                value={draft.collaborationSubject}
                onChange={(e) => patch({ collaborationSubject: e.target.value })}
              />
            </label>
          </section>

          <section className="admin-section admin-section-wide">
            <h2 className="admin-section-title">최근 소식</h2>
            <label className="admin-label">
              섹션 영문 라벨
              <input className="admin-input" value={draft.updatesKicker} onChange={(e) => patch({ updatesKicker: e.target.value })} />
            </label>
            <label className="admin-label">
              섹션 설명
              <input className="admin-input" value={draft.updatesDesc} onChange={(e) => patch({ updatesDesc: e.target.value })} />
            </label>
            <div className="admin-news-list">
              {draft.newsItems.map((row, i) => (
                <div key={row.id} className="admin-news-row">
                  <button type="button" className="admin-btn admin-btn-mini admin-btn-warn" onClick={() => removeNews(i)}>
                    삭제
                  </button>
                  <label className="admin-label admin-label-inline">
                    날짜
                    <input className="admin-input" value={row.date} onChange={(e) => patchNews(i, "date", e.target.value)} />
                  </label>
                  <label className="admin-label admin-label-inline">
                    제목
                    <input className="admin-input" value={row.title} onChange={(e) => patchNews(i, "title", e.target.value)} />
                  </label>
                  <label className="admin-label">
                    내용
                    <textarea className="admin-textarea" rows={2} value={row.detail} onChange={(e) => patchNews(i, "detail", e.target.value)} />
                  </label>
                </div>
              ))}
            </div>
            <button type="button" className="admin-btn" onClick={addNews}>
              소식 추가
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
