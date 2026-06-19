import Link from "next/link";
import { Settings2, FolderKanban, Users, ArrowRight, Mic } from "lucide-react";

const ACT1_CARDS = [
  {
    href: "/isla/setup",
    icon: Settings2,
    title: "Agent Setup",
    description: "Name your agent, pick a voice, set the brand colors.",
  },
  {
    href: "/isla/content",
    icon: FolderKanban,
    title: "Content Library",
    description: "Marketing content, customer stories, competitive intel, guides.",
  },
  {
    href: "/isla/crm",
    icon: Users,
    title: "CRM",
    description: "Accounts and contacts, synced from HubSpot.",
  },
];

export default function IslaHomePage() {
  return (
    <div className="min-h-screen bg-[#0B0E14] text-white">
      <nav className="flex items-center justify-between px-8 py-5 border-b border-[#1A1F2C]">
        <span className="text-lg font-semibold tracking-tight">Isla</span>
        <span className="text-xs text-[#5B6472]">Inbound Sales &amp; Lead Agent</span>
      </nav>

      <header className="relative max-w-4xl mx-auto px-8 pt-20 pb-16 text-center">
        <div
          className="absolute inset-0 -z-10 pointer-events-none"
          style={{ background: "radial-gradient(circle at 50% 0%, #7C5CFC22, transparent 60%)" }}
        />
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05] mb-6">
          Meet Isla.
        </h1>
        <p className="text-lg text-[#9AA3B2] max-w-xl mx-auto">
          Your AI Inbound Sales &amp; Lead Agent — it knows who&apos;s on your website,
          talks to them like a rep would, and books the meeting.
        </p>
      </header>

      <main className="max-w-5xl mx-auto px-8 pb-24">
        <section className="mb-16">
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-xs font-medium tracking-wide text-[#7C5CFC]">ACT 1</span>
            <h2 className="text-xl font-semibold">See the platform</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ACT1_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.href}
                  href={card.href}
                  className="group rounded-2xl border border-[#1F2531] bg-[#10141C] p-6 hover:border-[#2A3142] transition"
                >
                  <Icon className="w-5 h-5 text-[#7C5CFC] mb-4" />
                  <div className="font-medium text-white mb-1 flex items-center justify-between">
                    {card.title}
                    <ArrowRight className="w-4 h-4 text-[#5B6472] group-hover:text-white group-hover:translate-x-0.5 transition" />
                  </div>
                  <p className="text-sm text-[#9AA3B2]">{card.description}</p>
                </Link>
              );
            })}
          </div>
        </section>

        <section>
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-xs font-medium tracking-wide text-[#8CFFB0]">ACT 2</span>
            <h2 className="text-xl font-semibold">Watch Isla work</h2>
          </div>
          <Link
            href="/isla/live"
            className="group rounded-2xl border border-[#243024] bg-gradient-to-br from-[#10141C] to-[#0F1C16] p-8 flex items-center justify-between hover:border-[#2F4A35] transition"
          >
            <div>
              <div className="font-medium text-white text-lg mb-1 flex items-center gap-2">
                <Mic className="w-5 h-5 text-[#8CFFB0]" />
                Launch the live demo
              </div>
              <p className="text-sm text-[#9AA3B2] max-w-md">
                Pick a visitor persona and talk to Isla live — same agent, same prompt,
                five completely different conversations.
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-[#8CFFB0] group-hover:translate-x-1 transition shrink-0" />
          </Link>
        </section>
      </main>
    </div>
  );
}
