import { SectionHeader } from "@/components/dashboard/section-header";
import { Kbd, KbdGroup } from "@/components/ui/kbd";

const SHORTCUT_GROUPS = [
  {
    title: "Navigation",
    shortcuts: [
      { keys: ["⌘", "K"], description: "Open quick search" },
      { keys: ["G", "D"], description: "Go to Dashboard" },
      { keys: ["G", "A"], description: "Go to Agent Studio" },
      { keys: ["G", "C"], description: "Go to Calls" },
    ],
  },
  {
    title: "Agent Studio",
    shortcuts: [
      { keys: ["⌘", "S"], description: "Save agent settings" },
      { keys: ["⌘", "Enter"], description: "Start a preview call" },
      { keys: ["Esc"], description: "Cancel editing" },
    ],
  },
  {
    title: "Conversations",
    shortcuts: [
      { keys: ["E"], description: "Escalate to a human rep" },
      { keys: ["⌘", "/"], description: "Insert a suggested reply" },
      { keys: ["J", "/", "K"], description: "Next / previous conversation" },
    ],
  },
];

export default function ShortcutsPage() {
  return (
    <div>
      <SectionHeader group="Me" title="Shortcuts" description="Keyboard shortcuts to move faster." />
      <div className="p-6 max-w-2xl space-y-6">
        {SHORTCUT_GROUPS.map((group) => (
          <div key={group.title} className="bg-card border border-border rounded-xl divide-y divide-border">
            <h3 className="text-sm font-semibold text-foreground px-6 py-4">{group.title}</h3>
            {group.shortcuts.map((s, i) => (
              <div key={i} className="flex items-center justify-between px-6 py-3">
                <p className="text-sm text-foreground">{s.description}</p>
                <KbdGroup>
                  {s.keys.map((k, j) => (
                    <Kbd key={j}>{k}</Kbd>
                  ))}
                </KbdGroup>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
