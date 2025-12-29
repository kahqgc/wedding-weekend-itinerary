import "./App.css";
import { useState, useEffect } from "react";
import { fetchSheetRows } from "./api/fetchItineraryFromSheet";

function App() {
  // VEGAS_WEDDING_MASTER_SCHEDULE_SPA_FRIDAY
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSheetRows("VEGAS_WEDDING_MASTER_SCHEDULE_SPA_FRIDAY")
      .then((data) => setRows(data))
      .catch((err) => setError(err.message || "Failed to load sheet"));
  }, []);

  return (
    <div className="app">
      <header className="header">
        <h1>Vegas Weekend Itinerary</h1>
        <p>Kayla & Chris • April 18, 2026</p>
      </header>

      <main className="main">
        <section className="day-picker">
          <button>Thu</button>
          <button>Fri</button>
          <button>Sat</button>
          <button>Sun</button>
        </section>

        <section className="events">
          <h2>Friday</h2>

          <article className="event-card">
            <div className="event-time">10:00 AM</div>
            <div className="event-info">
              <h3>Spa Day</h3>
              <p className="event-location">Fontainebleau Spa</p>
              <p className="event-notes">Tap for details</p>
            </div>
          </article>
        </section>
        {error ? (
          <p style={{ color: "crimson" }}>Error: {error}</p>
        ) : rows.length === 0 ? (
          <p>Loading…</p>
        ) : (
          <ul>
            {rows.slice(0, 5).map((r, i) => (
              <li key={i}>
                <strong>{r.Day}</strong> — {r.Time} — {r.Event}
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

export default App;
