import "./EventDetails.css";
import { downloadICS } from "../../utils/calendar";
import DetailRow from "../DetailRow/DetailRow.jsx";
import MapPreview from "../MapPreview/MapPreview.jsx";

export default function EventDetails({ event }) {
  const hasMap = Boolean(
    event?.Location ||
      event?.Address ||
      event?.MapsUrl ||
      event?.MapUrl ||
      event?.MapsLink
  );
  return (
    <div className="event-details">
      {event?.DressCode && (
        <DetailRow label="Dress Code">{event.DressCode}</DetailRow>
      )}

      {event?.Notes && <DetailRow label="Notes">{event.Notes}</DetailRow>}

      {/* temporary fallback */}
      {!event?.DressCode && !event?.Notes && (
        <DetailRow label="Details">
          No extra details for this event yet.
        </DetailRow>
      )}
      <MapPreview event={event} />
      {hasMap && (
        <button
          type="button"
          className="calendar-btn"
          onClick={() => downloadICS(event)}
        >
          📅 Add to Calendar
        </button>
      )}
    </div>
  );
}
