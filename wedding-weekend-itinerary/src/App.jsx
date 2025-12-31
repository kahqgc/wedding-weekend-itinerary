import "./App.css";
import { useState, useEffect } from "react";
import { fetchSheetRows } from "./api/fetchItineraryFromSheet";

const SHEET_TAB_NAME = "VEGAS_WEDDING_MASTER_SCHEDULE_SPA_FRIDAY";
const DAY_LABELS = {
  Thursday: "Thu",
  Friday: "Fri",
  Saturday: "Sat",
  Sunday: "Sun",
};

function App() {
  // VEGAS_WEDDING_MASTER_SCHEDULE_SPA_FRIDAY
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");
  const [selectedDay, setSelectedDay] = useState("Friday");
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetchSheetRows(SHEET_TAB_NAME)
      .then((data) => setRows(data))
      .catch((err) => setError(err.message || "Failed to load sheet"));
  }, []);

  const dayOrder = ["Thursday", "Friday", "Saturday", "Sunday"];

  const uniqueDays = [
    ...new Set(rows.filter((r) => r.Day !== "Monday" && r.Day !== "Thursday").map((r) => r.Day)),
  ].sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));

  const visibleRows = rows.filter(
    (r) => r.Day === selectedDay && r.Who === "Everyone"
  );

  const current = visibleRows[activeIndex];

  return (
    <div className="app">
      <header className="header">
        <h1>Vegas Weekend Itinerary</h1>
        <p>Kayla & Chris • April 18, 2026</p>
      </header>
      <main className="main">
        {error ? (
          <p style={{ color: "crimson" }}>Error: {error}</p>
        ) : rows.length === 0 ? (
          <p>Loading…</p>
        ) : (
          <>
            <section className="day-picker">
              {uniqueDays.map((day) => (
                <button
                  key={day}
                  type="button"
                  className={day === selectedDay ? "day-btn active" : "day-btn"}
                  onClick={() => {
                    setSelectedDay(day);
                    setActiveIndex(0);
                  }}
                >
                  {DAY_LABELS[day]}
                </button>
              ))}
            </section>
            <section className="events">
              <h2>{selectedDay}</h2>

              {visibleRows.length === 0 ? (
                <p className="empty">Nothing listed for guests this day yet.</p>
              ) : (
                <>
                  <article className="event-card">
                    <div className="event-time">{current?.Time}</div>

                    <div className="event-info">
                      <h3>{current?.Event}</h3>
                      {current?.Location && (
                        <p className="event-location">{current.Location}</p>
                      )}
                      {current?.Date && (
                        <p className="event-location">{current.Date}</p>
                      )}
                    </div>
                  </article>

                  <div className="pager">
                    <button
                      className="pager-btn"
                      onClick={() => setActiveIndex((i) => Math.max(0, i - 1))}
                      disabled={activeIndex === 0}
                    >
                      ← Prev
                    </button>

                    <span className="pager-count">
                      {activeIndex + 1} / {visibleRows.length}
                    </span>

                    <button
                      className="pager-btn"
                      onClick={() =>
                        setActiveIndex((i) =>
                          Math.min(visibleRows.length - 1, i + 1)
                        )
                      }
                      disabled={activeIndex === visibleRows.length - 1}
                    >
                      Next →
                    </button>
                  </div>
                </>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
