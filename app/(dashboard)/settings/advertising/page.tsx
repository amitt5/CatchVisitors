import { SectionHeader } from "@/components/dashboard/section-header";
import { DataTable } from "@/components/dashboard/data-table";

const CAMPAIGNS = [
  { source: "Google Ads — Brand", visitors: 1840, conversations: 312, conversions: 41, spend: "€2,140" },
  { source: "Google Ads — Competitor", visitors: 920, conversations: 140, conversions: 12, spend: "€1,380" },
  { source: "LinkedIn — Demo gen", visitors: 540, conversations: 98, conversions: 19, spend: "€2,610" },
  { source: "Organic", visitors: 3120, conversations: 401, conversions: 58, spend: "€0" },
];

export default function AdvertisingPage() {
  return (
    <div>
      <SectionHeader group="App Settings" title="Advertising" description="How ad traffic turns into conversations and conversions." />
      <div className="p-6">
        <DataTable
          columns={["Source", "Visitors", "Conversations", "Conversions", "Spend"]}
          rows={CAMPAIGNS.map((c) => [
            <span key="source" className="font-medium text-foreground">{c.source}</span>,
            c.visitors.toLocaleString(),
            c.conversations.toLocaleString(),
            c.conversions.toLocaleString(),
            c.spend,
          ])}
        />
      </div>
    </div>
  );
}
