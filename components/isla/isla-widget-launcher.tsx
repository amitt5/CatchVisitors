"use client";

import { useState } from "react";
import { Mic } from "lucide-react";
import { IslaVoiceWidget } from "@/components/isla/isla-voice-widget";
import { getPersonaById } from "@/lib/isla/personas";

const DEFAULT_PERSONA_ID = "cold-anonymous";

export function IslaWidgetLauncher() {
  const [open, setOpen] = useState(false);
  const persona = getPersonaById(DEFAULT_PERSONA_ID);

  if (!persona) return null;

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform"
        style={{ backgroundColor: "#02524B" }}
      >
        <span className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ backgroundColor: "#02524B" }} />
        <Mic className="w-6 h-6 text-white relative z-10" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <IslaVoiceWidget persona={persona} onClose={() => setOpen(false)} />
    </div>
  );
}
