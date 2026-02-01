import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/5 via-white to-[#7C3AED]/5" />
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-[#2563EB]/10 to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-[#7C3AED]/10 to-transparent blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2563EB]/10 text-[#2563EB] text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
            </span>
            Used by employment lawyers to capture 3-7% more qualified leads
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight text-balance">
            Stop Losing Website Visitors.{" "}
            <span className="bg-gradient-to-r from-[#2563EB] to-[#7C3AED] bg-clip-text text-transparent">
              Start Converting Them.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Your AI voice assistant answers visitor questions 24/7—in your own
            voice. No forms. No commitment. Just conversations that convert into
            consultations.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg px-8 py-6 text-lg font-semibold shadow-lg shadow-[#2563EB]/25 hover:shadow-xl hover:shadow-[#2563EB]/30 transition-all hover:scale-105"
            >
              <a href="#demo" className="flex items-center gap-2">
                <Play className="w-5 h-5" />
                See It In Action
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB]/5 rounded-lg px-8 py-6 text-lg font-semibold transition-all hover:scale-105 bg-transparent"
            >
              <a href="#book-demo" className="flex items-center gap-2">
                Book a Demo Call
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
          </div>

          {/* Trust Elements */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-[#10B981]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-[#10B981]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Free custom demo
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-[#10B981]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Setup in 48 hours
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
