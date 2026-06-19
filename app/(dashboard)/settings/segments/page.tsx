import { SectionHeader } from "@/components/dashboard/section-header";
import { DataTable } from "@/components/dashboard/data-table";
import { Badge } from "@/components/ui/badge";

const SEGMENTS = [
  { name: "Enterprise visitors", criteria: "Company size > 500", visitors: 312 },
  { name: "Returning visitors", criteria: "Visited 3+ times in 30 days", visitors: 1204 },
  { name: "Pricing page viewers", criteria: "Viewed /pricing in this session", visitors: 587 },
  { name: "High intent", criteria: "Spent 2+ min on site, no chat yet", visitors: 198 },
];

export default function SegmentsPage() {
  return (
    <div>
      <SectionHeader group="App Settings" title="Segments" description="Visitor groups your agents can target with tailored greetings." />
      <div className="p-6">
        <DataTable
          columns={["Segment", "Criteria", "Visitors (30d)"]}
          rows={SEGMENTS.map((s) => [
            <span key="name" className="font-medium text-foreground">{s.name}</span>,
            s.criteria,
            <Badge key="count" variant="secondary">{s.visitors.toLocaleString()}</Badge>,
          ])}
        />
      </div>
    </div>
  );
}
