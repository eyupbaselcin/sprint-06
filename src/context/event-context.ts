import { createContext } from "react";
import type { CampusEvent } from "../types/campus-event";

export type EventDraft = Omit<CampusEvent, "id">;

export interface EventContextValue {
  events: CampusEvent[];
  addEvent: (event: EventDraft) => void;
  updateEvent: (id: string, event: EventDraft) => void;
  deleteEvent: (id: string) => void;
}

const EventContext = createContext<EventContextValue | null>(null);

export default EventContext;