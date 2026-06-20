import type { ReactNode } from "react";

function initials(name: string) {
  if (name === "Isla the AI Agent") return "IS";
  const words = name.split(" ");
  return [words[0], words[words.length - 1]]
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function SlackThreadMock({
  channel,
  messages,
  className,
}: {
  channel: string;
  messages: { from: string; time: string; text: ReactNode }[];
  className?: string;
}) {
  return (
    <div className={`rounded-2xl border border-black/[0.06] shadow-xl overflow-hidden flex ${className ?? ""}`}>
      <div className="w-3 bg-gradient-to-b from-[#3f0e58] to-[#1a0526] shrink-0" />
      <div className="flex-1 bg-white min-w-0">
        <div className="px-4 py-3 border-b border-black/[0.06]">
          <span className="text-sm font-semibold text-gray-900">{channel}</span>
        </div>
        <div className="p-4 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className="flex gap-2.5">
              <div className="w-8 h-8 rounded-md bg-[#02524b] text-white flex items-center justify-center text-[10px] font-semibold shrink-0">
                {initials(m.from)}
              </div>
              <div className="min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-semibold text-gray-900">{m.from}</span>
                  <span className="text-[10px] text-gray-400">{m.time}</span>
                </div>
                <div className="text-xs text-gray-700 mt-0.5 leading-relaxed">{m.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
