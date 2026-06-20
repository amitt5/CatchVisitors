const STAKEHOLDERS = [
  { name: "Mike Taylor", role: "Director, Finance", color: "#a7f3c8" },
  { name: "Jen Anders", role: "VP, Finance", color: "#f5a892" },
  { name: "Sarah Black", role: "CFO", color: "#9fc7f5" },
];

export function OrgChartMock({ company, className }: { company: string; className?: string }) {
  return (
    <div className={`bg-gradient-to-br from-[#eef0fb] to-[#e9e3fb] rounded-2xl p-6 ${className ?? ""}`}>
      <div className="bg-white rounded-full px-4 py-2 text-center text-sm font-semibold text-[#02524b] shadow-sm w-fit mx-auto mb-4">
        {company}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {STAKEHOLDERS.map((person) => (
          <div key={person.name} className="flex flex-col items-center">
            <div className="bg-white rounded-xl shadow-sm p-2.5 w-full text-center mb-2">
              <div className="text-[11px] font-medium text-gray-900 truncate">{person.name}</div>
              <div className="text-[9px] text-gray-500 truncate">{person.role}</div>
            </div>
            <div className="rounded-lg w-full h-14" style={{ backgroundColor: person.color }} />
          </div>
        ))}
      </div>
    </div>
  );
}
