"use client";

import { useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";
import { Mic, MicOff, PhoneOff, CalendarDays, Check, ChevronLeft, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { IslaPersona } from "@/lib/isla/personas";

interface Message {
  role: "assistant" | "user";
  content: string;
}

const ACCENT_HEX: Record<IslaPersona["accent"], string> = {
  slate: "#94A3B8",
  blue: "#4F8AFF",
  purple: "#7C5CFC",
  amber: "#F5A623",
  lime: "#8CFFB0",
};

const TIME_SLOTS = ["10:00 AM", "1:30 PM", "4:00 PM"];

function nextWeekdays(count: number): Date[] {
  const days: Date[] = [];
  const cursor = new Date();
  cursor.setDate(cursor.getDate() + 1);
  while (days.length < count) {
    if (cursor.getDay() !== 0 && cursor.getDay() !== 6) {
      days.push(new Date(cursor));
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

export function IslaVoiceWidget({ persona, onClose }: { persona: IslaPersona; onClose?: () => void }) {
  const [status, setStatus] = useState<"connecting" | "live" | "ended">("connecting");
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [view, setView] = useState<"transcript" | "booking-day" | "booking-time" | "booking-confirmed">("transcript");
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const vapiRef = useRef<Vapi | null>(null);
  const transcriptEndRef = useRef<HTMLDivElement>(null);
  const lastFinalizedRef = useRef(true);
  const accent = ACCENT_HEX[persona.accent];
  const days = nextWeekdays(5);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_VAPI_API_KEY;
    const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID_ISLA;
    if (!apiKey || !assistantId) {
      console.error("Missing NEXT_PUBLIC_VAPI_API_KEY or NEXT_PUBLIC_VAPI_ASSISTANT_ID_ISLA");
      return;
    }

    const vapi = new Vapi(apiKey);
    vapiRef.current = vapi;

    vapi.on("call-start", () => setStatus("live"));
    vapi.on("call-end", () => setStatus("ended"));
    vapi.on("speech-start", () => setIsListening(true));
    vapi.on("speech-end", () => setIsListening(false));

    vapi.on("message", (message: any) => {
      if (message.type !== "transcript" || !message.transcript) return;
      const role: "assistant" | "user" = message.role === "assistant" ? "assistant" : "user";
      const newTranscript = message.transcript.trim();
      const isFinal = message.transcriptType === "final";

      setMessages((prev) => {
        const last = prev[prev.length - 1];
        // While the current utterance is still in progress (not yet finalized),
        // each new partial replaces the open bubble instead of appending to it.
        if (last && last.role === role && !lastFinalizedRef.current) {
          return [...prev.slice(0, -1), { role, content: newTranscript }];
        }
        return [...prev, { role, content: newTranscript }];
      });
      lastFinalizedRef.current = isFinal;
    });

    vapi.on("error", (error: any) => console.error("Isla voice error:", error));

    vapi
      .start(assistantId, { variableValues: persona.vapiVariableValues })
      .catch((error) => console.error("Failed to start Isla call:", error));

    return () => {
      vapi.stop().catch(() => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [persona.id]);

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleMute = () => {
    if (!vapiRef.current) return;
    const next = !isMuted;
    vapiRef.current.setMuted(next);
    setIsMuted(next);
  };

  const endCall = () => {
    vapiRef.current?.stop().catch(() => {});
    setStatus("ended");
  };

  return (
    <div className="w-[380px] rounded-2xl border border-[#232838] bg-[#131722] shadow-2xl overflow-hidden flex flex-col max-h-[600px]">
      <div
        className="flex items-center gap-3 px-4 py-3 border-b border-[#232838]"
        style={{ background: `linear-gradient(135deg, ${accent}22, transparent)` }}
      >
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm text-[#0B0E14]"
          style={{ backgroundColor: accent }}
        >
          IS
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-white">Isla</div>
          <div className="text-xs text-[#9AA3B2] truncate">
            {status === "connecting" && "Connecting…"}
            {status === "live" && (isListening ? "Listening…" : "Speaking…")}
            {status === "ended" && "Call ended"}
          </div>
        </div>
        <span
          className={cn("w-2 h-2 rounded-full", status === "live" ? "animate-pulse" : "")}
          style={{ backgroundColor: status === "ended" ? "#475569" : accent }}
        />
        {onClose && (
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-[#9AA3B2] hover:text-white hover:bg-[#1E2433] transition"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="px-4 py-2 border-b border-[#232838] text-[11px] text-[#9AA3B2] flex items-center gap-2">
        <span className="font-medium" style={{ color: accent }}>
          {persona.segmentTag}
        </span>
        <span>·</span>
        <span className="truncate">{persona.greetingBanner}</span>
      </div>

      {view === "transcript" && (
        <>
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-[220px]">
            {messages.length === 0 && (
              <div className="text-xs text-[#5B6472] italic">
                {status === "connecting" ? "Isla is joining the call…" : "Say hello to get started."}
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed",
                    msg.role === "user" ? "bg-[#1E2433] text-white" : "text-white"
                  )}
                  style={msg.role === "assistant" ? { backgroundColor: `${accent}1A`, border: `1px solid ${accent}40` } : undefined}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            <div ref={transcriptEndRef} />
          </div>

          <div className="px-4 py-3 border-t border-[#232838] flex items-center gap-2">
            <button
              onClick={toggleMute}
              disabled={status !== "live"}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-[#1E2433] text-white disabled:opacity-40 hover:bg-[#272f42] transition"
            >
              {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
            <button
              onClick={endCall}
              disabled={status === "ended"}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-[#3A1620] text-[#FF6B6B] disabled:opacity-40 hover:bg-[#4a1c29] transition"
            >
              <PhoneOff className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView("booking-day")}
              className="flex-1 h-10 rounded-full flex items-center justify-center gap-2 text-sm font-medium text-[#0B0E14] transition hover:opacity-90"
              style={{ backgroundColor: accent }}
            >
              <CalendarDays className="w-4 h-4" />
              Schedule a call
            </button>
          </div>
        </>
      )}

      {view === "booking-day" && (
        <div className="flex-1 px-4 py-4">
          <button onClick={() => setView("transcript")} className="flex items-center gap-1 text-xs text-[#9AA3B2] hover:text-white mb-3">
            <ChevronLeft className="w-3 h-3" /> Back
          </button>
          <div className="text-sm font-medium text-white mb-3">Pick a day</div>
          <div className="grid grid-cols-1 gap-2">
            {days.map((day) => (
              <button
                key={day.toISOString()}
                onClick={() => {
                  setSelectedDay(day);
                  setView("booking-time");
                }}
                className="text-left px-3 py-2 rounded-lg border border-[#232838] text-sm text-white transition"
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = accent)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#232838")}
              >
                {day.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" })}
              </button>
            ))}
          </div>
        </div>
      )}

      {view === "booking-time" && selectedDay && (
        <div className="flex-1 px-4 py-4">
          <button onClick={() => setView("booking-day")} className="flex items-center gap-1 text-xs text-[#9AA3B2] hover:text-white mb-3">
            <ChevronLeft className="w-3 h-3" /> Back
          </button>
          <div className="text-sm font-medium text-white mb-1">
            {selectedDay.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" })}
          </div>
          <div className="text-xs text-[#9AA3B2] mb-3">Pick a time</div>
          <div className="grid grid-cols-1 gap-2">
            {TIME_SLOTS.map((slot) => (
              <button
                key={slot}
                onClick={() => {
                  setSelectedSlot(slot);
                  setView("booking-confirmed");
                }}
                className="text-left px-3 py-2 rounded-lg border border-[#232838] text-sm text-white transition"
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = accent)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#232838")}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      )}

      {view === "booking-confirmed" && selectedDay && selectedSlot && (
        <div className="flex-1 px-4 py-6 flex flex-col items-center text-center">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
            style={{ backgroundColor: `${accent}33` }}
          >
            <Check className="w-6 h-6" style={{ color: accent }} />
          </div>
          <div className="text-sm font-semibold text-white mb-1">Call confirmed</div>
          <div className="text-xs text-[#9AA3B2] mb-3 leading-relaxed">
            {selectedDay.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" })} at {selectedSlot}
            <br />
            with {persona.assignedRep ? `${persona.assignedRep.name} (${persona.assignedRep.title})` : "an Isla specialist"}
          </div>
          <button
            onClick={() => setView("transcript")}
            className="px-4 py-2 rounded-full text-sm font-medium text-[#0B0E14]"
            style={{ backgroundColor: accent }}
          >
            Back to call
          </button>
        </div>
      )}
    </div>
  );
}
