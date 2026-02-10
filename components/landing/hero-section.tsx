"use client";

import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden text-center">
      {/* Ambient gradient glows */}
      <div
        className="absolute -top-48 -right-32 w-[700px] h-[700px] rounded-full blur-[120px] opacity-35 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #fecaca, #fda4af, transparent 70%)'
        }}
      />
      <div
        className="absolute -bottom-24 -left-24 w-[500px] h-[500px] rounded-full blur-[120px] opacity-35 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #ddd6fe, #c4b5fd, transparent 70%)'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-10 rounded-full bg-white border border-gray-200 text-sm text-gray-600"
          style={{ animation: 'fadeUp 0.8s ease both' }}
        >
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          AI Voice Assistant for Professional Services
        </div>

        {/* Headline */}
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-normal mb-7 leading-[1.05] tracking-tight max-w-4xl mx-auto"
          style={{
            fontFamily: 'var(--font-serif, Georgia, serif)',
            animation: 'fadeUp 0.8s ease 0.1s both'
          }}
        >
          Turn every visitor<br />into a <em className="italic">booked consultation.</em>
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto mb-11 leading-relaxed"
          style={{ animation: 'fadeUp 0.8s ease 0.2s both' }}
        >
          An AI voice assistant that lives on your website. Visitors click, talk, and book — 24/7, in four languages, while you focus on billable work.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex items-center justify-center gap-4 mb-20 flex-wrap"
          style={{ animation: 'fadeUp 0.8s ease 0.3s both' }}
        >
          <Button
            asChild
            size="lg"
            className="bg-gray-900 hover:bg-gray-800 text-white rounded-full px-9 py-6 text-base font-medium shadow-lg transition-all duration-300 group"
          >
            <a href="#try-it" className="flex items-center gap-2">
              Try It With Your Website
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="bg-white border border-gray-200 text-gray-900 hover:border-gray-900 hover:shadow-sm rounded-full px-9 py-6 text-base font-medium transition-all"
          >
            <a href="#how-it-works">
              See How It Works
            </a>
          </Button>
        </div>

        {/* Stats */}
        <div
          className="flex items-center justify-center gap-12 flex-wrap"
          style={{ animation: 'fadeUp 0.8s ease 0.4s both' }}
        >
          <div className="text-center">
            <div className="text-4xl font-normal mb-1" style={{ fontFamily: 'var(--font-serif, Georgia, serif)' }}>3×</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider font-medium">More Bookings</div>
          </div>
          <div className="w-px h-9 bg-gray-200" />
          <div className="text-center">
            <div className="text-4xl font-normal mb-1" style={{ fontFamily: 'var(--font-serif, Georgia, serif)' }}>24/7</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider font-medium">Always On</div>
          </div>
          <div className="w-px h-9 bg-gray-200" />
          <div className="text-center">
            <div className="text-4xl font-normal mb-1" style={{ fontFamily: 'var(--font-serif, Georgia, serif)' }}>4</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider font-medium">Languages</div>
          </div>
          <div className="w-px h-9 bg-gray-200" />
          <div className="text-center">
            <div className="text-4xl font-normal mb-1" style={{ fontFamily: 'var(--font-serif, Georgia, serif)' }}>30 days</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider font-medium">Free Trial</div>
          </div>
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
