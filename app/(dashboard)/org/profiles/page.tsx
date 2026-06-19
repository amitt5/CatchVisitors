import { SectionHeader } from "@/components/dashboard/section-header";
import { DataTable } from "@/components/dashboard/data-table";

const PROFILES = [
  { name: "Owner", description: "Full access to billing, users, and all settings.", users: 1 },
  { name: "Admin", description: "Manage agents, conversations, and workspace settings.", users: 2 },
  { name: "Editor", description: "Edit agent configuration and content library.", users: 3 },
  { name: "Viewer", description: "Read-only access to conversations and reports.", users: 5 },
];

export default function ProfilesPage() {
  return (
    <div>
      <SectionHeader group="Organization" title="Profiles" description="Permission profiles assigned to your users." />
      <div className="p-6">
        <DataTable
          columns={["Profile", "Description", "Users"]}
          rows={PROFILES.map((p) => [
            <span key="name" className="font-medium text-foreground">{p.name}</span>,
            p.description,
            `${p.users} ${p.users === 1 ? "user" : "users"}`,
          ])}
        />
      </div>
    </div>
  );
}
