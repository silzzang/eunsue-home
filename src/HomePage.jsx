import { IconBook } from "./IconBook.jsx";

export default function HomePage({ content }) {
  const mailto = `mailto:${encodeURIComponent(content.email)}`;

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
            <nav className="nl-nav" aria-label="주요 메뉴">
              <span className="nl-nav-pill nl-nav-pill--active">Home</span>
              <a className="nl-nav-pill" href="#research">
                Research
              </a>
              <a className="nl-nav-pill" href="#courses">
                Courses
              </a>
              <a className="nl-nav-pill" href="#updates">
                Updates
              </a>
            </nav>
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

        <section className="nl-cards" aria-label="하이라이트">
          <article id="research" className="nl-card nl-card--yellow">
            <h2 className="nl-card-label">{content.researchLabel}</h2>
            <ul className="nl-bullets">
              {content.researchItems.map((item, i) => (
                <li key={`${item}-${i}`}>{item}</li>
              ))}
            </ul>
            <p className="nl-card-note">{content.researchNote}</p>
          </article>
          <article id="courses" className="nl-card nl-card--pink">
            <h2 className="nl-card-label">{content.coursesLabel}</h2>
            <ul className="nl-bullets">
              {content.courseItems.map((c, i) => (
                <li key={`${c}-${i}`}>{c}</li>
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

        <section className="nl-cta" aria-label="문의 안내">
          <p className="nl-cta-title">{content.ctaTitle}</p>
          <p className="nl-cta-desc">{content.ctaDesc}</p>
          <a className="nl-cta-btn" href={mailto}>
            {content.ctaButton}
          </a>
        </section>

        <p className="nl-admin-link">
          <a href="#/admin">관리자</a>
        </p>
      </div>
    </div>
  );
}
