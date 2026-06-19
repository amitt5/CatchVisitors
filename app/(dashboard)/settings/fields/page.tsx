import { SectionHeader } from "@/components/dashboard/section-header";
import { DataTable } from "@/components/dashboard/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

const FIELDS = [
  { name: "Lead Source", type: "Text", required: true },
  { name: "Company Size", type: "Number", required: false },
  { name: "Budget Range", type: "Select", required: false },
  { name: "Preferred Language", type: "Select", required: true },
  { name: "Decision Timeline", type: "Select", required: false },
];

export default function FieldsPage() {
  return (
    <div>
      <SectionHeader
        group="App Settings"
        title="Fields"
        description="Custom fields collected during conversations."
        action={
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add field
          </Button>
        }
      />
      <div className="p-6">
        <DataTable
          columns={["Field", "Type", "Required"]}
          rows={FIELDS.map((f) => [
            <span key="name" className="font-medium text-foreground">{f.name}</span>,
            f.type,
            f.required ? <Badge key="req">Required</Badge> : <span key="req" className="text-muted-foreground">Optional</span>,
          ])}
        />
      </div>
    </div>
  );
}
