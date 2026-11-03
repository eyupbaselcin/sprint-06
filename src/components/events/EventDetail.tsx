import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
  onBack: () => void;
  onEdit: (id: string) => void;
}

function EventDetail({ event, onBack, onEdit }: EventDetailProps) {
  return (
    <article className="detay detay-grid">
      {event.image && (
        <figure className="detay-afis">
          <img src={event.image} alt={`${event.title} afişi`} />
          <figcaption>
            <i>{event.title} afişi</i>
          </figcaption>
        </figure>
      )}
      <div className="detay-kunye">
        <h2>{event.title}</h2>
        <dl>
          <dt>
            <strong>Tarih</strong>
          </dt>
          <dd>
            {formatDate(event.date)}, {event.time}
          </dd>
          <dt>
            <strong>Yer</strong>
          </dt>
          <dd>{event.location}</dd>
          <dt>
            <strong>Kategori</strong>
          </dt>
          <dd>{event.category}</dd>
          <dt>
            <strong>Kontenjan</strong>
          </dt>
          <dd>{event.capacity} kişi</dd>
        </dl>
      </div>
      <div className="detay-aciklama">
        <h3>Açıklama</h3>
        <p>{event.description}</p>
        <button type="button" onClick={onBack}>
          &larr; Listeye dön
        </button>
        <button type="button" onClick={() => onEdit(event.id)}>
          Bu etkinliği güncelle
        </button>
      </div>
    </article>
  );
}

export default EventDetail;
