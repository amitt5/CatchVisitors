import { SectionHeader } from "@/components/dashboard/section-header";
import { DataTable } from "@/components/dashboard/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserPlus } from "lucide-react";

const USERS = [
  { name: "Amit Goel", initials: "AG", email: "amit@inboundly.com", role: "Owner", status: "Active", lastActive: "Just now" },
  { name: "Priya Shah", initials: "PS", email: "priya@inboundly.com", role: "Admin", status: "Active", lastActive: "2 hours ago" },
  { name: "Tom Reyes", initials: "TR", email: "tom@inboundly.com", role: "Editor", status: "Active", lastActive: "Yesterday" },
  { name: "Lina Park", initials: "LP", email: "lina@inboundly.com", role: "Viewer", status: "Invited", lastActive: "—" },
];

export default function UsersPage() {
  return (
    <div>
      <SectionHeader
        group="Organization"
        title="Users"
        description="People with access to this workspace."
        action={
          <Button className="bg-[#02524B] hover:bg-[#013F3A] text-white">
            <UserPlus className="w-4 h-4 mr-2" />
            Invite user
          </Button>
        }
      />
      <div className="p-6">
        <DataTable
          columns={["Name", "Role", "Status", "Last active"]}
          rows={USERS.map((u) => [
            <div key="name" className="flex items-center gap-3">
              <Avatar className="size-7">
                <AvatarFallback className="bg-[#E6F2EE] text-[#02524B] text-xs font-semibold">{u.initials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-foreground">{u.name}</p>
                <p className="text-xs text-muted-foreground">{u.email}</p>
              </div>
            </div>,
            u.role,
            <Badge key="status" variant={u.status === "Active" ? "default" : "secondary"}>{u.status}</Badge>,
            u.lastActive,
          ])}
        />
      </div>
    </div>
  );
}
