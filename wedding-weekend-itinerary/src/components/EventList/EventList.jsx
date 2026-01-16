import "./EventList.css";
import EventCard from "../EventCard/EventCard.jsx";
import { getEventId } from "../../utils/scheduleUtils";

export default function EventList({ events, openEventId, setOpenEventId }) {
  return (
    <div className="event-list">
      {events.map((r, i) => {
        const id = getEventId(r, i);
        return (
          <EventCard
            key={id}
            event={r}
            isOpen={openEventId === id}
            onToggle={() => setOpenEventId((curr) => (curr === id ? null : id))}
          />
        );
      })}
    </div>
  );
}
