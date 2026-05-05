const researchHighlights = [
  "데이터 과학 및 응용",
  "인공지능·머신러닝 교육",
  "실무 연계 프로젝트 디자인",
];

const courses = ["데이터 분석 기초 (학부)", "머신러닝 특론 (대학원)"];

const newsItems = [
  {
    id: "n1",
    date: "2026.03",
    title: "2026년 1학기 강의 안내",
    detail: "강의계획서 및 과제·출결 정책은 학습관리시스템에서 확인해 주세요.",
  },
  {
    id: "n2",
    date: "2026.05",
    title: "학부 연구 프로그램 모집",
    detail: "관심 있는 학생은 이메일로 간단한 자기소개와 진로 방향을 보내 주세요.",
  },
];

function IconBook() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function App() {
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
                <p className="nl-brand-title">유은수 교수 Homepage</p>
                <p className="nl-brand-tag">Insight Hub</p>
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
            <p className="nl-eyebrow">TEACHING &amp; RESEARCH LETTER</p>
          </div>
          <h1 id="hero-title" className="nl-hero-title">
            연구·교육·학생 성장을 한곳에서 나눕니다.
          </h1>
          <p className="nl-hero-lead">
            강좌·연구·상담 문의는 아래 연락처를 이용해 주세요. 공지와 강의 정보는 이 페이지에서 빠르게 확인할 수 있습니다.
          </p>
        </section>

        <section className="nl-cards" aria-label="하이라이트">
          <article id="research" className="nl-card nl-card--yellow">
            <h2 className="nl-card-label">연구 관심</h2>
            <ul className="nl-bullets">
              {researchHighlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="nl-card-note">세부는 논문·프로젝트 페이지에서 정리 예정입니다.</p>
          </article>
          <article id="courses" className="nl-card nl-card--pink">
            <h2 className="nl-card-label">담당 강좌</h2>
            <ul className="nl-bullets">
              {courses.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <p className="nl-card-note">학기별 변경 시 포털 안내를 함께 확인해 주세요.</p>
          </article>
          <article className="nl-card nl-card--cyan">
            <h2 className="nl-card-label">학생 면담 · 연락</h2>
            <p className="nl-card-strong">금요일 14:00–16:00 (사전 예약)</p>
            <p className="nl-card-note">
              you.eunsue@university.ac.kr
              <br />
              연구실: 공학관 〇〇호
            </p>
          </article>
        </section>

        <section id="updates" className="nl-panel">
          <div className="nl-panel-head">
            <h2 className="nl-section-kicker">LATEST UPDATES</h2>
            <p className="nl-section-desc">학생·방문자를 위한 공지와 안내입니다.</p>
          </div>
          <ul className="nl-news">
            {newsItems.map((item) => (
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
          <p className="nl-cta-title">강의·연구 협업이 필요하신가요?</p>
          <p className="nl-cta-desc">메일로 간단한 제목과 일정을 남겨 주시면 회신 드리겠습니다.</p>
          <a className="nl-cta-btn" href="mailto:you.eunsue@university.ac.kr">
            협업 · 문의하기
          </a>
        </section>
      </div>
    </div>
  );
}

export default App;
