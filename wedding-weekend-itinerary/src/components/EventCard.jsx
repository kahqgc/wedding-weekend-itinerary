import "./EventCard.css";
import { useState } from "react";
import { downloadICS } from "../utils/calendar";

//helpers
function getMapEmbedUrl(event) {
  // Use Location + Address if present
  const query = [event?.Location, event?.Address].filter(Boolean).join(", ");
  if (!query) return "";

  // Simple embed that doesn't require an API key
  return `https://www.google.com/maps?q=${encodeURIComponent(
    query
  )}&output=embed`;
}

export default function EventCard({ event }) {
  const [isOpen, setIsOpen] = useState(false);
  if (!event) return null;
  const hasMap = Boolean(event?.Location || event?.Address || event?.MapsUrl || event?.MapUrl || event?.MapsLink);


  return (
    <article className={`event-card ${event.isOptional ? "optional" : ""}`}>
      <div className="event-top">
        <div className="event-time">{event?.Time}</div>

        <div className="event-info">
          <h3>{event?.Event}</h3>
          {event?.Location && (
            <p className="event-location">{event.Location}</p>
          )}
          {event?.Date && <p className="event-location">{event.Date}</p>}
        </div>
        {event.isOptional && <span className="optional-tag">*optional</span>}
        <button
          type="button"
          className={`event-expand ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
        >
          <span className="chevron" />
        </button>
      </div>
      {isOpen && (
        <div className="event-details">
          {event?.DressCode && (
            <div className="detail-row">
              <div className="detail-label">Dress Code</div>
              <div className="detail-value">{event.DressCode}</div>
            </div>
          )}

          {event?.Notes && (
            <div className="detail-row">
              <div className="detail-label">Notes</div>
              <div className="detail-value">{event.Notes}</div>
            </div>
          )}

          {/* temporary fallback */}
          {!event?.DressCode && !event?.Notes && (
            <div className="detail-row">
              <div className="detail-label">Details</div>
              <div className="detail-value">
                No extra details for this event yet.
              </div>
            </div>
          )}
          {(() => {
            const embedUrl = getMapEmbedUrl(event);
            const label = event?.Address || event?.Location; // something to show under the map
            if (!embedUrl) return null;

            return (
              <div className="map-card">
                <div className="map-frame">
                  <iframe
                    title="Map preview"
                    src={embedUrl}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                {label && (
                  <div className="map-details">
                    <span className="map-pin">📍</span>
                    <span className="map-text">{label}</span>
                  </div>
                )}
              </div>
            );
          })()}
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
      )}
    </article>
  );
}
