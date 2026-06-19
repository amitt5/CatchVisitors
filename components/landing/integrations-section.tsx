import { Calendar, Cloud, Slack, Mail, Webhook } from "lucide-react";

const integrations = [
  { icon: Calendar, name: "Google Calendar" },
  { icon: Cloud, name: "Salesforce" },
  { icon: Mail, name: "HubSpot" },
  { icon: Slack, name: "Slack" },
  { icon: Webhook, name: "Your CRM" },
];

export function IntegrationsSection() {
  return (
    <section className="py-16 text-center bg-white border-t border-b border-[#02524b]/10">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-xs font-medium text-[#02524b]/50 uppercase tracking-widest mb-9">
          Works with what you already use
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {integrations.map(({ icon: Icon, name }) => (
            <div key={name} className="flex items-center gap-2.5 text-[#02524b]/70">
              <Icon className="w-5 h-5" strokeWidth={1.5} />
              <span
                className="text-base whitespace-nowrap"
                style={{ fontFamily: 'var(--font-serif, Georgia, serif)' }}
              >
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
