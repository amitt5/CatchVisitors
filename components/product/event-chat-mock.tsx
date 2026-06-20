export function EventChatMock({ className }: { className?: string }) {
  return (
    <div className={`bg-white rounded-2xl border border-black/[0.06] shadow-xl overflow-hidden ${className ?? ""}`}>
      <div className="bg-gradient-to-r from-[#544CD1] to-[#9D1CFE] text-white text-xs px-4 py-2.5 flex items-center justify-between gap-3">
        <span className="truncate">Virtual Event: Discover the Isla Advantage</span>
        <button className="bg-white text-[#544CD1] text-[11px] font-semibold px-3 py-1 rounded-md shrink-0">
          Register
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full bg-[#02524b] text-white flex items-center justify-center text-[9px] font-semibold">
            IS
          </div>
          <span className="text-xs font-semibold text-gray-900">Isla the AI Agent</span>
        </div>
        <div className="space-y-2">
          <div className="bg-gray-100 rounded-xl rounded-tl-sm px-3 py-2 text-xs text-gray-700 max-w-[85%]">
            Hi Jen! How can I help you save time and drive growth today?
          </div>
          <div className="bg-[#02524b] text-white rounded-xl rounded-tr-sm px-3 py-2 text-xs max-w-[85%] ml-auto">
            How can I automate manual tasks and get richer insights?
          </div>
          <div className="bg-gray-100 rounded-xl rounded-tl-sm px-3 py-2 text-xs text-gray-700 max-w-[90%]">
            Isla can automate manual tasks, deliver richer insights, and help your team
            focus on what matters most — was that what you were looking for?
          </div>
        </div>
      </div>
    </div>
  );
}
