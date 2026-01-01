import "./App.css";
import { useState, useEffect } from "react";
import { fetchSheetRows } from "./api/fetchItineraryFromSheet";
import DayPicker from "./components/DayPicker";
import EventCard from "./components/EventCard";
import Pager from "./components/Pager";

const SHEET_TAB_NAME = "VEGAS_WEDDING_MASTER_SCHEDULE_SPA_FRIDAY";
const DAY_LABELS = {
  Thursday: "Thu",
  Friday: "Fri",
  Saturday: "Sat",
  Sunday: "Sun",
  Monday: "Mon",
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
    ...new Set(
      rows
        .filter((r) => r.Day !== "Monday" && r.Day !== "Thursday")
        .map((r) => r.Day)
    ),
  ].sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));

  const visibleRows = rows.filter(
    (r) => r.Day === selectedDay && r.Who === "Everyone"
  );

  const safeIndex = visibleRows.length === 0 ? 0 : Math.min(activeIndex, visibleRows.length - 1);
  const event = visibleRows[safeIndex];

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
            <DayPicker
              days={uniqueDays}
              selectedDay={selectedDay}
              labels={DAY_LABELS}
              onSelectDay={(day) => {
                setSelectedDay(day);
                setActiveIndex(0);
              }}
            />
            <section className="events">
              <h2>{selectedDay}</h2>

              {visibleRows.length === 0 ? (
                <p className="empty">Nothing listed for guests this day yet.</p>
              ) : (
                <>
                  <EventCard event={event} />
                  <Pager
                    index={safeIndex}
                    total={visibleRows.length}
                    onPrev={() => setActiveIndex((i) => Math.max(0, i - 1))}
                    onNext={() =>
                      setActiveIndex((i) =>
                        Math.min(visibleRows.length - 1, i + 1)
                      )
                    }
                  />
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
