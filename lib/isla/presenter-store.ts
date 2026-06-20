// Tiny module-level store so the global Isla widget can ask the app to
// "present" (scroll to + highlight) a section on whatever page is showing.

let pendingSectionId: string | null = null;
const listeners = new Set<() => void>();

export function present(sectionId: string) {
  pendingSectionId = sectionId;
  listeners.forEach((fn) => fn());
}

export function getPendingSectionId() {
  return pendingSectionId;
}

export function clearPendingSectionId() {
  pendingSectionId = null;
}

export function subscribeToPresenter(fn: () => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
