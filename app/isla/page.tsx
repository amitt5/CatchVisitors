import Link from "next/link";
import { Settings2, FolderKanban, Users, ArrowRight, Mic } from "lucide-react";
import { IslaWidgetLauncher } from "@/components/isla/isla-widget-launcher";

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
    <div className="min-h-screen bg-[#F0F8F3] text-[#10201D]">
      <nav className="flex items-center justify-between px-8 py-5 border-b border-[#DDE8E3] bg-white">
        <span className="text-lg font-semibold tracking-tight text-[#02524B]">Isla</span>
        <span className="text-xs text-[#5F706C]">Inbound Sales &amp; Lead Agent</span>
      </nav>

      <header className="relative max-w-4xl mx-auto px-8 pt-20 pb-16 text-center">
        <div
          className="absolute inset-0 -z-10 pointer-events-none"
          style={{ background: "radial-gradient(circle at 50% 0%, #02524B22, transparent 60%)" }}
        />
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05] mb-6">
          Meet Isla.
        </h1>
        <p className="text-lg text-[#5F706C] max-w-xl mx-auto">
          Your AI Inbound Sales &amp; Lead Agent — it knows who&apos;s on your website,
          talks to them like a rep would, and books the meeting.
        </p>
      </header>

      <main className="max-w-5xl mx-auto px-8 pb-24">
        <section className="mb-16">
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-xs font-medium tracking-wide text-[#02524B]">ACT 1</span>
            <h2 className="text-xl font-semibold">See the platform</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ACT1_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.href}
                  href={card.href}
                  className="group rounded-2xl border border-[#DDE8E3] bg-white p-6 hover:border-[#02524B] transition shadow-sm"
                >
                  <Icon className="w-5 h-5 text-[#02524B] mb-4" />
                  <div className="font-medium text-[#10201D] mb-1 flex items-center justify-between">
                    {card.title}
                    <ArrowRight className="w-4 h-4 text-[#5F706C] group-hover:text-[#02524B] group-hover:translate-x-0.5 transition" />
                  </div>
                  <p className="text-sm text-[#5F706C]">{card.description}</p>
                </Link>
              );
            })}
          </div>
        </section>

        <section>
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-xs font-medium tracking-wide text-[#02524B]">ACT 2</span>
            <h2 className="text-xl font-semibold">Watch Isla work</h2>
          </div>
          <Link
            href="/isla/live"
            className="group rounded-2xl border border-[#DDE8E3] bg-white p-8 flex items-center justify-between hover:border-[#02524B] transition shadow-sm"
          >
            <div>
              <div className="font-medium text-[#10201D] text-lg mb-1 flex items-center gap-2">
                <Mic className="w-5 h-5 text-[#02524B]" />
                Launch the live demo
              </div>
              <p className="text-sm text-[#5F706C] max-w-md">
                Pick a visitor persona and talk to Isla live — same agent, same prompt,
                five completely different conversations.
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-[#02524B] group-hover:translate-x-1 transition shrink-0" />
          </Link>
        </section>
      </main>

      <IslaWidgetLauncher />
    </div>
  );
}
