// Shared open/closed state for the "Book a demo" calendar modal, so any CTA
// across the landing page can open the same modal without prop drilling.

import { useSyncExternalStore } from "react";

let isOpen = false;
const listeners = new Set<() => void>();

export function setBookDemoOpen(open: boolean) {
  if (isOpen === open) return;
  isOpen = open;
  listeners.forEach((fn) => fn());
}

export function openBookDemo() {
  setBookDemoOpen(true);
}

function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function getSnapshot() {
  return isOpen;
}

function getServerSnapshot() {
  return false;
}

export function useBookDemoOpen() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
