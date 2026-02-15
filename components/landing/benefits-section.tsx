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
    <section id="features" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4 block">
            Capabilities
          </span>
          <h2
            className="text-4xl md:text-5xl font-normal leading-tight tracking-tight"
            style={{ fontFamily: 'var(--font-serif, Georgia, serif)' }}
          >
            Everything your front desk<br />can't do at 2 AM
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-8 bg-white border border-gray-100 rounded-2xl transition-all duration-300 hover:border-gray-200 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center mb-5">
                <feature.icon className="w-5 h-5 text-gray-900" strokeWidth={1.5} />
              </div>
              <h3
                className="text-lg md:text-xl font-normal mb-2"
                style={{ fontFamily: 'var(--font-serif, Georgia, serif)' }}
              >
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
