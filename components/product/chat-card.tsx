import type { ReactNode } from "react";

export function ChatCard({
  messages,
  booker,
  className,
}: {
  messages: { from: "isla" | "visitor"; text: string }[];
  booker?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-white rounded-2xl border border-black/[0.06] shadow-xl overflow-hidden ${className ?? ""}`}>
      <div className="flex items-center gap-2 px-4 py-3 border-b border-black/[0.06]">
        <div className="w-7 h-7 rounded-full bg-[#02524b] text-white flex items-center justify-center text-[10px] font-semibold">
          IS
        </div>
        <div className="text-sm font-semibold text-gray-900">Isla the AI Agent</div>
      </div>
      <div className="p-4 space-y-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={
              m.from === "visitor"
                ? "bg-[#02524b] text-white rounded-xl rounded-tr-sm px-3 py-2 text-xs max-w-[80%] ml-auto"
                : "bg-gray-100 text-gray-700 rounded-xl rounded-tl-sm px-3 py-2 text-xs max-w-[90%]"
            }
          >
            {m.text}
          </div>
        ))}
      </div>
      {booker && <div className="border-t border-black/[0.06] p-4">{booker}</div>}
    </div>
  );
}

export function InlineBooker({ rep, title }: { rep: string; title: string }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-full bg-gray-200 shrink-0" />
        <div>
          <div className="text-xs font-medium text-gray-900">{rep}</div>
          <div className="text-[11px] text-gray-500">{title}</div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-1.5 mb-2">
        {[15, 16, 17, 18].map((d) => (
          <div
            key={d}
            className={`text-center text-[11px] py-1.5 rounded-lg ${
              d === 17 ? "bg-[#1a1a1a] text-white" : "text-gray-600"
            }`}
          >
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-1.5 mb-3">
        {["8:00 am", "8:30 am"].map((t, i) => (
          <div
            key={t}
            className={`text-[11px] text-center py-1.5 rounded-lg border ${
              i === 0 ? "bg-[#1a1a1a] text-white border-[#1a1a1a]" : "border-gray-200 text-gray-600"
            }`}
          >
            {t}
          </div>
        ))}
      </div>
      <button className="w-full bg-[#1a1a1a] text-white text-xs font-medium py-2 rounded-lg">
        Continue
      </button>
    </div>
  );
}
