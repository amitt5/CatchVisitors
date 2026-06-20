const DAYS = [
  { label: "Sat", date: 10 },
  { label: "Sun", date: 11 },
  { label: "Mon", date: 12 },
  { label: "Tues", date: 13, selected: true },
  { label: "Wed", date: 14 },
  { label: "Thurs", date: 15 },
  { label: "Fri", date: 16 },
];

const TIMES = ["1:00 pm", "1:30 pm", "2:00 pm", "2:30 pm", "3:00 pm", "3:30 pm"];

export function SchedulerCard({
  greeting,
  subtext,
  className,
}: {
  greeting: string;
  subtext: string;
  className?: string;
}) {
  return (
    <div className={`bg-white rounded-2xl border border-black/[0.06] shadow-xl p-5 ${className ?? ""}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-[#02524b] text-white flex items-center justify-center text-xs font-semibold shrink-0">
          IS
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-900">{greeting}</div>
          <div className="text-xs text-gray-500">{subtext}</div>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center mb-3">
        {DAYS.map((d) => (
          <div
            key={d.date}
            className={`rounded-lg py-1.5 text-[11px] ${
              d.selected ? "bg-[#1a1a1a] text-white" : "text-gray-600"
            }`}
          >
            <div className="text-[9px] opacity-70">{d.label}</div>
            <div className="font-medium">{d.date}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {TIMES.map((t, i) => (
          <div
            key={t}
            className={`text-xs text-center py-2 rounded-lg border ${
              i === 1 ? "bg-[#1a1a1a] text-white border-[#1a1a1a]" : "border-gray-200 text-gray-700"
            }`}
          >
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}
