const researchHighlights = [
  "데이터 과학 및 응용",
  "인공지능·머신러닝 교육",
  "실무 연계 프로젝트 디자인",
];

const courses = [
  "데이터 분석 기초 (학부)",
  "머신러닝 특론 (대학원)",
];

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

function App() {
  return (
    <div className="page">
      <main className="main-card">
        <header className="hero">
          <p className="badge">Professor · 유은수</p>
          <h1>유은수 교수 홈페이지</h1>
          <p className="subtitle">
            연구·교육·학생 성장을 함께하는 공간입니다. 강좌·연구·상담 문의는 아래 연락처를 이용해 주세요.
          </p>
        </header>

        <section className="stats-grid">
          <article className="stat teal">
            <h2>연구 관심</h2>
            <ul className="highlight-list">
              {researchHighlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <small>세부 업데이트는 논문·프로젝트 페이지에서 정리 예정입니다.</small>
          </article>
          <article className="stat blue">
            <h2>담당 강좌</h2>
            <ul className="highlight-list">
              {courses.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <small>학기마다 변경될 수 있으니 포털 안내를 함께 확인해 주세요.</small>
          </article>
          <article className="stat indigo">
            <h2>학생 면담 · 연락</h2>
            <p className="value-plain">금요일 14:00–16:00 (사전 예약)</p>
            <small className="contact-line">you.eunsue@university.ac.kr · 연구실: 공학관 〇〇호</small>
          </article>
        </section>

        <section className="feed-section">
          <div className="section-head">
            <h2>최근 소식</h2>
            <p>학생·방문자께 전하는 공지와 안내입니다.</p>
          </div>
          <ul className="feed-list news-list">
            {newsItems.map((item) => (
              <li key={item.id}>
                <article className="news-item">
                  <time dateTime={item.date}>{item.date}</time>
                  <div className="news-body">
                    <strong>{item.title}</strong>
                    <p>{item.detail}</p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
