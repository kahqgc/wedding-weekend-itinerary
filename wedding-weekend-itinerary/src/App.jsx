import "./App.css";
import { useState, useEffect } from "react";
import { fetchSheetRows } from "./api/fetchItineraryFromSheet";

function App() {
  // VEGAS_WEDDING_MASTER_SCHEDULE_SPA_FRIDAY
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");
  const [selectedDay, setSelectedDay] = useState("Friday");
  const SHEET_TAB_NAME = "VEGAS_WEDDING_MASTER_SCHEDULE_SPA_FRIDAY";

  useEffect(() => {
    fetchSheetRows(SHEET_TAB_NAME)
      .then((data) => setRows(data))
      .catch((err) => setError(err.message || "Failed to load sheet"));
  }, []);

  const uniqueDays = [...new Set(rows.map((r) => r.Day))];

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
            <div>
              {uniqueDays.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  style={{
                    marginRight: "8px",
                    fontWeight: day === selectedDay ? "bold" : "normal",
                  }}
                >
                  {day}
                </button>
              ))}
            </div>
            <hr />
            <ul>
              {rows
                .filter((r) => r.Day === selectedDay && r.Who === "Everyone")
                .map((r, i) => (
                  <li key={i}>
                    {r.Time} — {r.Event}
                  </li>
                ))}
            </ul>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
