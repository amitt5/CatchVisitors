import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ISLA_PERSONAS } from "@/lib/isla/personas";

const ACCENT_HEX: Record<string, string> = {
  slate: "#94A3B8",
  blue: "#4F8AFF",
  purple: "#7C5CFC",
  amber: "#F5A623",
  lime: "#8CFFB0",
};

export default function IslaPersonaPickerPage() {
  return (
    <div className="min-h-screen bg-[#0B0E14] text-white">
      <nav className="flex items-center justify-between px-8 py-5 border-b border-[#1A1F2C]">
        <span className="text-lg font-semibold tracking-tight">Isla</span>
        <Link href="/isla" className="flex items-center gap-1.5 text-sm text-[#9AA3B2] hover:text-white transition">
          <ArrowLeft className="w-4 h-4" />
          Back to Isla
        </Link>
      </nav>

      <main className="max-w-5xl mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
            Pick a visitor to simulate
          </h1>
          <p className="text-[#9AA3B2] max-w-xl mx-auto">
            Each persona carries different CRM context. Watch Isla greet and handle each
            one completely differently — same agent, same prompt, different facts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ISLA_PERSONAS.map((persona) => {
            const accent = ACCENT_HEX[persona.accent];
            return (
              <Link
                key={persona.id}
                href={`/isla/live/${persona.id}`}
                className="group rounded-2xl border border-[#1F2531] bg-[#10141C] p-5 flex items-start gap-4 hover:border-[#2A3142] transition"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-semibold text-sm text-[#0B0E14] shrink-0"
                  style={{ backgroundColor: accent }}
                >
                  {persona.avatarInitials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-medium text-white">
                      {persona.name ?? "Anonymous Visitor"}
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#5B6472] group-hover:text-white group-hover:translate-x-0.5 transition shrink-0" />
                  </div>
                  <div className="text-sm text-[#9AA3B2] mb-2">
                    {persona.role ? `${persona.role} · ${persona.company}` : "No CRM record"}
                  </div>
                  <div
                    className="inline-block text-[11px] font-medium px-2 py-0.5 rounded-full mb-2"
                    style={{ backgroundColor: `${accent}1F`, color: accent }}
                  >
                    {persona.segmentTag}
                  </div>
                  <div className="text-xs text-[#5B6472]">{persona.greetingBanner}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
