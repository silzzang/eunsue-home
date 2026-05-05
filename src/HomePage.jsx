import { IconBook } from "./IconBook.jsx";

/** Gmail 웹 메일 작성창 URL (브라우저에서 Gmail 로그인 필요) */
function gmailComposeHref(email, subject) {
  const q = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: email.trim(),
    su: subject,
  });
  return `https://mail.google.com/mail/u/0/?${q.toString()}`;
}

function LanguageSwitcher({ locale, locales, onLocaleChange }) {
  return (
    <div className="lang-switcher" role="group" aria-label="언어 선택">
      {locales.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          className={`lang-switcher-btn${locale === code ? " lang-switcher-btn--active" : ""}`}
          onClick={() => onLocaleChange(code)}
          aria-pressed={locale === code}
          lang={
            code === "zh"
              ? "zh-Hans"
              : code === "ne"
                ? "ne"
                : code === "vi"
                  ? "vi"
                  : code
          }
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default function HomePage({ content, locale, locales, onLocaleChange }) {
  const collaborationHref = gmailComposeHref(content.email, content.collaborationSubject ?? "Collaboration");

  return (
    <div className="page">
      <div className="nl-shell">
        <header className="nl-header">
          <div className="nl-header-inner">
            <div className="nl-brand">
              <div className="nl-brand-icon" aria-hidden>
                <IconBook />
              </div>
              <div>
                <p className="nl-brand-title">{content.brandTitle}</p>
                <p className="nl-brand-tag">{content.brandTag}</p>
              </div>
            </div>
            <div className="nl-header-right">
              <LanguageSwitcher locale={locale} locales={locales} onLocaleChange={onLocaleChange} />
              <nav className="nl-nav" aria-label="주요 메뉴">
                <span className="nl-nav-pill nl-nav-pill--active">{content.navHome}</span>
                <a className="nl-nav-pill" href="#research">
                  {content.navResearch}
                </a>
                <a className="nl-nav-pill" href="#courses">
                  {content.navCourses}
                </a>
                <a className="nl-nav-pill" href="#updates">
                  {content.navUpdates}
                </a>
              </nav>
            </div>
          </div>
        </header>

        <section className="nl-hero" aria-labelledby="hero-title">
          <div className="nl-hero-top">
            <div className="nl-hero-iconbox" aria-hidden>
              <IconBook />
            </div>
            <p className="nl-eyebrow">{content.heroEyebrow}</p>
          </div>
          <h1 id="hero-title" className="nl-hero-title">
            {content.heroTitle}
          </h1>
          <p className="nl-hero-lead">{content.heroLead}</p>
        </section>

        <section className="nl-cards" aria-label={content.highlightsAriaLabel}>
          <article id="research" className="nl-card nl-card--yellow">
            <h2 className="nl-card-label">{content.researchLabel}</h2>
            <ul className="nl-bullets">
              {content.researchItems.map((item, i) => (
                <li key={`${locale}-${item}-${i}`}>{item}</li>
              ))}
            </ul>
            <p className="nl-card-note">{content.researchNote}</p>
          </article>
          <article id="courses" className="nl-card nl-card--pink">
            <h2 className="nl-card-label">{content.coursesLabel}</h2>
            <ul className="nl-bullets">
              {content.courseItems.map((c, i) => (
                <li key={`${locale}-${c}-${i}`}>{c}</li>
              ))}
            </ul>
            <p className="nl-card-note">{content.coursesNote}</p>
          </article>
          <article className="nl-card nl-card--cyan">
            <h2 className="nl-card-label">{content.contactLabel}</h2>
            <p className="nl-card-strong">{content.contactHours}</p>
            <p className="nl-card-note">
              {content.email}
              <br />
              {content.contactOffice}
            </p>
          </article>
        </section>

        <section id="updates" className="nl-panel">
          <div className="nl-panel-head">
            <h2 className="nl-section-kicker">{content.updatesKicker}</h2>
            <p className="nl-section-desc">{content.updatesDesc}</p>
          </div>
          <ul className="nl-news">
            {content.newsItems.map((item) => (
              <li key={item.id}>
                <article className="nl-news-item">
                  <time dateTime={item.date}>{item.date}</time>
                  <div>
                    <h3 className="nl-news-title">{item.title}</h3>
                    <p className="nl-news-body">{item.detail}</p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>

        <section className="nl-cta" aria-label={content.inquiryAriaLabel}>
          <p className="nl-cta-title">{content.ctaTitle}</p>
          <p className="nl-cta-desc">{content.ctaDesc}</p>
          <a
            className="nl-cta-btn"
            href={collaborationHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            {content.ctaButton}
          </a>
        </section>

        <p className="nl-admin-link">
          <a href="#/admin">{content.adminLinkLabel}</a>
        </p>
      </div>
    </div>
  );
}
