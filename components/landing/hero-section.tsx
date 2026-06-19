"use client";

import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";

function BrowserMockup() {
  return (
    <div className="bg-white border border-[#02524b]/10 rounded-2xl shadow-xl overflow-hidden">
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-4 py-3 bg-[#f0f8f3] border-b border-[#02524b]/10">
        <span className="w-2.5 h-2.5 rounded-full bg-[#f44b2a]/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#b5d627]/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#02524b]/30" />
        <div className="ml-3 flex-1 max-w-xs h-5 rounded-full bg-white border border-[#02524b]/10" />
      </div>
      {/* Mock conversation */}
      <div className="p-6 md:p-8 bg-[#f0f8f3]">
        <div className="max-w-md mx-auto space-y-3">
          <div className="bg-white rounded-xl rounded-tl-sm p-3.5 text-sm text-[#02524b] shadow-sm max-w-[85%]">
            Hi! I'm the AI assistant for this site. Ask me anything, or I can help you book a time.
          </div>
          <div className="bg-[#02524b] text-white rounded-xl rounded-tr-sm p-3.5 text-sm max-w-[70%] ml-auto shadow-sm">
            Do you have availability this Thursday?
          </div>
          <div className="bg-white rounded-xl rounded-tl-sm p-3.5 text-sm text-[#02524b] shadow-sm max-w-[85%]">
            Yes — 2:00 PM and 4:30 PM are open. Want me to book one for you?
          </div>
          <div className="flex items-center gap-2 pt-1">
            <span className="w-2 h-2 rounded-full bg-[#b5d627] animate-pulse" />
            <span className="text-xs text-[#02524b]/60">Live conversation · voice or text</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden text-center bg-white">
      {/* Decorative dotted arc, Drift-style */}
      <svg
        className="absolute -top-10 -right-10 w-64 h-64 text-[#02524b]/15 pointer-events-none hidden md:block"
        viewBox="0 0 200 200"
        fill="none"
      >
        {[40, 60, 80, 100, 120].map((r) => (
          <circle key={r} cx="200" cy="0" r={r} stroke="currentColor" strokeDasharray="4 6" />
        ))}
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 mb-7"
          style={{ animation: 'fadeUp 0.8s ease both' }}
        >
          <div className="w-7 h-7 rounded-lg bg-[#02524b] flex items-center justify-center">
            <Mic className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-sm font-semibold text-[#02524b] uppercase tracking-wider">CatchVisitors</span>
        </div>

        {/* Headline */}
        <h1
          className="text-5xl md:text-7xl font-normal mb-6 leading-[1.08] tracking-tight max-w-4xl mx-auto text-[#02524b]"
          style={{
            fontFamily: 'var(--font-serif, Georgia, serif)',
            animation: 'fadeUp 0.8s ease 0.1s both'
          }}
        >
          Convert Website Visitors Into Conversations
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg md:text-xl text-[#02524b]/70 max-w-xl mx-auto mb-9 leading-relaxed"
          style={{ animation: 'fadeUp 0.8s ease 0.2s both' }}
        >
          CatchVisitors' AI agent engages visitors with real-time voice & chat conversations — answering questions, qualifying leads, and booking meetings, 24/7 in 50+ languages.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex items-center justify-center gap-4 mb-16 flex-wrap"
          style={{ animation: 'fadeUp 0.8s ease 0.3s both' }}
        >
          <Button
            asChild
            size="lg"
            className="bg-[#b5d627] hover:bg-[#a3c322] text-[#02524b] rounded-full px-9 py-6 text-base font-semibold shadow-lg transition-all duration-300 group"
          >
            <a href="#try-it" className="flex items-center gap-2">
              Talk to It Right Now
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="bg-white border border-[#02524b]/20 text-[#02524b] hover:border-[#02524b] hover:shadow-sm rounded-full px-9 py-6 text-base font-medium transition-all"
          >
            <a href="#industries">
              See Live Industry Demos
            </a>
          </Button>
        </div>

        {/* Product mockup */}
        <div className="max-w-2xl mx-auto" style={{ animation: 'fadeUp 0.8s ease 0.4s both' }}>
          <BrowserMockup />
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
