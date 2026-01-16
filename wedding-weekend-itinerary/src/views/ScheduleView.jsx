import "./ScheduleView.css";
import { useEffect, useMemo, useState } from "react";
import DayPicker from "../components/DayPicker/DayPicker.jsx";
import ModeToggle from "../components/ModeToggle/ModeToggle.jsx";
import EventList from "../components/EventList/EventList.jsx";
import { DAY_LABELS } from "../utils/scheduleUtils.js";
import { useScheduleData } from "../hooks/useScheduleData.js";

const SHEET_TAB_NAME = "VEGAS_WEDDING_MASTER_SCHEDULE_SPA_FRIDAY";

export default function ScheduleView() {
  const { rows, error, guestRows, uniqueDays, selectedDay, setSelectedDay } =
    useScheduleData(SHEET_TAB_NAME);

  const [mode, setMode] = useState("today");
  const [openEventId, setOpenEventId] = useState(null);

  useEffect(() => {
    setOpenEventId(null);
  }, [mode]);

  useEffect(() => {
    setOpenEventId(null);
  }, [selectedDay]);

  // Choose which rows to show: Today vs All
  const visibleRows = useMemo(() => {
    if (!selectedDay) return [];

    if (mode === "today")
      return guestRows.filter((r) => r.Day === selectedDay);
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
      <ModeToggle mode={mode} onChange={setMode} />

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
            <EventList
              events={visibleRows}
              openEventId={openEventId}
              setOpenEventId={setOpenEventId}
            />
          )}
        </section>
      ) : (
        <section className="events">
          {uniqueDays.map((day) => (
            <div key={day} className="day-group">
              <h2>{day}</h2>
              <EventList
                events={groupedByDay[day]}
                openEventId={openEventId}
                setOpenEventId={setOpenEventId}
              />
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
