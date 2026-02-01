import { Card, CardContent } from "@/components/ui/card";
import {
  Target,
  Zap,
  Clock,
  ClipboardList,
  Gem,
  TrendingUp,
} from "lucide-react";

const benefits = [
  {
    icon: Target,
    title: "Catch Visitors Before They Leave",
    description:
      "Visitors can ask questions instantly without filling forms or booking calls. Lower friction = higher conversion.",
  },
  {
    icon: Zap,
    title: "Get More Qualified Consultations",
    description:
      "Only serious prospects book calls. The AI pre-qualifies by answering basic questions first—you only talk to ready buyers.",
  },
  {
    icon: Clock,
    title: "Never Miss a Lead Again",
    description:
      "Your AI assistant works 24/7—nights, weekends, holidays. Capture leads while you sleep.",
  },
  {
    icon: ClipboardList,
    title: "Walk Into Meetings Prepared",
    description:
      "Receive a full summary and transcript of every conversation before the consultation. Know exactly what they need.",
  },
  {
    icon: Gem,
    title: "Stand Out From Competitors",
    description:
      "You'll be the ONLY employment lawyer in your city with this. First-mover advantage while others are still using contact forms.",
  },
  {
    icon: TrendingUp,
    title: "One Client Pays For Everything",
    description:
      "Setup: $500. Monthly: $299. One employment case ($5K-$20K) covers a full year. The ROI is obvious.",
  },
];

export function BenefitsSection() {
  return (
    <section id="benefits" className="py-16 md:py-24 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            Why Employment Lawyers Choose CatchVisitors
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg bg-white hover:shadow-xl transition-all hover:-translate-y-1 group"
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#2563EB]/10 to-[#7C3AED]/10 flex items-center justify-center mb-4 group-hover:from-[#2563EB]/20 group-hover:to-[#7C3AED]/20 transition-colors">
                  <benefit.icon className="w-6 h-6 text-[#2563EB]" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
