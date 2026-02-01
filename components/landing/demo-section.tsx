"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Mic, Target, MessageSquare } from "lucide-react";

const lawyerQuestions = [
  "How much do you charge?",
  "Do I have a case?",
  "What's the process?",
];

const catchVisitorsQuestions = [
  "What's the pricing?",
  "How long is setup?",
  "Can I book a demo?",
];

export function DemoSection() {
  return (
    <section id="demo" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Experience CatchVisitors Two Ways
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-balance">
            Try our demo employment lawyer to see how it works for YOUR clients.
            Then talk to our AI to learn about pricing, setup, and book a demo.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Column - Demo Lawyer */}
          <Card className="border-2 border-[#2563EB]/20 shadow-xl bg-gradient-to-b from-white to-[#2563EB]/5">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col items-center">
                {/* Header */}
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-[#2563EB]" />
                  <h3 className="text-xl font-bold text-foreground">
                    Talk to Demo Lawyer
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground mb-6 text-center">
                  See how YOUR visitors would experience this
                </p>

                {/* Voice Button Placeholder */}
                <div
                  id="vapi-lawyer-widget"
                  className="relative mb-6"
                  aria-label="Demo lawyer voice assistant placeholder"
                >
                  <div className="absolute inset-0 rounded-full bg-[#2563EB]/20 animate-ping" />
                  <div className="absolute inset-2 rounded-full bg-[#2563EB]/30 animate-pulse" />
                  <button
                    type="button"
                    className="relative w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] flex items-center justify-center shadow-2xl shadow-[#2563EB]/30 hover:scale-105 transition-transform cursor-pointer"
                    aria-label="Start conversation with demo lawyer"
                  >
                    <Mic className="w-10 h-10 md:w-12 md:h-12 text-white" />
                  </button>
                </div>

                <p className="text-base font-semibold text-foreground mb-1">
                  Click to Talk
                </p>
                <p className="text-xs text-muted-foreground mb-6">
                  Microphone permission required
                </p>

                {/* Suggested Questions */}
                <div className="w-full">
                  <p className="text-sm font-medium text-muted-foreground mb-3">
                    Ask questions like your visitors would:
                  </p>
                  <div className="flex flex-col gap-2">
                    {lawyerQuestions.map((question, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 rounded-lg bg-secondary text-sm text-foreground hover:bg-[#2563EB]/10 transition-colors cursor-pointer text-center"
                      >
                        {question}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Column - CatchVisitors AI */}
          <Card className="border-2 border-[#7C3AED]/20 shadow-xl bg-gradient-to-b from-white to-[#7C3AED]/5">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col items-center">
                {/* Header */}
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-5 h-5 text-[#7C3AED]" />
                  <h3 className="text-xl font-bold text-foreground">
                    Talk to Us About CatchVisitors
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground mb-6 text-center">
                  Get answers and schedule your custom demo
                </p>

                {/* Voice Button Placeholder */}
                <div
                  id="vapi-catchvisitors-widget"
                  className="relative mb-6"
                  aria-label="CatchVisitors voice assistant placeholder"
                >
                  <div className="absolute inset-0 rounded-full bg-[#7C3AED]/20 animate-ping" />
                  <div className="absolute inset-2 rounded-full bg-[#7C3AED]/30 animate-pulse" />
                  <button
                    type="button"
                    className="relative w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] flex items-center justify-center shadow-2xl shadow-[#7C3AED]/30 hover:scale-105 transition-transform cursor-pointer"
                    aria-label="Start conversation about CatchVisitors"
                  >
                    <Mic className="w-10 h-10 md:w-12 md:h-12 text-white" />
                  </button>
                </div>

                <p className="text-base font-semibold text-foreground mb-1">
                  Click to Talk
                </p>
                <p className="text-xs text-muted-foreground mb-6">
                  Microphone permission required
                </p>

                {/* Suggested Questions */}
                <div className="w-full">
                  <p className="text-sm font-medium text-muted-foreground mb-3">
                    Ask me anything about CatchVisitors:
                  </p>
                  <div className="flex flex-col gap-2">
                    {catchVisitorsQuestions.map((question, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 rounded-lg bg-secondary text-sm text-foreground hover:bg-[#7C3AED]/10 transition-colors cursor-pointer text-center"
                      >
                        {question}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            The left demo shows what YOUR visitors would experience. The right
            lets you learn about CatchVisitors and book your custom demo.
          </p>
        </div>
      </div>
    </section>
  );
}
