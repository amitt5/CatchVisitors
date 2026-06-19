import { SectionHeader } from "@/components/dashboard/section-header";
import { DataTable } from "@/components/dashboard/data-table";
import { Badge } from "@/components/ui/badge";

const BUTTONS = [
  { label: "Talk to our AI", page: "Homepage hero", clicks: 1240, style: "Primary" },
  { label: "Get a demo", page: "Pricing page", clicks: 318, style: "Secondary" },
  { label: "Chat with us", page: "Floating widget (all pages)", clicks: 2870, style: "Floating" },
];

export default function ButtonsPage() {
  return (
    <div>
      <SectionHeader group="Experiences" title="Buttons" description="Call-to-action buttons that open a conversation." />
      <div className="p-6">
        <DataTable
          columns={["Button", "Placement", "Clicks (30d)", "Style"]}
          rows={BUTTONS.map((b) => [
            <span key="label" className="font-medium text-foreground">{b.label}</span>,
            b.page,
            b.clicks.toLocaleString(),
            <Badge key="style" variant="secondary">{b.style}</Badge>,
          ])}
        />
      </div>
    </div>
  );
}
