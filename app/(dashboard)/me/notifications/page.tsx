"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/dashboard/section-header";
import { Switch } from "@/components/ui/switch";
import { Bell, PhoneMissed, FileText, TrendingDown } from "lucide-react";

const PREFERENCES = [
  { id: "booked", label: "New meeting booked", description: "When an AI agent books a meeting on your calendar.", defaultOn: true },
  { id: "offline", label: "Agent goes offline", description: "When an agent's voice or chat channel disconnects unexpectedly.", defaultOn: true },
  { id: "summary", label: "Weekly summary", description: "A digest of calls, conversions, and agent performance.", defaultOn: true },
  { id: "escalation", label: "Conversation escalated", description: "When a visitor asks to speak to a human.", defaultOn: false },
];

const RECENT = [
  { icon: PhoneMissed, title: "Missed call from Acme Logistics", time: "12 min ago" },
  { icon: FileText, title: "Weekly summary is ready", time: "3 hours ago" },
  { icon: TrendingDown, title: "Conversion rate dipped 4% this week", time: "1 day ago" },
  { icon: Bell, title: "Isla booked a demo with Vantage Realty", time: "1 day ago" },
];

export default function NotificationsPage() {
  const [prefs, setPrefs] = useState<Record<string, boolean>>(
    Object.fromEntries(PREFERENCES.map((p) => [p.id, p.defaultOn]))
  );

  return (
    <div>
      <SectionHeader group="Me" title="Notifications" description="Choose what you want to hear about, and see what's happened recently." />
      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Email me when</h3>
          <div className="space-y-4">
            {PREFERENCES.map((p) => (
              <div key={p.id} className="flex items-start gap-3">
                <Switch
                  checked={prefs[p.id]}
                  onCheckedChange={(checked) => setPrefs((prev) => ({ ...prev, [p.id]: checked }))}
                  className="mt-0.5"
                />
                <div>
                  <p className="text-sm font-medium text-foreground">{p.label}</p>
                  <p className="text-xs text-muted-foreground">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl divide-y divide-border">
          <h3 className="text-sm font-semibold text-foreground px-6 py-4">Recent notifications</h3>
          {RECENT.map((n, i) => {
            const Icon = n.icon;
            return (
              <div key={i} className="flex items-center gap-3 px-6 py-3">
                <Icon className="w-4 h-4 text-muted-foreground shrink-0" />
                <p className="text-sm text-foreground flex-1">{n.title}</p>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{n.time}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
