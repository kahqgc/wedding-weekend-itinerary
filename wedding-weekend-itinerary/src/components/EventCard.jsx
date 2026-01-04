import "./EventCard.css";

export default function EventCard({event}){
    if (!event) return null;
    return (
             <article className={`event-card ${event.isOptional ? "optional" : ""}`}>
                    <div className="event-time">{event?.Time}</div>

                    <div className="event-info">
                      <h3>{event?.Event}</h3>
                      {event?.Location && (
                        <p className="event-location">{event.Location}</p>
                      )}
                      {event?.Date && (
                        <p className="event-location">{event.Date}</p>
                      )}
                    </div>
                  </article>
    )
}