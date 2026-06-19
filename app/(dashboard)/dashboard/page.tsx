import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Bot, Phone, Settings, ArrowRight } from "lucide-react";

const QUICK_LINKS = [
  {
    href: "/agent",
    icon: Bot,
    title: "Agent Studio",
    description: "Configure your AI agent's name, languages, and voice.",
  },
  {
    href: "/calls",
    icon: Phone,
    title: "Calls",
    description: "Review call transcripts, summaries, and recordings.",
  },
  {
    href: "/settings",
    icon: Settings,
    title: "Settings",
    description: "Manage your account and workspace preferences.",
  },
];

export default function Dashboard() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
        <UserButton />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {QUICK_LINKS.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="group bg-card border border-border rounded-xl p-6 hover:border-indigo-300 hover:shadow-sm transition"
            >
              <Icon className="w-5 h-5 text-indigo-600 mb-4" />
              <div className="font-medium text-foreground mb-1 flex items-center justify-between">
                {link.title}
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-indigo-600 group-hover:translate-x-0.5 transition" />
              </div>
              <p className="text-sm text-muted-foreground">{link.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
