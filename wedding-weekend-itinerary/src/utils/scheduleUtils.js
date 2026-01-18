export const DAY_LABELS = {
  Thursday: "Thu",
  Friday: "Fri",
  Saturday: "Sat",
  Sunday: "Sun",
  Monday: "Mon",
};

export const dayOrder = ["Thursday", "Friday", "Saturday", "Sunday", "Monday"];

// helpers
export const toISODate = (d) => d.toISOString().slice(0, 10); // YYYY-MM-DD

export const isYes = (value) =>
  String(value || "").trim().toUpperCase() === "YES";

export const getEventId = (r, i) =>
  `${r.Day || ""}-${r.Date || ""}-${r.Time || ""}-${r.Event || ""}-${i}`;
