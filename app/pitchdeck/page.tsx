"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Mic, Navigation, CalendarCheck, Send } from "lucide-react";

const TOTAL = 5;

export default function PitchDeckPage() {
  const [slide, setSlide] = useState(0);

  const go = useCallback((dir: number) => {
    setSlide((s) => Math.max(0, Math.min(TOTAL - 1, s + dir)));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        go(-1);
      } else if (e.key === "Home") {
        setSlide(0);
      } else if (e.key === "End") {
        setSlide(TOTAL - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  return (
    <div className="fixed inset-0 bg-[#04110E] text-white overflow-hidden select-none">
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 -z-0"
        style={{ background: "radial-gradient(circle at 50% 18%, #02524B55, transparent 60%)" }}
      />

      {/* slides */}
      <div
        className="absolute inset-0 flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${slide * 100}%)` }}
      >
        <Slide1 />
        <Slide2 />
        <Slide3 />
        <Slide4 />
        <Slide5 />
      </div>

      {/* nav controls */}
      <button
        onClick={() => go(-1)}
        disabled={slide === 0}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/5 hover:bg-white/15 disabled:opacity-0 transition"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={() => go(1)}
        disabled={slide === TOTAL - 1}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/5 hover:bg-white/15 disabled:opacity-0 transition"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* progress dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {Array.from({ length: TOTAL }).map((_, i) => (
          <button
            key={i}
            onClick={() => setSlide(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === slide ? "w-8 bg-[#3FD0B8]" : "w-1.5 bg-white/25 hover:bg-white/50"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <div className="absolute bottom-5 right-6 z-20 text-xs text-white/30 tabular-nums">
        {slide + 1} / {TOTAL}
      </div>
    </div>
  );
}

/* ---------- Slide frame ---------- */

function SlideFrame({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative w-full h-full shrink-0 flex flex-col items-center justify-center px-8 md:px-24">
      <div className="w-full max-w-5xl">{children}</div>
    </section>
  );
}

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div className="text-[#3FD0B8] text-sm font-medium tracking-[0.2em] uppercase mb-6">{children}</div>
);

/* ---------- Slide 1: Title ---------- */

function Slide1() {
  return (
    <SlideFrame>
      <div className="text-center">
        <div className="text-7xl md:text-8xl font-semibold tracking-tight mb-6">Isla</div>
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight mb-8">
          The AI Sales Rep for everyone
          <br />
          <span className="text-[#3FD0B8]">Salesforce left behind</span>
        </h1>
        <p className="text-lg md:text-xl text-white/55 max-w-2xl mx-auto">
          Voice + chat AI SDR — engages every visitor, books the meeting, works with any CRM.
        </p>
      </div>
    </SlideFrame>
  );
}

/* ---------- Slide 2: The $1.5B proof ---------- */

function Slide2() {
  return (
    <SlideFrame>
      <Eyebrow>The proof</Eyebrow>
      <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.1] mb-10">
        Salesforce just paid{" "}
        <span className="text-[#3FD0B8] whitespace-nowrap">$1&ndash;1.5B</span>
        <br />
        for this exact idea
      </h1>
      <div className="space-y-4 text-xl md:text-2xl text-white/75">
        <p>
          <span className="font-semibold text-white">Qualified</span> + its AI SDR{" "}
          <span className="font-semibold text-white">&ldquo;Piper&rdquo;</span> &mdash; acquired, closed
          April 2026.
        </p>
      </div>
      <p className="mt-10 text-lg text-white/45">
        The market just validated AI sales reps at unicorn scale.
      </p>
    </SlideFrame>
  );
}

/* ---------- Slide 3: The gap ---------- */

function Slide3() {
  const crms = ["HubSpot", "Pipedrive", "Dynamics", "Zoho", "Attio"];
  return (
    <SlideFrame>
      <Eyebrow>The opening</Eyebrow>
      <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.1] mb-8">
        But Piper is now <span className="text-[#3FD0B8]">Salesforce-only</span>
      </h1>
      <p className="text-xl md:text-2xl text-white/70 mb-8">
        Every company on these just lost their best option:
      </p>
      <div className="flex flex-wrap gap-3 mb-10">
        {crms.map((c) => (
          <span
            key={c}
            className="px-5 py-2.5 rounded-full border border-white/15 bg-white/5 text-lg text-white/85"
          >
            {c}
          </span>
        ))}
      </div>
      <p className="text-2xl md:text-3xl font-semibold text-white">
        The leader vacated most of the market overnight.
      </p>
    </SlideFrame>
  );
}

/* ---------- Slide 4: What Isla does ---------- */

function Slide4() {
  const steps = [
    { icon: Mic, title: "Visitor talks to Isla", sub: "voice or chat" },
    { icon: Navigation, title: "Isla drives the site", sub: "navigates & highlights answers" },
    { icon: CalendarCheck, title: "Books the meeting", sub: "on the spot" },
    { icon: Send, title: "Fires the follow-up", sub: "email · Slack · CRM" },
  ];
  return (
    <SlideFrame>
      <Eyebrow>The product</Eyebrow>
      <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-12">
        Isla closes the <span className="text-[#3FD0B8]">whole loop</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={s.title}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <div className="shrink-0 w-11 h-11 rounded-xl bg-[#02524B] flex items-center justify-center">
                <Icon className="w-5 h-5 text-[#3FD0B8]" />
              </div>
              <div>
                <div className="font-semibold text-lg">
                  <span className="text-[#3FD0B8] mr-1.5">{i + 1}.</span>
                  {s.title}
                </div>
                <div className="text-white/50 text-sm">{s.sub}</div>
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-10 text-xl text-white/55">
        Not a chatbot. A sales rep that works while you sleep.
      </p>
    </SlideFrame>
  );
}

/* ---------- Slide 5: Market, model, ask ---------- */

function Slide5() {
  const points = [
    { k: "TAM", v: "Every company with a landing page + a non-Salesforce CRM" },
    { k: "Model", v: "SaaS — per-seat or per-booking. Cheaper than one SDR hire." },
    { k: "Today", v: "Live on production infra across hotel, healthcare & industrial" },
  ];
  return (
    <SlideFrame>
      <Eyebrow>The opportunity</Eyebrow>
      <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-10">
        A proven category.
        <br />
        An <span className="text-[#3FD0B8]">open market.</span>
      </h1>
      <div className="space-y-4 mb-12">
        {points.map((p) => (
          <div key={p.k} className="flex items-baseline gap-4">
            <span className="text-[#3FD0B8] font-semibold w-20 shrink-0">{p.k}</span>
            <span className="text-lg md:text-xl text-white/80">{p.v}</span>
          </div>
        ))}
      </div>
      <p className="text-2xl md:text-3xl font-semibold leading-tight">
        Salesforce proved it&apos;s worth a billion dollars.
        <br />
        <span className="text-[#3FD0B8]">We&apos;re building it for everyone else.</span>
      </p>
    </SlideFrame>
  );
}
