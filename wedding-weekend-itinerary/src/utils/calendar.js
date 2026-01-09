function parseTimeStart(timeStr) {
  if (!timeStr) return null;

  const raw = String(timeStr)
    .replace(/\u2013|\u2014/g, "-")
    .toLowerCase()
    .trim();

  const startPart = raw.split("-")[0].trim();

  // 12-hour time (4:00 pm, 4 pm)
  const m12 = startPart.match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)$/);
  if (m12) {
    let h = Number(m12[1]);
    const min = Number(m12[2] || "0");
    const mer = m12[3];

    if (mer === "am") {
      if (h === 12) h = 0;
    } else {
      if (h !== 12) h += 12;
    }
    return h * 60 + min;
  }

  // 24-hour time (16:00)
  const m24 = startPart.match(/^(\d{1,2})(?::(\d{2}))?$/);
  if (m24) {
    const h = Number(m24[1]);
    const min = Number(m24[2] || "0");
    if (h >= 0 && h <= 23 && min >= 0 && min <= 59) {
      return h * 60 + min;
    }
  }

  return null;
}

function toICSDateTime(isoDate, minutesSinceMidnight) {
  const [y, m, d] = isoDate.split("-").map(Number);
  const hh = Math.floor(minutesSinceMidnight / 60);
  const mm = minutesSinceMidnight % 60;

  const pad = (n) => String(n).padStart(2, "0");
  return `${y}${pad(m)}${pad(d)}T${pad(hh)}${pad(mm)}00`;
}

function escapeICS(str) {
  return String(str)
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function slugify(str) {
  return (
    String(str)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "")
      .slice(0, 60) || "event"
  );
}

export function downloadICS(event) {
  const title = event?.Event || "Event";
  const isoDate = event?.Date;
  const startMinutes = parseTimeStart(event?.Time);

  if (!isoDate || startMinutes == null) return;

  const dtStart = toICSDateTime(isoDate, startMinutes);
  const dtEnd = toICSDateTime(isoDate, startMinutes + 60);

  const location = [event?.Location, event?.Address]
    .filter(Boolean)
    .join(", ");

  const uid = `${Date.now()}-${Math.random().toString(16).slice(2)}@itinerary`;

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Itinerary App//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${dtStart}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${escapeICS(title)}`,
    location ? `LOCATION:${escapeICS(location)}` : "",
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `${slugify(title)}.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
