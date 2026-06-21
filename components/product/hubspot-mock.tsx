// Static mock of a HubSpot contact record — used to SHOW (not test) the CRM
// sync during the Isla demo. The agent presents this on screen; it's not live.
export function HubSpotMock() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-xl overflow-hidden text-left">
      {/* HubSpot-style top bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#2D3E50]">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FF7A59] text-white text-xs font-bold">
          H
        </span>
        <span className="text-white text-sm font-semibold">HubSpot</span>
        <span className="ml-auto text-[10px] font-medium text-emerald-300 bg-emerald-900/40 px-2 py-0.5 rounded-full">
          ● Synced just now
        </span>
      </div>

      <div className="p-5">
        {/* Contact header */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FF7A59] text-white font-semibold">
            JA
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-900">James Anderson</div>
            <div className="text-xs text-gray-500">james@acme.com · Acme Logistics</div>
          </div>
          <span className="ml-auto text-[10px] font-semibold text-[#FF7A59] bg-[#FFF1ED] px-2 py-1 rounded-full">
            Lifecycle: SQL
          </span>
        </div>

        {/* Properties */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          {[
            ["Source", "Website — Isla AI SDR"],
            ["Intent", "Convert inbound web traffic"],
            ["Deal stage", "Meeting booked"],
            ["Owner", "Auto-routed → Sales"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-lg bg-gray-50 px-3 py-2">
              <div className="text-[10px] uppercase tracking-wide text-gray-400">{k}</div>
              <div className="text-xs font-medium text-gray-800">{v}</div>
            </div>
          ))}
        </div>

        {/* Activity timeline */}
        <div className="mt-4">
          <div className="text-[10px] uppercase tracking-wide text-gray-400 mb-2">
            Activity
          </div>
          <ul className="space-y-2">
            <li className="flex gap-2 text-xs text-gray-700">
              <span className="mt-0.5 text-[#FF7A59]">●</span>
              <span>
                <span className="font-medium">Conversation logged</span> — “Looking to convert more
                web traffic; asked about email follow-up &amp; Slack alerts.”
              </span>
            </li>
            <li className="flex gap-2 text-xs text-gray-700">
              <span className="mt-0.5 text-[#FF7A59]">●</span>
              <span>
                <span className="font-medium">Meeting booked</span> — Thursday at 2:00 PM with Sales
              </span>
            </li>
            <li className="flex gap-2 text-xs text-gray-700">
              <span className="mt-0.5 text-[#FF7A59]">●</span>
              <span>
                <span className="font-medium">Email sent</span> — Demo confirmation to james@acme.com
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
