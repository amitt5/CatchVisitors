import { ArrowRight } from "lucide-react";
import { BookDemoButton } from "@/components/landing/book-demo-button";

const steps = [
  {
    title: "Detect intent",
    description: "Recognizes known and anonymous visitors and reads their intent from behavior and account context."
  },
  {
    title: "Engage",
    description: "Starts the conversation instantly, by voice or text, in the visitor's own language."
  },
  {
    title: "Qualify & enrich",
    description: "Asks the right questions, scores by fit, and enriches the record with structured data."
  },
  {
    title: "Book, route & sync",
    description: "Books with the right rep, routes the lead, and logs the full transcript to your CRM and Slack."
  }
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-[#f0f8f3]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-normal leading-tight tracking-tight mb-4 text-[#02524b]"
            style={{ fontFamily: 'var(--font-serif, Georgia, serif)' }}
          >
            Where website intent<br />
            <span className="underline decoration-[#b5d627] decoration-4">turns into pipeline</span>
          </h2>
          <p className="text-lg text-[#02524b]/70 max-w-xl mx-auto leading-relaxed">
            Inboundly blends account context and timing to qualify, route, and book — all within one seamless conversation, synced to your CRM.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          <div className="md:col-span-2 bg-[#02524b] rounded-2xl p-8 md:p-10">
            <div className="flex flex-col md:flex-row items-stretch gap-3">
              {steps.map((step, index) => (
                <div key={step.title} className="flex items-stretch flex-1">
                  <div className="bg-white/10 rounded-xl p-5 flex-1">
                    <div className="text-xs font-semibold text-[#b5d627] uppercase tracking-wider mb-2">
                      Step {index + 1}
                    </div>
                    <h3
                      className="text-xl font-normal text-white mb-2"
                      style={{ fontFamily: 'var(--font-serif, Georgia, serif)' }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-sm text-white/70 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:flex items-center px-2">
                      <ArrowRight className="w-5 h-5 text-[#b5d627]" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-white/50 mt-6">
              CRM-native · Syncs to HubSpot, Salesforce, Slack, and your sales workflows
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 flex flex-col justify-between border border-[#02524b]/10">
            <div>
              <h3
                className="text-2xl font-normal text-[#02524b] mb-3"
                style={{ fontFamily: 'var(--font-serif, Georgia, serif)' }}
              >
                Live on your site in days
              </h3>
              <p className="text-sm text-[#02524b]/70 leading-relaxed mb-6">
                Deploy on your site, connect your CRM, and start routing qualified conversations in days — no rebuild required.
              </p>
            </div>
            <BookDemoButton
              className="bg-[#b5d627] hover:bg-[#a3c322] text-[#02524b] font-semibold rounded-full w-full"
            >
              Book a demo
            </BookDemoButton>
          </div>
        </div>
      </div>
    </section>
  );
}
