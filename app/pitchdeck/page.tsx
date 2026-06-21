"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// Drop your slide deck embed URL here once it's ready.
// Works with Google Slides, Pitch, Canva, Figma, Gamma, etc. (use the "embed" / "publish to web" URL).
const DECK_EMBED_URL = "";

export default function PitchDeckPage() {
  return (
    <div className="min-h-screen bg-[#0B0F0E] text-white flex flex-col">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <Link
          href="/isla"
          className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Isla
        </Link>
        <span className="text-sm font-medium tracking-tight">Pitch Deck</span>
      </nav>

      <main className="flex-1 flex items-center justify-center p-4">
        {DECK_EMBED_URL ? (
          <div className="w-full max-w-6xl aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl">
            <iframe
              src={DECK_EMBED_URL}
              className="w-full h-full"
              allow="fullscreen; autoplay"
              allowFullScreen
              title="Isla Pitch Deck"
            />
          </div>
        ) : (
          <div className="text-center max-w-md">
            <h1 className="text-3xl font-semibold tracking-tight mb-3">Isla — Pitch Deck</h1>
            <p className="text-white/50 text-sm leading-relaxed">
              Slides coming soon. Paste your deck&apos;s embed URL into{" "}
              <code className="px-1.5 py-0.5 rounded bg-white/10 text-white/80">DECK_EMBED_URL</code>{" "}
              in <code className="px-1.5 py-0.5 rounded bg-white/10 text-white/80">app/pitchdeck/page.tsx</code>{" "}
              and it&apos;ll render right here.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
