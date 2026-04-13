import { useMemo, useState } from "react";

const feedingSlots = [
  { id: "morning", label: "아침 먹이", time: "08:00" },
  { id: "afternoon", label: "점심 간식", time: "13:00" },
  { id: "evening", label: "저녁 먹이", time: "19:30" },
];

function getMinutesUntil(targetTime) {
  const now = new Date();
  const [hour, minute] = targetTime.split(":").map(Number);
  const target = new Date(now);
  target.setHours(hour, minute, 0, 0);
  if (target <= now) {
    target.setDate(target.getDate() + 1);
  }
  return Math.round((target - now) / 60000);
}

function App() {
  const [checkedSlots, setCheckedSlots] = useState([]);
  const [lastFedAt, setLastFedAt] = useState(null);

  const nextFeeding = useMemo(() => {
    const withRemain = feedingSlots.map((slot) => ({
      ...slot,
      remainMinutes: getMinutesUntil(slot.time),
    }));
    return withRemain.sort((a, b) => a.remainMinutes - b.remainMinutes)[0];
  }, [checkedSlots]);

  const completion = Math.round((checkedSlots.length / feedingSlots.length) * 100);

  const toggleSlot = (slotId) => {
    setCheckedSlots((prev) => {
      const exists = prev.includes(slotId);
      const next = exists ? prev.filter((id) => id !== slotId) : [...prev, slotId];
      if (!exists) {
        setLastFedAt(new Date());
      }
      return next;
    });
  };

  return (
    <div className="page">
      <main className="main-card">
        <header className="hero">
          <p className="badge">Oranda Goldfish Care</p>
          <h1>오란다 금붕어 케어 대시보드</h1>
          <p className="subtitle">수온, 먹이, 컨디션을 한눈에 확인하며 예쁘게 관리하세요.</p>
        </header>

        <section className="stats-grid">
          <article className="stat orange">
            <h2>오늘 급여 체크</h2>
            <p className="value">{completion}% 완료</p>
            <small>{checkedSlots.length} / 3 회 완료</small>
          </article>
          <article className="stat blue">
            <h2>다음 먹이 시간</h2>
            <p className="value">
              {nextFeeding.label} ({nextFeeding.time})
            </p>
            <small>약 {nextFeeding.remainMinutes}분 후</small>
          </article>
          <article className="stat purple">
            <h2>마지막 급여 기록</h2>
            <p className="value">{lastFedAt ? lastFedAt.toLocaleTimeString("ko-KR") : "기록 없음"}</p>
            <small>먹이 체크 시 자동 기록</small>
          </article>
        </section>

        <section className="feed-section">
          <div className="section-head">
            <h2>먹이 주기 체크</h2>
            <p>완료한 시간대를 체크해 주세요.</p>
          </div>
          <ul className="feed-list">
            {feedingSlots.map((slot) => (
              <li key={slot.id}>
                <label className={`feed-item ${checkedSlots.includes(slot.id) ? "done" : ""}`}>
                  <input
                    type="checkbox"
                    checked={checkedSlots.includes(slot.id)}
                    onChange={() => toggleSlot(slot.id)}
                  />
                  <span>
                    <strong>{slot.label}</strong>
                    <em>{slot.time}</em>
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
