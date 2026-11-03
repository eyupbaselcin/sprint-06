import { useState } from "react";
import type { FormEvent } from "react";
import type { Category, CampusEvent } from "../../types/campus-event";

const categoryOptions: Category[] = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];
type EventDraft = { title: string; category: Category | ""; date: string; time: string; location: string; capacity: string; description: string };
type FieldErrors = Partial<Record<keyof EventDraft, string>>;

interface EventFormProps {
  initialValue?: CampusEvent;
  onSubmit: (event: Omit<CampusEvent, "id">) => void;
}

function EventForm({ initialValue, onSubmit }: EventFormProps) {
  const [draft, setDraft] = useState<EventDraft>(() => ({
    title: initialValue?.title ?? "",
    category: initialValue?.category ?? "",
    date: initialValue?.date ?? "",
    time: initialValue?.time ?? "",
    location: initialValue?.location ?? "",
    capacity: initialValue ? String(initialValue.capacity) : "",
    description: initialValue?.description ?? "",
  }));
  const [errors, setErrors] = useState<FieldErrors>({});

  function updateField<K extends keyof EventDraft>(field: K, value: EventDraft[K]) {
    setDraft((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const capacity = Number(draft.capacity);
    const nextErrors: FieldErrors = {};
    if (draft.title.trim().length < 3) nextErrors.title = "Etkinlik adı en az 3 karakter olmalı.";
    if (!draft.category) nextErrors.category = "Bir kategori seç.";
    if (!draft.date) nextErrors.date = "Bir tarih seç.";
    if (!draft.time) nextErrors.time = "Bir saat seç.";
    if (!draft.location.trim()) nextErrors.location = "Etkinlik yerini yaz.";
    if (!Number.isInteger(capacity) || capacity < 1 || capacity > 1000) nextErrors.capacity = "1 ile 1000 arasında tam sayı gir.";
    if (draft.description.trim().length < 10) nextErrors.description = "Açıklama en az 10 karakter olmalı.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onSubmit({
      title: draft.title.trim(),
      category: draft.category as Category,
      date: draft.date,
      time: draft.time,
      location: draft.location.trim(),
      capacity,
      description: draft.description.trim(),
      image: initialValue?.image,
    });
  }

  return (
    <form className="form event-form" onSubmit={handleSubmit} noValidate>
      <label htmlFor="title">Etkinlik adı</label>
      <input id="title" name="title" value={draft.title} maxLength={80} placeholder="Örn. Tasarım buluşması" aria-invalid={Boolean(errors.title)} aria-describedby={errors.title ? "title-error" : undefined} onChange={(event) => updateField("title", event.target.value)} />
      {errors.title && <span className="field-error" id="title-error">{errors.title}</span>}

      <label htmlFor="category">Kategori</label>
      <select id="category" name="category" value={draft.category} aria-invalid={Boolean(errors.category)} aria-describedby={errors.category ? "category-error" : undefined} onChange={(event) => updateField("category", event.target.value as Category | "")}>
        <option value="">Kategori seç</option>
        {categoryOptions.map((category) => <option key={category} value={category}>{category}</option>)}
      </select>
      {errors.category && <span className="field-error" id="category-error">{errors.category}</span>}

      <div className="form-pair">
        <div><label htmlFor="date">Tarih</label><input id="date" name="date" type="date" value={draft.date} aria-invalid={Boolean(errors.date)} onChange={(event) => updateField("date", event.target.value)} />{errors.date && <span className="field-error">{errors.date}</span>}</div>
        <div><label htmlFor="time">Saat</label><input id="time" name="time" type="time" value={draft.time} aria-invalid={Boolean(errors.time)} onChange={(event) => updateField("time", event.target.value)} />{errors.time && <span className="field-error">{errors.time}</span>}</div>
      </div>

      <label htmlFor="location">Yer</label>
      <input id="location" name="location" value={draft.location} placeholder="Örn. A Blok Konferans Salonu" aria-invalid={Boolean(errors.location)} onChange={(event) => updateField("location", event.target.value)} />
      {errors.location && <span className="field-error">{errors.location}</span>}

      <label htmlFor="capacity">Kontenjan</label>
      <input id="capacity" name="capacity" type="number" min={1} max={1000} step={1} value={draft.capacity} placeholder="50" aria-invalid={Boolean(errors.capacity)} onChange={(event) => updateField("capacity", event.target.value)} />
      {errors.capacity && <span className="field-error">{errors.capacity}</span>}

      <label htmlFor="description">Açıklama</label>
      <textarea id="description" name="description" rows={4} maxLength={500} value={draft.description} placeholder="Etkinlikte neler olacağını anlat." aria-invalid={Boolean(errors.description)} onChange={(event) => updateField("description", event.target.value)} />
      <div className="form-foot"><span>{draft.description.length}/500</span><button className="button-link" type="submit">{initialValue ? "Değişiklikleri kaydet" : "Etkinliği oluştur"} <span aria-hidden="true">→</span></button></div>
      {errors.description && <span className="field-error">{errors.description}</span>}
    </form>
  );
}

export default EventForm;
