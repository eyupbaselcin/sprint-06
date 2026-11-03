import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { events as initialEvents } from "../data/events";
import type { CampusEvent } from "../types/campus-event";
import EventContext from "./event-context";
import type { EventDraft } from "./event-context";

const STORAGE_KEY = "kampus-etkinlikleri-v1";
function readEvents(): CampusEvent[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed: unknown = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed as CampusEvent[];
    }
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
  return initialEvents;
}

export function EventProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<CampusEvent[]>(readEvents);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }, [events]);

  function addEvent(event: EventDraft) {
    const id = globalThis.crypto?.randomUUID?.() ?? `event-${Date.now()}`;
    setEvents((current) => [{ ...event, id }, ...current]);
  }

  function updateEvent(id: string, event: EventDraft) {
    setEvents((current) => current.map((item) => (item.id === id ? { ...event, id } : item)));
  }

  function deleteEvent(id: string) {
    setEvents((current) => current.filter((item) => item.id !== id));
  }

  return (
    <EventContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
      {children}
    </EventContext.Provider>
  );
}