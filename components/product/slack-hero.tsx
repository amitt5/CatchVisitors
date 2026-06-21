import { Play } from "lucide-react";
import { SlackThreadMock } from "@/components/product/slack-thread-mock";

const REACTIONS = [
  { emoji: "❤️", count: 67 },
  { emoji: "🔥", count: 56 },
  { emoji: "🎉", count: 25 },
  { emoji: "👏", count: 19 },
];

export function SlackHero() {
  return (
    <section id="slack-overview" className="pt-32 md:pt-40 px-6 pb-10 scroll-mt-24">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#02524b] leading-[1.15] mb-5">
          Hey Isla, welcome to Slack 👋
        </h1>
        <p className="text-[#02524b]/70 text-base md:text-lg mb-8">
          Collaborate with Isla the AI Agent in Slack, just like your best teammates.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button className="bg-[#02524B] text-white text-sm font-semibold px-5 py-3 rounded-full">
            Schedule a demo
          </button>
          <button className="flex items-center gap-2 border border-[#02524b]/20 text-[#02524b] text-sm font-semibold px-5 py-3 rounded-full hover:bg-[#02524b]/5 transition-colors">
            <Play className="w-3.5 h-3.5" />
            Watch a demo
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto relative">
        <SlackThreadMock
          channel="# isla-the-ai-agent"
          messages={[
            { from: "Isla the AI Agent", time: "Fri 12:14 PM", text: "@Jen welcome aboard! Let me know if you have any questions." },
            { from: "Jen Anders", time: "Fri 12:16 PM", text: "Thanks Isla! Will do." },
          ]}
        />
        <div className="absolute top-6 left-6 bg-white rounded-xl shadow-2xl p-4 max-w-xs border border-black/[0.06]">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-8 rounded-full bg-[#02524B] text-white flex items-center justify-center text-[11px] font-semibold">
              IS
            </div>
            <span className="text-sm text-gray-700">was added to Slack</span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            {REACTIONS.map((r) => (
              <span key={r.emoji} className="flex items-center gap-1 text-gray-600">
                {r.emoji} {r.count}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
