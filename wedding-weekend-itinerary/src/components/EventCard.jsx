import "./EventCard.css";
import { useState } from "react";

export default function EventCard({ event }) {
  const [isOpen, setIsOpen] = useState(false);
  if (!event) return null;

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
        </div>
      )}
    </article>
  );
}
