import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ISLA_PERSONAS } from "@/lib/isla/personas";

const ACCENT_HEX: Record<string, string> = {
  slate: "#5F706C",
  blue: "#02524B",
  purple: "#02524B",
  amber: "#D99A21",
  lime: "#B5D627",
};

export default function IslaPersonaPickerPage() {
  return (
    <div className="min-h-screen bg-[#F0F8F3] text-[#10201D]">
      <nav className="flex items-center justify-between px-8 py-5 border-b border-[#DDE8E3] bg-white">
        <span className="text-lg font-semibold tracking-tight text-[#02524B]">Isla</span>
        <Link href="/isla" className="flex items-center gap-1.5 text-sm text-[#5F706C] hover:text-[#02524B] transition">
          <ArrowLeft className="w-4 h-4" />
          Back to Isla
        </Link>
      </nav>

      <main className="max-w-5xl mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
            Pick a visitor to simulate
          </h1>
          <p className="text-[#5F706C] max-w-xl mx-auto">
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
                className="group rounded-2xl border border-[#DDE8E3] bg-white p-5 flex items-start gap-4 hover:border-[#02524B] transition shadow-sm"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-semibold text-sm text-white shrink-0"
                  style={{ backgroundColor: accent }}
                >
                  {persona.avatarInitials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-medium text-[#10201D]">
                      {persona.name ?? "Anonymous Visitor"}
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#5F706C] group-hover:text-[#02524B] group-hover:translate-x-0.5 transition shrink-0" />
                  </div>
                  <div className="text-sm text-[#5F706C] mb-2">
                    {persona.role ? `${persona.role} · ${persona.company}` : "No CRM record"}
                  </div>
                  <div
                    className="inline-block text-[11px] font-medium px-2 py-0.5 rounded-full mb-2"
                    style={{ backgroundColor: `${accent}1F`, color: accent }}
                  >
                    {persona.segmentTag}
                  </div>
                  <div className="text-xs text-[#5F706C]">{persona.greetingBanner}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
