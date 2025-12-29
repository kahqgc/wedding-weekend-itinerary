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

  useEffect(() => {
    fetchSheetRows(SHEET_TAB_NAME)
      .then((data) => setRows(data))
      .catch((err) => setError(err.message || "Failed to load sheet"));
  }, []);

  const dayOrder = ["Thursday", "Friday", "Saturday", "Sunday"];

  const uniqueDays = [
    ...new Set(rows.filter((r) => r.Day !== "Monday").map((r) => r.Day)),
  ].sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));

  const visibleRows = rows.filter(
    (r) => r.Day === selectedDay && r.Who === "Everyone"
  );

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
                  onClick={() => setSelectedDay(day)}
                >
                  {DAY_LABELS[day]}
                </button>
              ))}
            </section>
            <hr />
            <section className="events">
              <h2>{selectedDay}</h2>

              {visibleRows.length === 0 ? (
                <p className="empty">Nothing listed for guests this day yet.</p>
              ) : (
                visibleRows.map((r, i) => (
                  <article
                    key={`${r.Day}-${r.Time}-${i}`}
                    className="event-card"
                  >
                    <div className="event-time">{r.Time}</div>

                    <div className="event-info">
                      <h3>{r.Event}</h3>
                      {r.Location && (
                        <p className="event-location">{r.Location}</p>
                      )}
                      <p className="event-location">{r.Date}</p>
                    </div>
                  </article>
                ))
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
