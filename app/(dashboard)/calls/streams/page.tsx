import { SectionHeader } from "@/components/dashboard/section-header";
import { Badge } from "@/components/ui/badge";
import { Inbox, UserX, UserCheck, AlertTriangle } from "lucide-react";

const STREAMS = [
  { icon: Inbox, name: "All conversations", count: 48, description: "Every conversation across voice and chat." },
  { icon: UserX, name: "Unassigned", count: 6, description: "Waiting for a rep or workflow to pick them up." },
  { icon: UserCheck, name: "Mine", count: 11, description: "Conversations assigned to you." },
  { icon: AlertTriangle, name: "Escalated", count: 3, description: "Visitor asked to speak to a human." },
];

export default function StreamsPage() {
  return (
    <div>
      <SectionHeader group="Conversations" title="Streams" description="Saved views into your conversation inbox." />
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {STREAMS.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.name} className="bg-card border border-border rounded-xl p-5 flex items-start gap-4">
              <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">{s.name}</p>
                  <Badge variant="secondary">{s.count}</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{s.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
