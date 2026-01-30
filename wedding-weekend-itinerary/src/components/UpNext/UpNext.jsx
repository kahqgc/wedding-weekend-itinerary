import "./UpNext.css";
import { mapsUrl } from "../../utils/scheduleTimeUtils";

export default function UpNext({ event, countdown}) {
    if (!event) return null;

    return (
            <section className="upnext">
              <div className="upnext-banner">
                Starts in: <span>{countdown}</span>
              </div>
    
              <article className="upnext-card">
                <div className="upnext-title">{event.Event}</div>
                <div className="upnext-sub">
                  <strong>{event.Time}</strong>
                  {event.Location ? ` • ${event.Location}` : ""}
                </div>
    
                {event.Location && (
                  <a
                    className="upnext-maps"
                    href={mapsUrl(event.Location)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    📍 Open in Maps
                  </a>
                )}
              </article>
            </section>
          )
}