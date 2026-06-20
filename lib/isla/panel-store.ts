// Shared open/closed state for the Isla side panel, so the page layout can
// shrink to make room for it (push mode) while the widget owns the toggle.

import { useSyncExternalStore } from "react";

export const PANEL_WIDTH = 400;

let isOpen = false;
const listeners = new Set<() => void>();

export function setPanelOpen(open: boolean) {
  if (isOpen === open) return;
  isOpen = open;
  listeners.forEach((fn) => fn());
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

export function usePanelOpen() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
