import Link from "next/link";
import { ISLA_PERSONAS } from "@/lib/isla/personas";
import { IslaDashboardNav } from "@/components/isla/isla-dashboard-nav";

const ACCENT_HEX: Record<string, string> = {
  slate: "#94A3B8",
  blue: "#2E7DD7",
  purple: "#7C5CFC",
  amber: "#B7791F",
  lime: "#2F9E5B",
};

export default function IslaCrmPage() {
  const contacts = ISLA_PERSONAS.filter((p) => p.name !== null);

  return (
    <div className="min-h-screen bg-[#F5F8FA] text-[#33475B]">
      <IslaDashboardNav active="crm" />

      <main className="max-w-6xl mx-auto px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-[#1B2A3C]">Accounts &amp; Contacts</h1>
            <p className="text-sm text-[#516f90] mt-1">Synced from HubSpot · Last synced just now</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-full bg-[#FFF1EC] text-[#FF7A59] border border-[#FFD9CC]">
              <span className="w-2 h-2 rounded-full bg-[#FF7A59]" />
              Connected to HubSpot
            </span>
            <button className="text-sm font-medium px-3 py-1.5 rounded-md border border-[#CBD6E2] text-[#33475B] hover:bg-white transition">
              Sync now
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E5EBF1] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F5F8FA] text-left text-[#7C98B6] text-xs uppercase tracking-wide">
                <th className="px-5 py-3 font-medium">Contact</th>
                <th className="px-5 py-3 font-medium">Company</th>
                <th className="px-5 py-3 font-medium">Lifecycle Stage</th>
                <th className="px-5 py-3 font-medium">Deal Stage</th>
                <th className="px-5 py-3 font-medium">Owner</th>
                <th className="px-5 py-3 font-medium">Last Activity</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((p) => (
                <tr key={p.id} className="border-t border-[#E5EBF1] hover:bg-[#FAFBFC]">
                  <td className="px-5 py-4">
                    <div className="font-medium text-[#1B2A3C]">{p.name}</div>
                    <div className="text-[#7C98B6] text-xs">{p.role}</div>
                  </td>
                  <td className="px-5 py-4 text-[#33475B]">{p.company}</td>
                  <td className="px-5 py-4">
                    <span
                      className="text-xs font-medium px-2 py-1 rounded-full"
                      style={{
                        backgroundColor: `${ACCENT_HEX[p.accent]}1A`,
                        color: ACCENT_HEX[p.accent],
                      }}
                    >
                      {p.crm.lifecycleStage}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-[#33475B]">{p.crm.dealStage}</td>
                  <td className="px-5 py-4 text-[#33475B]">{p.crm.owner}</td>
                  <td className="px-5 py-4 text-[#516f90]">{p.crm.lastActivity}</td>
                </tr>
              ))}
              <tr className="border-t border-[#E5EBF1] bg-[#FAFBFC]">
                <td className="px-5 py-4 text-[#7C98B6] italic" colSpan={6}>
                  + anonymous website traffic (no CRM match yet) — Isla qualifies these live, see{" "}
                  <Link href="/isla/live/cold-anonymous" className="underline">
                    the Anonymous Visitor persona
                  </Link>
                  .
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-xs text-[#7C98B6] mt-4">
          Demo data shown above for illustration — in production this view reflects your real
          HubSpot accounts and contacts in real time.
        </p>
      </main>
    </div>
  );
}
