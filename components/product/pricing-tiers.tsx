import { Check } from "lucide-react";

interface Tier {
  name: string;
  intro: string;
  features: string[];
  featured?: boolean;
}

const TIERS: Tier[] = [
  {
    name: "Premier",
    intro: "Isla the AI Agent can…",
    features: [
      "Have conversations using video, voice, or text",
      "Schedule sales meetings",
      "Send personalized AI-generated emails",
      "Nurture buyers with unique marketing offers",
      "Collaborate with teammates in Slack",
      "Enterprise single sign-on",
      "Multi-language agent",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    intro: "Everything in Premier, plus…",
    features: [
      "Enterprise-grade APIs",
      "Custom cookie and data retention policies",
      "Third-party research intent signals",
      "CRM sandbox support",
      "Multiple websites and brands",
    ],
  },
  {
    name: "Ultimate",
    intro: "Everything in Enterprise, plus…",
    features: [
      "Multiple agent profiles",
      "Multiple production instances",
      "High-volume websites",
      "High-volume contact databases",
    ],
  },
];

export function PricingTiers() {
  return (
    <section className="px-6 pb-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {TIERS.map((tier) => (
          <div
            key={tier.name}
            className={`rounded-2xl border bg-white p-7 flex flex-col ${
              tier.featured ? "border-[#544CD1] shadow-lg" : "border-black/[0.08]"
            }`}
          >
            <div className="text-xs font-medium text-[#02524b]/50 mb-1">
              Agentic Marketing Platform
            </div>
            <h3 className="text-2xl font-semibold text-[#02524b] mb-5">{tier.name}</h3>
            <div className="text-sm font-medium text-[#02524b] mb-4">{tier.intro}</div>
            <ul className="space-y-3 flex-1">
              {tier.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-[#02524b]/80">
                  <Check className="w-4 h-4 text-[#544CD1] mt-0.5 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <button className="mt-7 bg-[#544CD1] text-white text-sm font-semibold py-3 rounded-full hover:bg-[#463EC4] transition-colors">
              Schedule a demo
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

const ALL_PLANS = [
  [
    "AI SDR Agent Studio",
    "Agent Spotlight",
    "Account segmentation with waterfall enrichment",
    "Integrations with your CRM and 20+ leading go-to-market systems",
  ],
  [
    "Isla reporting and analytics",
    "CRM reporting and analytics",
    "Advanced conversation, email, and meeting routing",
    "Automated workflow actions and notifications in third-party systems",
  ],
];

export function AllPlansInclude() {
  return (
    <section className="px-6 py-16">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-black/[0.08] p-8 md:p-12">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#02524b] text-center mb-10">
          All plans include
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
          {ALL_PLANS.flat().map((item) => (
            <div key={item} className="flex items-start gap-2.5 text-sm text-[#02524b]/80">
              <Check className="w-4 h-4 text-[#544CD1] mt-0.5 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
