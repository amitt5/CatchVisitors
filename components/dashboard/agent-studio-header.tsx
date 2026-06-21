"use client";

import Link from "next/link";
import { ChevronDown, Bot } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export const AGENT_STUDIO_TABS = [
  { id: "profile", label: "Agent profile" },
  { id: "content", label: "Content" },
  { id: "guides", label: "Guides" },
  { id: "scorecard", label: "Scorecard" },
  { id: "inbox", label: "Inbox" },
  { id: "email", label: "Email" },
] as const;

export type AgentStudioTabId = (typeof AGENT_STUDIO_TABS)[number]["id"];

interface AgentSummary {
  id: string;
  name: string;
}

export function AgentStudioHeader({
  agentName,
  agentId,
  agents,
  activeTab,
}: {
  agentName: string;
  agentId: string;
  agents: AgentSummary[];
  activeTab: AgentStudioTabId;
}) {
  const otherAgents = agents.filter((a) => a.id !== agentId);

  return (
    <div className="bg-background border-b border-border sticky top-0 z-10">
      <div className="flex items-center gap-2 px-6 pt-4 text-sm text-muted-foreground">
        <span>Agent Studio</span>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 text-foreground font-medium hover:text-[#02524B] transition-colors outline-none">
            {agentName || "Untitled agent"}
            <ChevronDown className="w-3.5 h-3.5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {otherAgents.length === 0 ? (
              <div className="px-2 py-1.5 text-xs text-muted-foreground">No other agents</div>
            ) : (
              otherAgents.map((a) => (
                <DropdownMenuItem key={a.id} asChild>
                  <Link href={`/agent/${a.id}`} className="flex items-center gap-2">
                    <Bot className="w-3.5 h-3.5 text-muted-foreground" />
                    {a.name}
                  </Link>
                </DropdownMenuItem>
              ))
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-1 px-6 mt-3 overflow-x-auto">
        {AGENT_STUDIO_TABS.map((tab) => {
          const isActive = tab.id === activeTab;
          const className = cn(
            "px-2 pb-2.5 text-sm border-b-2 whitespace-nowrap transition-colors",
            isActive
              ? "border-[#02524B] text-foreground font-medium"
              : "border-transparent text-muted-foreground hover:text-foreground"
          );

          return (
            <Link key={tab.id} href={`/agent/${agentId}?tab=${tab.id}`} className={className}>
              {tab.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
