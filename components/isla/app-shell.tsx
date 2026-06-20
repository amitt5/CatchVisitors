"use client";

import { usePathname } from "next/navigation";
import { usePanelOpen } from "@/lib/isla/panel-store";

// Routes where the Isla widget is hidden — the shell must not shrink on these
// (kept in sync with the exclusion list in FloatingVoiceWidget).
function widgetHidden(pathname: string) {
  return (
    pathname === "/hotels" ||
    pathname === "/strategence" ||
    pathname === "/steel" ||
    pathname.startsWith("/chiro") ||
    pathname.startsWith("/navank") ||
    pathname.startsWith("/isla")
  );
}

// Wraps all page content. When the Isla panel is open, the shell shrinks its
// width (desktop only) so the page sits beside the panel instead of under it.
export function AppShell({ children }: { children: React.ReactNode }) {
  const open = usePanelOpen();
  const pathname = usePathname();
  const pushed = open && !widgetHidden(pathname);

  return (
    <div className={`isla-app-shell ${pushed ? "isla-app-shell--pushed" : ""}`}>
      {children}
      <style jsx>{`
        .isla-app-shell {
          width: 100%;
          transition: width 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @media (min-width: 1024px) {
          .isla-app-shell--pushed {
            width: calc(100% - 400px);
            overflow-x: hidden;
          }
        }
      `}</style>
    </div>
  );
}
