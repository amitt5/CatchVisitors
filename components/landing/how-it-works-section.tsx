import { Video, Settings, Rocket } from "lucide-react";

const steps = [
  {
    number: "1",
    icon: Video,
    title: "Record Your Voice",
    duration: "30 minutes",
    description:
      "We schedule a Zoom call. You answer 20-30 common questions. We record your voice and personality.",
  },
  {
    number: "2",
    icon: Settings,
    title: "We Build Your Assistant",
    duration: "48 hours",
    description:
      "We clone your voice, load your knowledge (services, pricing, process), and customize everything to your practice.",
  },
  {
    number: "3",
    icon: Rocket,
    title: "Go Live",
    duration: "1 line of code",
    description:
      "We add one snippet to your website. Your AI assistant starts converting visitors immediately. That's it.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            Get Started in 3 Simple Steps
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Desktop Timeline Line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-[#2563EB] via-[#7C3AED] to-[#10B981]" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Mobile Timeline Line */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden absolute left-6 top-16 bottom-0 w-0.5 bg-gradient-to-b from-[#2563EB] to-[#7C3AED]" />
                )}

                <div className="flex flex-col items-center text-center">
                  {/* Icon Circle */}
                  <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center shadow-lg shadow-[#2563EB]/25 mb-6">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Step Number Badge */}
                  <div className="absolute top-0 right-1/2 translate-x-10 -translate-y-1 w-6 h-6 rounded-full bg-[#10B981] text-white text-xs font-bold flex items-center justify-center">
                    {step.number}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-foreground mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm font-medium text-[#7C3AED] mb-3">
                    {step.duration}
                  </p>
                  <p className="text-muted-foreground max-w-xs">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-muted-foreground font-medium">
            No technical skills required.{" "}
            <span className="text-[#2563EB]">We handle everything.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
