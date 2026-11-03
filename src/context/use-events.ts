import { useContext } from "react";
import EventContext from "./event-context";

export function useEvents() {
  const context = useContext(EventContext);
  if (!context) throw new Error("useEvents, EventProvider içinde kullanılmalıdır.");
  return context;
}