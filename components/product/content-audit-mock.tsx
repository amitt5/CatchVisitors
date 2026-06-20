import { ArrowDown } from "lucide-react";

const LIBRARY_ITEMS = [
  { label: "Quick Discount Overview", color: "#544CD1" },
  { label: "Scaling Inbound with AI Agents", color: "#02524b" },
  { label: "Simplified Demand Generation", color: "#1a1a1a" },
];

export function ContentAuditMock({ className }: { className?: string }) {
  return (
    <div className={`bg-gradient-to-br from-[#f3effc] to-[#e9e3fb] rounded-2xl p-6 ${className ?? ""}`}>
      <div className="flex justify-center gap-3 mb-4">
        {LIBRARY_ITEMS.map((item) => (
          <div
            key={item.label}
            className="bg-white rounded-lg shadow-md p-2 w-20 h-24 flex flex-col gap-1"
          >
            <div className="h-2 rounded" style={{ backgroundColor: item.color, opacity: 0.8 }} />
            <div className="h-1.5 bg-gray-100 rounded w-3/4" />
            <div className="h-1.5 bg-gray-100 rounded w-1/2" />
            <div className="flex-1" />
            <div className="text-[8px] text-gray-400 leading-tight">{item.label}</div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mb-3">
        <ArrowDown className="w-4 h-4 text-[#544CD1]" />
      </div>
      <div className="bg-[#02524b] text-white rounded-xl p-3 text-center max-w-[220px] mx-auto">
        <div className="text-xs font-semibold">Best match selected</div>
        <div className="text-[11px] text-white/70">Scaling Inbound with AI Agents</div>
      </div>
    </div>
  );
}
