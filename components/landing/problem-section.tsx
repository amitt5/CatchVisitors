import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, DollarSign, Clock } from "lucide-react";

const stats = [
  {
    icon: BarChart3,
    stat: "95%",
    title: "of visitors leave without contact",
    description:
      "Most website visitors never fill out your contact form or call.",
  },
  {
    icon: DollarSign,
    stat: "$5K-$20K",
    title: "lost per visitor",
    description:
      "Just one wrongful termination case pays for a year of CatchVisitors.",
  },
  {
    icon: Clock,
    stat: "Won't commit",
    title: "to a 30-min call",
    description:
      "The barrier to contact is too high—you're losing qualified leads.",
  },
];

export function ProblemSection() {
  return (
    <section className="py-16 md:py-24 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            You're Leaving Money on the Table
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((item, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow"
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-[#2563EB]/10 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-[#2563EB]" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-[#2563EB] mb-2">
                  {item.stat}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-xl md:text-2xl font-semibold text-foreground">
            What if you could talk to those{" "}
            <span className="text-[#2563EB]">95%</span> before they leave?
          </p>
        </div>
      </div>
    </section>
  );
}
