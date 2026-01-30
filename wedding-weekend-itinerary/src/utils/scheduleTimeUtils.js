export function parseStartDateTime(dateStr, timeStr) {
  if (!dateStr) return null;

  // If time missing, default midnight
  if (!timeStr) return new Date(`${dateStr}T00:00:00`);

  const t = String(timeStr).toLowerCase().replace(/\s+/g, " ").trim();

  // Grab the first time chunk "4:00" from "4:00-5:00 pm"
  const first = t.split("-")[0]?.trim();
  if (!first) return new Date(`${dateStr}T00:00:00`);

  // Determine am/pm:
  // If first time has am/pm, use it.
  // Else if overall string has "pm"/"am", use that.
  const meridiem =
    (first.match(/\b(am|pm)\b/)?.[1]) || (t.match(/\b(am|pm)\b/)?.[1]) || "";

  // Extract hour/minute from first time
  const match = first.match(/(\d{1,2})(?::(\d{2}))?/);
  if (!match) return new Date(`${dateStr}T00:00:00`);

  let hour = parseInt(match[1], 10);
  const minute = parseInt(match[2] || "0", 10);

  if (meridiem === "pm" && hour < 12) hour += 12;
  if (meridiem === "am" && hour === 12) hour = 0;

  const iso = `${dateStr}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00`;
  return new Date(iso);
}

export function formatCountdown(ms) {
  if (ms <= 0) return "Starting now";
  const totalMin = Math.round(ms / 60000);
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  if (h <= 0) return `${m} min`;
  if (m === 0) return `${h} hr`;
  return `${h} hr ${m} min`;
}

export function mapsUrl(location) {
  if (!location) return null;
  const q = encodeURIComponent(location);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}
