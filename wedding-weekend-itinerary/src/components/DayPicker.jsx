export default function DayPicker({ days, selectedDay, onSelectDay, labels }) {
    return (
    <section className="day-picker">
              {days.map((day) => (
                <button
                  key={day}
                  type="button"
                  className={day === selectedDay ? "day-btn active" : "day-btn"}
                  onClick={() => onSelectDay(day)
                  }
                >
                  {labels?.[day] ?? day}
                </button>
              ))}
            </section>
    )
}