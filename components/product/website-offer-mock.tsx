export function WebsiteOfferMock({ className }: { className?: string }) {
  return (
    <div className={`bg-white rounded-2xl border border-black/[0.06] shadow-xl overflow-hidden ${className ?? ""}`}>
      <div className="bg-[#02524B] text-white text-xs px-4 py-2.5 flex items-center justify-between gap-3">
        <span className="truncate">Want advice to balance scale and growth? This ebook is for you.</span>
        <button className="bg-white text-[#02524B] text-[11px] font-semibold px-3 py-1 rounded-md shrink-0">
          Get it
        </button>
      </div>
      <div className="p-4 space-y-2.5">
        <div className="h-2.5 bg-gray-100 rounded w-2/3" />
        <div className="h-2.5 bg-gray-100 rounded w-1/2" />
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="bg-[#f3effc] rounded-xl p-3">
            <div className="text-[11px] font-semibold text-[#02524b] mb-2">
              Are You a Growth CFO or a No-CFO?
            </div>
            <div className="h-12 bg-[#02524B]/20 rounded-lg" />
          </div>
          <div className="bg-[#fde8e0] rounded-xl p-3">
            <div className="text-[11px] font-semibold text-[#02524b] mb-2">Read our new ebook!</div>
            <div className="bg-white rounded-md h-6 mb-1.5" />
            <button className="bg-[#1a1a1a] text-white text-[10px] font-medium w-full py-1.5 rounded-md">
              Read now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
