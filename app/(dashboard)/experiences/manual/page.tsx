import { SectionHeader } from "@/components/dashboard/section-header";
import { Button } from "@/components/ui/button";
import { PlayCircle, MessageSquareText, FileSignature } from "lucide-react";

const PLAYBOOKS = [
  { icon: MessageSquareText, name: "Objection handling", description: "Reframe common pricing and competitor objections.", lastUsed: "Used 14 times this week" },
  { icon: FileSignature, name: "Send proposal", description: "Generate and send a tailored proposal mid-conversation.", lastUsed: "Used 6 times this week" },
  { icon: PlayCircle, name: "Live product walkthrough", description: "Trigger a guided product tour inside the chat.", lastUsed: "Used 22 times this week" },
];

export default function ManualExperiencesPage() {
  return (
    <div>
      <SectionHeader group="Experiences" title="Manual" description="Playbooks a rep can launch by hand during a live conversation." />
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {PLAYBOOKS.map((p) => {
          const Icon = p.icon;
          return (
            <div key={p.name} className="bg-card border border-border rounded-xl p-5 flex flex-col">
              <Icon className="w-5 h-5 text-[#02524B] mb-3" />
              <p className="text-sm font-medium text-foreground">{p.name}</p>
              <p className="text-xs text-muted-foreground mt-1 flex-1">{p.description}</p>
              <p className="text-xs text-muted-foreground mt-3 mb-3">{p.lastUsed}</p>
              <Button variant="outline" size="sm">Launch</Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
