import { SectionHeader } from "@/components/dashboard/section-header";
import { DataTable } from "@/components/dashboard/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const FORMS = [
  { name: "Book a demo", page: "/demo", submissions: 218, conversionRate: "14%" },
  { name: "Contact sales", page: "/contact", submissions: 96, conversionRate: "9%" },
  { name: "Newsletter signup", page: "Footer (all pages)", submissions: 540, conversionRate: "21%" },
];

export default function FormsPage() {
  return (
    <div>
      <SectionHeader
        group="Experiences"
        title="Forms"
        description="Lead capture forms embedded on your site."
        action={
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New form
          </Button>
        }
      />
      <div className="p-6">
        <DataTable
          columns={["Form", "Page", "Submissions (30d)", "Conversion"]}
          rows={FORMS.map((f) => [
            <span key="name" className="font-medium text-foreground">{f.name}</span>,
            f.page,
            f.submissions.toLocaleString(),
            f.conversionRate,
          ])}
        />
      </div>
    </div>
  );
}
