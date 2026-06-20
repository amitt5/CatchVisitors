"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  getPendingSectionId,
  clearPendingSectionId,
  subscribeToPresenter,
} from "@/lib/isla/presenter-store";

// Global presenter: watches for a pending sectionId (set when the visitor
// clicks a question in the Isla widget) and, once that section exists in the
// DOM — possibly after a route change — scrolls to it and flashes a highlight.
export function PresenterScroll() {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;
    let attempts = 0;

    const tryPresent = () => {
      const id = getPendingSectionId();
      if (!id) return;

      const tick = () => {
        if (cancelled) return;
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          el.classList.add("presenter-highlight");
          window.setTimeout(() => el.classList.remove("presenter-highlight"), 2200);
          clearPendingSectionId();
        } else if (attempts++ < 60) {
          window.setTimeout(tick, 50);
        } else {
          clearPendingSectionId();
        }
      };
      tick();
    };

    // Re-attempt whenever the route settles...
    tryPresent();
    // ...and whenever present() is called while already on the right page.
    const unsubscribe = subscribeToPresenter(() => {
      attempts = 0;
      tryPresent();
    });

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, [pathname]);

  return (
    <style jsx global>{`
      .presenter-highlight {
        animation: presenterPulse 2.2s ease;
        border-radius: 16px;
      }
      @keyframes presenterPulse {
        0% {
          box-shadow: 0 0 0 0 rgba(84, 76, 209, 0);
        }
        20% {
          box-shadow: 0 0 0 4px rgba(84, 76, 209, 0.45);
        }
        100% {
          box-shadow: 0 0 0 0 rgba(84, 76, 209, 0);
        }
      }
    `}</style>
  );
}
