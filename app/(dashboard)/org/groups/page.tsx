import { SectionHeader } from "@/components/dashboard/section-header";
import { DataTable } from "@/components/dashboard/data-table";
import { Badge } from "@/components/ui/badge";

const GROUPS = [
  { name: "Sales", members: 4, routing: "Inbound demo requests" },
  { name: "Support", members: 6, routing: "Existing customer questions" },
  { name: "Marketing", members: 2, routing: "Campaign landing pages" },
];

export default function GroupsPage() {
  return (
    <div>
      <SectionHeader group="Organization" title="Groups" description="Teams that conversations can be routed to." />
      <div className="p-6">
        <DataTable
          columns={["Group", "Members", "Routed traffic"]}
          rows={GROUPS.map((g) => [
            <span key="name" className="font-medium text-foreground">{g.name}</span>,
            <Badge key="members" variant="secondary">{g.members} members</Badge>,
            g.routing,
          ])}
        />
      </div>
    </div>
  );
}
