import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getPersonaById } from "@/lib/isla/personas";
import { IslaVoiceWidget } from "@/components/isla/isla-voice-widget";

const ACCENT_HEX: Record<string, string> = {
  slate: "#5F706C",
  blue: "#02524B",
  purple: "#02524B",
  amber: "#D99A21",
  lime: "#B5D627",
};

export default async function IslaLivePersonaPage({
  params,
}: {
  params: Promise<{ personaId: string }>;
}) {
  const { personaId } = await params;
  const persona = getPersonaById(personaId);
  if (!persona) notFound();

  const accent = ACCENT_HEX[persona.accent];
  const isAnonymous = persona.name === null;

  return (
    <div className="min-h-screen bg-[#F0F8F3] text-[#10201D] relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(circle at 20% 0%, ${accent}18, transparent 50%)` }}
      />

      <nav className="relative z-10 flex items-center justify-between px-8 py-5 border-b border-[#DDE8E3] bg-white">
        <div className="flex items-center gap-8">
          <span className="text-lg font-semibold tracking-tight text-[#02524B]">Isla</span>
          <div className="hidden md:flex items-center gap-6 text-sm text-[#5F706C]">
            <span>Product</span>
            <span>Pricing</span>
            <span>Customers</span>
            <span>Resources</span>
          </div>
        </div>
        <Link
          href="/isla/live"
          className="flex items-center gap-1.5 text-sm text-[#5F706C] hover:text-[#02524B] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Try another persona
        </Link>
      </nav>

      <div className="relative z-10 px-8 py-3 border-b border-[#DDE8E3] bg-white">
        <div
          className="max-w-3xl mx-auto text-center text-sm rounded-full px-4 py-2 text-[#10201D]"
          style={{ backgroundColor: `${accent}14`, border: `1px solid ${accent}40` }}
        >
          {isAnonymous ? (
            <>
              <span style={{ color: accent }}>● </span>
              New visitor — no CRM match. Isla will qualify them live, with no prior context.
            </>
          ) : (
            <>
              <span style={{ color: accent }}>● </span>
              Isla recognized this visitor instantly:{" "}
              <strong>{persona.name}</strong> · {persona.company} · {persona.role} —{" "}
              {persona.greetingBanner}
            </>
          )}
        </div>
      </div>

      <main className="relative z-10 max-w-5xl mx-auto px-8 pt-20 pb-32 text-center">
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05] mb-6">
          Turn your website into
          <br />
          your best seller.
        </h1>
        <p className="text-lg text-[#5F706C] max-w-xl mx-auto mb-10">
          Isla is the AI SDR that engages, qualifies, and books meetings with your
          website visitors — the instant they land, 24/7.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button className="px-6 py-3 rounded-full text-sm font-medium text-white bg-[#02524B]">
            Book a demo
          </button>
          <button className="px-6 py-3 rounded-full text-sm font-medium text-[#02524B] border border-[#DDE8E3] bg-white">
            Watch Isla in action
          </button>
        </div>

        <div className="mt-24 flex items-center justify-center gap-10 text-[#5F706C] text-sm uppercase tracking-wide">
          <span>Brightwave</span>
          <span>Lumio</span>
          <span>Northstar Logistics</span>
          <span>Tinkerly</span>
        </div>
      </main>

      <div className="fixed bottom-6 right-6 z-50">
        <IslaVoiceWidget persona={persona} />
      </div>
    </div>
  );
}
