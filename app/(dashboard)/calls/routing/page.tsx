import { SectionHeader } from "@/components/dashboard/section-header";
import { DataTable } from "@/components/dashboard/data-table";
import { Badge } from "@/components/ui/badge";

const RULES = [
  { priority: 1, condition: "Visitor mentions \"pricing\" or \"budget\"", destination: "Sales group" },
  { priority: 2, condition: "Visitor is an existing customer", destination: "Support group" },
  { priority: 3, condition: "Outside business hours", destination: "Isla (AI agent)" },
  { priority: 4, condition: "Everything else", destination: "Isla (AI agent)" },
];

export default function RoutingPage() {
  return (
    <div>
      <SectionHeader group="Conversations" title="Routing" description="Rules that decide who — or what — picks up a conversation." />
      <div className="p-6">
        <DataTable
          columns={["Priority", "Condition", "Routes to"]}
          rows={RULES.map((r) => [
            <Badge key="priority" variant="secondary">{r.priority}</Badge>,
            r.condition,
            <span key="dest" className="font-medium text-foreground">{r.destination}</span>,
          ])}
        />
      </div>
    </div>
  );
}
