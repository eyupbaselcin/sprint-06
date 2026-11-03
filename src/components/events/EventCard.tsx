import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";
import { Link } from "react-router-dom";

interface EventCardProps {
  event: CampusEvent;
}

function EventCard({ event }: EventCardProps) {
  return (
    <article className="kart event-card">
      {event.image && <img className="event-card-image" src={event.image} alt="" loading="lazy" />}
      <div className="event-card-content">
        <div className="event-card-meta"><span className="category-pill">{event.category}</span><span>{formatDate(event.date)}</span></div>
        <h3>{event.title}</h3>
        <p className="event-card-description">{event.description}</p>
        <div className="event-card-footer"><span>{event.time} <i>·</i> {event.location}</span><Link to={`/events/${event.id}`}>Detay <span aria-hidden="true">↗</span></Link></div>
      </div>
    </article>
  );
}

export default EventCard;
