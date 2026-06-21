"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/dashboard/section-header";
import { Check, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

const COLORS = [
  { id: "green", hex: "#02524B" },
  { id: "emerald", hex: "#10B981" },
  { id: "amber", hex: "#F59E0B" },
  { id: "rose", hex: "#F43F5E" },
  { id: "slate", hex: "#475569" },
];

export default function ThemesPage() {
  const [color, setColor] = useState("green");
  const active = COLORS.find((c) => c.id === color)!;

  return (
    <div>
      <SectionHeader group="Organization" title="Themes" description="Brand colors used across your widgets and agent UI." />
      <div className="p-6 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6">
        <div className="bg-card border border-border rounded-xl p-6 space-y-6 max-w-md">
          <div>
            <p className="text-sm font-medium text-foreground mb-3">Brand color</p>
            <div className="flex items-center gap-3">
              {COLORS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setColor(c.id)}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-105"
                  style={{ backgroundColor: c.hex }}
                >
                  {color === c.id && <Check className="w-4 h-4 text-white" />}
                </button>
              ))}
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            This color is used for the chat bubble, send button, and highlighted messages in your embedded widget.
          </p>
        </div>

        <div className="bg-muted/40 border border-border rounded-xl p-6 w-72">
          <p className="text-xs text-muted-foreground mb-3">Preview</p>
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="px-4 py-3 flex items-center gap-2" style={{ backgroundColor: active.hex }}>
              <Bot className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">Isla</span>
            </div>
            <div className="p-4 space-y-2">
              <div className="bg-muted rounded-lg px-3 py-2 text-xs text-foreground w-fit">
                Hi! How can I help you today?
              </div>
              <div
                className={cn("rounded-lg px-3 py-2 text-xs text-white w-fit ml-auto")}
                style={{ backgroundColor: active.hex }}
              >
                Tell me about pricing
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
