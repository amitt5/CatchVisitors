"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/dashboard/section-header";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

const RULES = [
  { id: "exit-intent", name: "Exit intent offer", trigger: "Mouse moves toward closing the tab", on: true },
  { id: "pricing-nudge", name: "Pricing page nudge", trigger: "30 seconds on /pricing with no interaction", on: true },
  { id: "return-visitor", name: "Return visitor welcome", trigger: "3rd visit within 14 days", on: true },
  { id: "scroll-depth", name: "Deep scroll engagement", trigger: "Scrolled past 75% of the page", on: false },
];

export default function AutomaticExperiencesPage() {
  const [rules, setRules] = useState<Record<string, boolean>>(
    Object.fromEntries(RULES.map((r) => [r.id, r.on]))
  );

  return (
    <div>
      <SectionHeader group="Experiences" title="Automatic" description="Rules that proactively start a conversation." />
      <div className="p-6 max-w-3xl">
        <div className="bg-card border border-border rounded-xl divide-y divide-border">
          {RULES.map((r) => (
            <div key={r.id} className="flex items-start gap-4 px-6 py-4">
              <Switch
                checked={rules[r.id]}
                onCheckedChange={(checked) => setRules((prev) => ({ ...prev, [r.id]: checked }))}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground">{r.name}</p>
                  <Badge variant={rules[r.id] ? "default" : "secondary"}>{rules[r.id] ? "On" : "Off"}</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Trigger: {r.trigger}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
