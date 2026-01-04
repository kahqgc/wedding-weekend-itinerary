import "./ScheduleView.css";
import { useEffect, useMemo, useState } from "react";
import { fetchSheetRows } from "../api/fetchItineraryFromSheet";
import DayPicker from "../components/DayPicker";
import EventCard from "../components/EventCard";

const SHEET_TAB_NAME = "VEGAS_WEDDING_MASTER_SCHEDULE_SPA_FRIDAY";

const DAY_LABELS = {
  Thursday: "Thu",
  Friday: "Fri",
  Saturday: "Sat",
  Sunday: "Sun",
  Monday: "Mon",
};

// helpers
const toISODate = (d) => d.toISOString().slice(0, 10); // YYYY-MM-DD
const isYes = (value) => String(value || "").trim().toUpperCase() === "YES";


export default function ScheduleView() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");
  const [mode, setMode] = useState("today"); // "today" | "all"
  const [selectedDay, setSelectedDay] = useState(""); // set after load

  useEffect(() => {
    fetchSheetRows(SHEET_TAB_NAME)
      .then((data) => setRows(data))
      .catch((err) => setError(err.message || "Failed to load sheet"));
  }, []);

  // Only guest-facing events
const guestRows = useMemo(() => {
  return rows
    .filter((r) => r.Who === "Everyone")
    .map((r) => ({
      ...r,
      isOptional: isYes(r.Optional), // <-- reads Optional column, YES = true
    }));
}, [rows]);


  // Build list of days available in sheet (excluding Monday if you don't want it)
  const dayOrder = ["Thursday", "Friday", "Saturday", "Sunday", "Monday"];

  const uniqueDays = useMemo(() => {
    const set = new Set(
      guestRows
        .filter((r) => r.Day !== "Monday" && r.Day !== "Thursday") // keep your exclusions
        .map((r) => r.Day)
    );

    return [...set].sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));
  }, [guestRows]);

  // Default to "Today" automatically after data loads
  useEffect(() => {
    if (uniqueDays.length === 0) return;

    // Find which Day in the sheet matches today's date (YYYY-MM-DD)
    const today = toISODate(new Date());

    const match = guestRows.find((r) => r.Date === today);
    if (match && uniqueDays.includes(match.Day)) {
      setSelectedDay(match.Day);
    } else {
      // fallback: Friday if available, otherwise first available day
      setSelectedDay(uniqueDays.includes("Friday") ? "Friday" : uniqueDays[0]);
    }
  }, [guestRows, uniqueDays]);

  // Choose which rows to show: Today vs All
  const visibleRows = useMemo(() => {
    if (!selectedDay) return [];

    if (mode === "today") {
      return guestRows.filter((r) => r.Day === selectedDay);
    }

    // "all" mode: show all guest rows for the whole weekend (still excludes Mon/Thu above via uniqueDays choice)
    return guestRows.filter((r) => uniqueDays.includes(r.Day));
  }, [guestRows, mode, selectedDay, uniqueDays]);

  // Group rows by day for "all" mode
  const groupedByDay = useMemo(() => {
    const groups = {};
    for (const r of visibleRows) {
      groups[r.Day] ??= [];
      groups[r.Day].push(r);
    }
    return groups;
  }, [visibleRows]);

  if (error) return <p style={{ color: "crimson" }}>Error: {error}</p>;
  if (rows.length === 0) return <p>Loading…</p>;

  return (
    <div className="schedule">
      {/* Today / All toggle */}
      <div className="mode-toggle">
        <button
          type="button"
          className={mode === "today" ? "mode-btn active" : "mode-btn"}
          onClick={() => setMode("today")}
        >
          Today
        </button>
        <button
          type="button"
          className={mode === "all" ? "mode-btn active" : "mode-btn"}
          onClick={() => setMode("all")}
        >
          All
        </button>
      </div>

      <DayPicker
        days={uniqueDays}
        selectedDay={selectedDay}
        labels={DAY_LABELS}
        onSelectDay={(day) => setSelectedDay(day)}
      />

      {/* Render */}
      {mode === "today" ? (
        <section className="events">
          <h2>{selectedDay}</h2>

          {visibleRows.length === 0 ? (
            <p className="empty">Nothing listed for guests this day yet.</p>
          ) : (
            <div className="event-list">
              {visibleRows.map((r, i) => (
                <EventCard key={`${r.Day}-${r.Time}-${i}`} event={r} />
              ))}
            </div>
          )}
        </section>
      ) : (
        <section className="events">
          {uniqueDays.map((day) => (
            <div key={day} className="day-group">
              <h2>{day}</h2>
              <div className="event-list">
                {(groupedByDay[day] || []).map((r, i) => (
                  <EventCard key={`${r.Day}-${r.Time}-${i}`} event={r} />
                ))}
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
