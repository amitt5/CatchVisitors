import { Card, CardContent } from "@/components/ui/card";
import { Calculator, TrendingUp, DollarSign, Users } from "lucide-react";

export function ROISection() {
  return (
    <section id="pricing" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            The Math Is Simple
          </h2>
        </div>

        <Card className="max-w-3xl mx-auto border-2 border-[#10B981]/30 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#10B981] to-[#059669] p-4">
            <div className="flex items-center justify-center gap-2 text-white">
              <Calculator className="w-5 h-5" />
              <span className="font-semibold">ROI Calculator</span>
            </div>
          </div>

          <CardContent className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Current Numbers */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-muted-foreground font-medium">
                  <Users className="w-4 h-4" />
                  Your Current Numbers
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground">
                      Website visitors/month
                    </span>
                    <span className="font-semibold text-foreground">100</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground">
                      Conversion rate
                    </span>
                    <span className="font-semibold text-foreground">2-5%</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-muted-foreground">
                      Visitors that leave
                    </span>
                    <span className="font-semibold text-red-500">95-98</span>
                  </div>
                </div>
              </div>

              {/* With CatchVisitors */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[#2563EB] font-medium">
                  <TrendingUp className="w-4 h-4" />
                  With CatchVisitors
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground">Same visitors</span>
                    <span className="font-semibold text-foreground">100</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground">
                      Voice engagement
                    </span>
                    <span className="font-semibold text-[#2563EB]">3-7%</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-muted-foreground">
                      Extra consultations
                    </span>
                    <span className="font-semibold text-[#10B981]">+1/month</span>
                  </div>
                </div>
              </div>

              {/* The Return */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[#10B981] font-medium">
                  <DollarSign className="w-4 h-4" />
                  The Return
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground">Avg case value</span>
                    <span className="font-semibold text-foreground">
                      $5K-$20K
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground">
                      CatchVisitors cost
                    </span>
                    <span className="font-semibold text-foreground">
                      $500 + $299/mo
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-muted-foreground">First month ROI</span>
                    <span className="font-bold text-[#10B981] text-lg">
                      500-6,000%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Line */}
            <div className="mt-8 p-4 bg-gradient-to-r from-[#2563EB]/10 to-[#7C3AED]/10 rounded-lg text-center">
              <p className="text-lg md:text-xl font-bold text-foreground">
                Can you afford{" "}
                <span className="text-[#2563EB]">NOT</span> to capture those
                extra leads?
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
