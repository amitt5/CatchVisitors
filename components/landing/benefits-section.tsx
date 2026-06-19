import { MessageCircle, Calendar, Globe, Users, TrendingUp, Mail } from "lucide-react";

const features = [
  {
    icon: MessageCircle,
    title: "Natural conversation",
    description: "Sounds human, not robotic. Handles interruptions, follow-ups, and complex questions about your services."
  },
  {
    icon: Calendar,
    title: "Calendar booking",
    description: "Checks your real-time availability and books consultations directly. No back-and-forth emails."
  },
  {
    icon: Globe,
    title: "50+ languages",
    description: "Supports over 50 languages including English, Dutch, German, French, and more. Auto-detects and switches seamlessly mid-conversation."
  },
  {
    icon: Users,
    title: "Lead qualification",
    description: "Asks the right intake questions, scores leads by fit, puts only qualified prospects on your calendar."
  },
  {
    icon: TrendingUp,
    title: "Self-improving",
    description: "Learns from every conversation. Gets better at answering your specific questions over time."
  },
  {
    icon: Mail,
    title: "CRM & email sync",
    description: "Every transcript lands in your inbox and CRM automatically. Full context before you pick up the phone."
  }
];

export function BenefitsSection() {
  return (
    <section id="features" className="py-24 md:py-32 bg-[#f0f8f3]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#02524b]/50 mb-4 block">
            Key Features
          </span>
          <h2
            className="text-4xl md:text-5xl font-normal leading-tight tracking-tight text-[#02524b] mb-4"
            style={{ fontFamily: 'var(--font-serif, Georgia, serif)' }}
          >
            Everything your front desk<br />can't do at once
          </h2>
          <p className="text-lg text-[#02524b]/70 max-w-xl mx-auto leading-relaxed">
            Learn more about how CatchVisitors helps your team succeed.
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
