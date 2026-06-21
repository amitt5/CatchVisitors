import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    title: "Engage",
    description: "Greets every visitor instantly, by voice or text, in their own language."
  },
  {
    title: "Qualify",
    description: "Understands what they need and asks the right questions to figure out intent."
  },
  {
    title: "Convert",
    description: "Books the meeting or captures the lead — then logs the transcript to your CRM."
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
            Where conversations<br />
            <span className="underline decoration-[#b5d627] decoration-4">turn into customers</span>
          </h2>
          <p className="text-lg text-[#02524b]/70 max-w-xl mx-auto leading-relaxed">
            Inboundly blends context and timing, giving every visitor a reason to stay — all within one seamless conversation.
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
              Powered by Vapi · Purpose-built voice & chat AI embedded in your website
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
                No rebuild, no app to download — just a script tag and a trained agent.
              </p>
            </div>
            <Button
              asChild
              className="bg-[#b5d627] hover:bg-[#a3c322] text-[#02524b] font-semibold rounded-full w-full"
            >
              <a href="#try-it">Try It With Your Site</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
