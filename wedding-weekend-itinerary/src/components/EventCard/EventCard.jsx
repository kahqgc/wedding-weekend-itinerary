import "./EventCard.css";
import EventDetails from "../EventDetails/EventDetails.jsx";

export default function EventCard({ event, isOpen, onToggle }) {
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
          onClick={onToggle}
          aria-expanded={isOpen}
        >
          <span className="chevron" />
        </button>
      </div>
      {isOpen && <EventDetails event={event} />}
    </article>
  );
}
