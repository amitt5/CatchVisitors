import { SectionHeader } from "@/components/dashboard/section-header";
import { Image as ImageIcon, Calendar, Star, List } from "lucide-react";

const BLOCKS = [
  { icon: Calendar, name: "Booking calendar", description: "Lets a visitor pick a time without leaving the chat." },
  { icon: ImageIcon, name: "Image carousel", description: "Show room, product, or facility photos inline." },
  { icon: Star, name: "Testimonial card", description: "Surface a customer quote relevant to the conversation." },
  { icon: List, name: "Pricing table", description: "Compare plans without sending a visitor to /pricing." },
];

export default function BlocksPage() {
  return (
    <div>
      <SectionHeader group="Experiences" title="Blocks" description="Reusable rich content your agent can drop into a conversation." />
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {BLOCKS.map((b) => {
          const Icon = b.icon;
          return (
            <div key={b.name} className="bg-card border border-border rounded-xl p-5 flex items-start gap-4">
              <div className="w-9 h-9 rounded-lg bg-[#E6F2EE] flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-[#02524B]" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{b.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{b.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
