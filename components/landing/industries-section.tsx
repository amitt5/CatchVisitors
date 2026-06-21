import { Megaphone, Target, Database, LifeBuoy } from "lucide-react";

const audiences = [
  {
    icon: Megaphone,
    name: "Marketing",
    pitch: "Convert anonymous traffic and campaign visitors into pipeline — not just form fills.",
  },
  {
    icon: Target,
    name: "Sales",
    pitch: "Qualify inbound leads and route them to the right rep, instantly.",
  },
  {
    icon: Database,
    name: "RevOps",
    pitch: "Sync clean, enriched conversation data straight to HubSpot and Salesforce.",
  },
  {
    icon: LifeBuoy,
    name: "Customer teams",
    pitch: "Answer product questions and escalate to a human the moment it's needed.",
  },
];

export function IndustriesSection() {
  return (
    <section id="industries" className="py-16 bg-white border-t border-b border-[#02524b]/10">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-xs font-medium text-[#02524b]/50 uppercase tracking-widest text-center mb-10">
          Built for revenue teams
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {audiences.map((audience) => (
            <div
              key={audience.name}
              className="p-6 bg-white border border-[#02524b]/10 rounded-2xl transition-all duration-300 hover:border-[#b5d627] hover:-translate-y-1 hover:shadow-md"
            >
              <div className="w-10 h-10 rounded-lg bg-[#f0f8f3] flex items-center justify-center mb-5">
                <audience.icon className="w-5 h-5 text-[#02524b]" strokeWidth={1.5} />
              </div>
              <h3
                className="text-lg font-normal mb-2 text-[#02524b]"
                style={{ fontFamily: 'var(--font-serif, Georgia, serif)' }}
              >
                {audience.name}
              </h3>
              <p className="text-sm text-[#02524b]/70 leading-relaxed">
                {audience.pitch}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
