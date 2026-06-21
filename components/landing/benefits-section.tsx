import { UserCheck, Filter, Calendar, Database, Bell, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: UserCheck,
    title: "Known-visitor recognition",
    description: "Identifies returning and known visitors, matching them to accounts and CRM records for personalized, context-aware conversations."
  },
  {
    icon: Filter,
    title: "Qualification & routing",
    description: "Asks the right questions, scores leads by fit, and routes qualified prospects to the right rep automatically."
  },
  {
    icon: Calendar,
    title: "Meeting booking",
    description: "Checks real-time availability and books meetings with the right rep — no back-and-forth, no dropped handoffs."
  },
  {
    icon: Database,
    title: "CRM sync & enrichment",
    description: "Logs every transcript and enriches HubSpot and Salesforce with clean, structured conversation data and account context."
  },
  {
    icon: Bell,
    title: "Slack alerts & handoff",
    description: "Notifies your team in Slack the moment a high-intent lead is ready — with full context for a seamless handoff."
  },
  {
    icon: ShieldCheck,
    title: "Controls & guardrails",
    description: "Approved knowledge sources, fallback rules, and escalation paths keep every answer on-brand, accurate, and compliant."
  }
];

export function BenefitsSection() {
  return (
    <section id="features" className="py-24 md:py-32 bg-[#f0f8f3]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#02524b]/50 mb-4 block">
            What Inboundly Does
          </span>
          <h2
            className="text-4xl md:text-5xl font-normal leading-tight tracking-tight text-[#02524b] mb-4"
            style={{ fontFamily: 'var(--font-serif, Georgia, serif)' }}
          >
            Everything your inbound team<br />can't do in real time
          </h2>
          <p className="text-lg text-[#02524b]/70 max-w-xl mx-auto leading-relaxed">
            From first touch to booked meeting — qualified, routed, and synced to your CRM and sales workflows.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-8 bg-white border border-[#02524b]/10 rounded-2xl transition-all duration-300 hover:border-[#b5d627] hover:-translate-y-1 hover:shadow-md"
            >
              <div className="w-10 h-10 rounded-lg bg-[#f0f8f3] flex items-center justify-center mb-5">
                <feature.icon className="w-5 h-5 text-[#02524b]" strokeWidth={1.5} />
              </div>
              <h3
                className="text-lg md:text-xl font-normal mb-2 text-[#02524b]"
                style={{ fontFamily: 'var(--font-serif, Georgia, serif)' }}
              >
                {feature.title}
              </h3>
              <p className="text-sm text-[#02524b]/70 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
