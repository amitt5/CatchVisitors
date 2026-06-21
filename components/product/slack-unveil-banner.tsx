import { Play } from "lucide-react";

export function SlackUnveilBanner() {
  return (
    <section className="px-6">
      <div
        className="max-w-6xl mx-auto rounded-3xl px-8 md:px-14 py-12 md:py-16"
        style={{ background: "linear-gradient(135deg, #02524B 0%, #2E9F6E 100%)" }}
      >
        <h2 className="text-2xl md:text-3xl font-semibold text-white leading-snug max-w-xl mb-5">
          Watch as we unveil Isla the AI Agent for Slack. Now, Isla works where you work.
        </h2>
        <button className="flex items-center gap-2 bg-white text-[#02524B] text-sm font-semibold px-4 py-2.5 rounded-full">
          <Play className="w-3.5 h-3.5" />
          Watch keynote
        </button>
      </div>
    </section>
  );
}
