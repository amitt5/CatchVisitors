"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Mic, MessageCircle } from "lucide-react";

const suggestedQuestions = [
  "How much do you charge?",
  "Can they fire me without severance?",
  "What's your success rate?",
  "How long does the process take?",
  "Do I have a case?",
];

export function DemoSection() {
  return (
    <section id="demo" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Try It Right Now - Talk to Our Demo Employment Lawyer
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Click the button below and ask questions like a real visitor would.
            No signup required.
          </p>
        </div>

        <Card className="max-w-3xl mx-auto border-2 border-[#2563EB]/20 shadow-xl bg-gradient-to-b from-white to-[#2563EB]/5">
          <CardContent className="p-8 md:p-12">
            {/* Voice Button Placeholder - Vapi Widget goes here */}
            <div className="flex flex-col items-center">
              <div
                id="vapi-voice-widget"
                className="relative mb-8"
                aria-label="Voice assistant button placeholder"
              >
                {/* Pulse Animation Ring */}
                <div className="absolute inset-0 rounded-full bg-[#2563EB]/20 animate-ping" />
                <div className="absolute inset-2 rounded-full bg-[#2563EB]/30 animate-pulse" />

                {/* Main Button */}
                <button
                  type="button"
                  className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center shadow-2xl shadow-[#2563EB]/30 hover:scale-105 transition-transform cursor-pointer"
                  aria-label="Start voice conversation"
                >
                  <Mic className="w-12 h-12 md:w-16 md:h-16 text-white" />
                </button>
              </div>

              <p className="text-lg font-semibold text-foreground mb-2">
                Click to Talk
              </p>
              <p className="text-sm text-muted-foreground mb-8">
                Microphone permission required
              </p>

              {/* Suggested Questions */}
              <div className="w-full">
                <p className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Try asking:
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {suggestedQuestions.map((question, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-full bg-secondary text-sm text-foreground hover:bg-[#2563EB]/10 transition-colors cursor-pointer"
                    >
                      "{question}"
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-lg text-muted-foreground flex items-center justify-center gap-2">
            <span className="text-2xl">👆</span>
            This is what YOUR visitors would experience—except in YOUR voice,
            answering YOUR questions, 24/7.
          </p>
        </div>
      </div>
    </section>
  );
}
