import { Button } from "@/components/ui/button";
import { Calendar, Mail, Check } from "lucide-react";

export function FinalCTASection() {
  return (
    <section
      id="book-demo"
      className="py-16 md:py-24 bg-gradient-to-br from-[#2563EB] to-[#7C3AED] text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Ready to Stop Losing Visitors?
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Join the first employment lawyers using AI voice to convert more
            website visitors into paying clients.
          </p>
        </div>

        {/* Calendly Embed Placeholder */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#2563EB] flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Book Your Free Demo Call
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    20 minutes - No obligation
                  </p>
                </div>
              </div>

              {/* Calendly Placeholder */}
              <div
                id="calendly-embed"
                className="bg-secondary/50 rounded-xl p-8 md:p-12 text-center border-2 border-dashed border-border"
              >
                <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">
                  Calendly scheduling widget will appear here
                </p>
                <Button
                  asChild
                  size="lg"
                  className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg px-8 py-6 text-lg font-semibold"
                >
                  <a
                    href="https://calendly.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open Calendly
                  </a>
                </Button>
              </div>

              {/* Alternative Contact */}
              <div className="mt-6 text-center">
                <p className="text-muted-foreground mb-2">
                  Or reach out directly:
                </p>
                <a
                  href="mailto:hello@catchvisitors.com"
                  className="inline-flex items-center gap-2 text-[#2563EB] hover:text-[#1D4ED8] font-medium transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  hello@catchvisitors.com
                </a>
              </div>
            </div>
          </div>

          {/* Trust Elements */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-white/90">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-white" />
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-white" />
              Free custom demo for your practice
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-white" />
              Pilot pricing: $500 setup (normally $1,500)
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
