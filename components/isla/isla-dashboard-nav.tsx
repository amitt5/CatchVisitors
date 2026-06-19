import Link from "next/link";

const TABS = [
  { id: "setup", label: "Agent Setup", href: "/isla/setup" },
  { id: "content", label: "Content Library", href: "/isla/content" },
  { id: "crm", label: "CRM", href: "/isla/crm" },
  { id: "live", label: "Live Demo", href: "/isla/live" },
] as const;

export function IslaDashboardNav({ active }: { active: (typeof TABS)[number]["id"] }) {
  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b border-[#E5EBF1] bg-white">
      <div className="flex items-center gap-8">
        <Link href="/isla" className="text-lg font-semibold tracking-tight text-[#1B2A3C]">
          Isla
        </Link>
        <div className="flex items-center gap-6 text-sm">
          {TABS.map((tab) => (
            <Link
              key={tab.id}
              href={tab.href}
              className={
                tab.id === active
                  ? "font-medium text-[#1B2A3C]"
                  : "text-[#7C98B6] hover:text-[#1B2A3C] transition"
              }
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
