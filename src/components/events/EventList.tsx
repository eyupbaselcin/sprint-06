import type { CampusEvent } from "../../types/campus-event";
import EventCard from "./EventCard";

interface EventListProps {
  events: CampusEvent[];
  emptyText?: string;
}

function EventList({
  events,
  emptyText = "Gösterilecek etkinlik yok.",
}: EventListProps) {
  if (events.length === 0) {
    return <p className="sonuc">{emptyText}</p>;
  }

  return (
    <section className="grid-container">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </section>
  );
}

export default EventList;
