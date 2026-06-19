import { SectionHeader } from "@/components/dashboard/section-header";
import { DataTable } from "@/components/dashboard/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

const CAMPAIGNS = [
  { name: "Demo no-show re-engagement", status: "Active", sent: 142, openRate: "61%", clickRate: "18%" },
  { name: "Trial day 3 check-in", status: "Active", sent: 89, openRate: "54%", clickRate: "22%" },
  { name: "Pricing page follow-up", status: "Paused", sent: 310, openRate: "47%", clickRate: "9%" },
  { name: "Hackathon launch announcement", status: "Draft", sent: 0, openRate: "—", clickRate: "—" },
];

export default function EmailCampaignsPage() {
  return (
    <div>
      <SectionHeader
        group="AI"
        title="Email Campaigns"
        description="Follow-up emails your agent sends after a conversation."
        action={
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            New campaign
          </Button>
        }
      />
      <div className="p-6">
        <DataTable
          columns={["Campaign", "Status", "Sent", "Open rate", "Click rate"]}
          rows={CAMPAIGNS.map((c) => [
            <span key="name" className="font-medium text-foreground">{c.name}</span>,
            <Badge key="status" variant={c.status === "Active" ? "default" : "secondary"}>{c.status}</Badge>,
            c.sent.toLocaleString(),
            c.openRate,
            c.clickRate,
          ])}
        />
      </div>
    </div>
  );
}
