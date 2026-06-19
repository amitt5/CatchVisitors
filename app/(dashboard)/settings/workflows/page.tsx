"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/dashboard/section-header";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

const WORKFLOWS = [
  { id: "hot-lead", name: "Hot lead alert", trigger: "Visitor mentions budget or timeline", action: "Notify #sales-alerts in Slack", on: true },
  { id: "after-hours", name: "After-hours handoff", trigger: "Conversation starts outside business hours", action: "Let Isla handle, summarize for morning review", on: true },
  { id: "escalation", name: "Escalation routing", trigger: "Visitor asks for a human", action: "Route to on-call rep group", on: true },
  { id: "follow-up", name: "No-show follow-up", trigger: "Booked meeting passes with no confirmation", action: "Send automated re-booking email", on: false },
];

export default function WorkflowsPage() {
  const [workflows, setWorkflows] = useState<Record<string, boolean>>(
    Object.fromEntries(WORKFLOWS.map((w) => [w.id, w.on]))
  );

  return (
    <div>
      <SectionHeader group="App Settings" title="Workflows" description="Automations that run on top of your conversations." />
      <div className="p-6 max-w-3xl">
        <div className="bg-card border border-border rounded-xl divide-y divide-border">
          {WORKFLOWS.map((w) => (
            <div key={w.id} className="flex items-start gap-4 px-6 py-4">
              <Switch
                checked={workflows[w.id]}
                onCheckedChange={(checked) => setWorkflows((prev) => ({ ...prev, [w.id]: checked }))}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground">{w.name}</p>
                  <Badge variant={workflows[w.id] ? "default" : "secondary"}>
                    {workflows[w.id] ? "On" : "Off"}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  When <span className="text-foreground">{w.trigger}</span> → {w.action}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
