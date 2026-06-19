export interface IslaPersona {
  id: string;
  name: string | null;
  company: string | null;
  role: string | null;
  avatarInitials: string;
  segmentTag: string;
  accent: "slate" | "blue" | "purple" | "amber" | "lime";
  crm: {
    lifecycleStage: string;
    dealStage: string;
    owner: string;
    lastActivity: string;
  };
  greetingBanner: string;
  assignedRep?: { name: string; title: string };
  vapiVariableValues: {
    persona_name: string;
    persona_company: string;
    persona_role: string;
    persona_context: string;
    persona_directive: string;
  };
}

export const ISLA_PERSONAS: IslaPersona[] = [
  {
    id: "cold-anonymous",
    name: null,
    company: null,
    role: null,
    avatarInitials: "?",
    segmentTag: "Anonymous Visitor",
    accent: "slate",
    crm: {
      lifecycleStage: "Not in CRM",
      dealStage: "—",
      owner: "Unassigned",
      lastActivity: "First visit, just now — arrived via organic search",
    },
    greetingBanner: "New visitor — no CRM match",
    vapiVariableValues: {
      persona_name: "an anonymous visitor (no name available)",
      persona_company: "unknown — not yet in the CRM",
      persona_role: "unknown",
      persona_context:
        "This visitor has no CRM record. They arrived from an organic Google search for an AI sales agent for websites. This is their first visit and you know nothing else about them.",
      persona_directive:
        "You have no prior context on this person. Open with a friendly, low-pressure greeting and do NOT pretend to know who they are or what company they're from. Ask one or two light qualifying questions (what they're trying to solve, roughly how big their company is) before suggesting next steps. If it sounds like a good fit, offer a short intro call and mention you'll create a record for them. Do not be pushy.",
    },
  },
  {
    id: "nurture-lead",
    name: "Jen Patel",
    company: "Brightwave Co",
    role: "Marketing Ops Lead",
    avatarInitials: "JP",
    segmentTag: "Marketing Qualified Lead",
    accent: "blue",
    crm: {
      lifecycleStage: "MQL",
      dealStage: "—",
      owner: "Unassigned",
      lastActivity: "Opened \"Switching from Concur\" email 2 days ago",
    },
    greetingBanner: "Opened nurture email 2 days ago",
    vapiVariableValues: {
      persona_name: "Jen Patel",
      persona_company: "Brightwave Co (mid-market SaaS, ~120 employees)",
      persona_role: "Marketing Ops Lead",
      persona_context:
        "Jen opened our \"Switching from Concur\" nurture email 2 days ago and clicked through to the website today.",
      persona_directive:
        "Greet Jen by name and reference the \"Switching from Concur\" email she opened — that should be the very first thing you mention, since it's what proves you know her. Ask what made her curious about switching. Steer the conversation toward what's painful about her current tool, then offer a short call with a specialist if she seems engaged.",
    },
  },
  {
    id: "high-intent",
    name: "Marcus Chen",
    company: "Lumio",
    role: "Head of RevOps",
    avatarInitials: "MC",
    segmentTag: "Sales Qualified Lead",
    accent: "purple",
    crm: {
      lifecycleStage: "SQL",
      dealStage: "—",
      owner: "Unassigned",
      lastActivity: "3rd visit this week — currently viewing Pricing",
    },
    greetingBanner: "3rd visit this week — viewing Pricing",
    vapiVariableValues: {
      persona_name: "Marcus Chen",
      persona_company: "Lumio (Series B startup, ~80 employees)",
      persona_role: "Head of RevOps",
      persona_context:
        "This is Marcus's 3rd visit to the site this week and he is currently on the Pricing page.",
      persona_directive:
        "Marcus is clearly far along — skip discovery small talk. Acknowledge he's been checking out pricing, ask which plan looks closest to what he needs, and move quickly to offering a call with a solutions specialist to scope a quote. Be direct and efficient, not chatty.",
    },
  },
  {
    id: "vip-opportunity",
    name: "Sarah Whitfield",
    company: "Northstar Logistics",
    role: "VP Sales",
    avatarInitials: "SW",
    segmentTag: "Open Opportunity — $85k",
    accent: "amber",
    crm: {
      lifecycleStage: "Opportunity",
      dealStage: "Proposal Sent ($85,000)",
      owner: "Alex Rivera (AE)",
      lastActivity: "Proposal sent 3 days ago — just reopened Pricing",
    },
    greetingBanner: "VIP — open $85k opportunity",
    assignedRep: { name: "Alex Rivera", title: "Account Executive" },
    vapiVariableValues: {
      persona_name: "Sarah Whitfield",
      persona_company: "Northstar Logistics",
      persona_role: "VP Sales",
      persona_context:
        "Sarah is a known, high-value contact. There is an open $85,000 opportunity owned by Alex Rivera (Account Executive); a proposal was sent 3 days ago and she just reopened the pricing page.",
      persona_directive:
        "Do not qualify Sarah — skip discovery entirely. Greet her warmly by name and company, acknowledge the proposal Alex Rivera sent her, and ask if she has questions about it. Offer to loop Alex in directly or get her on his calendar right away rather than asking qualifying questions.",
    },
  },
  {
    id: "bad-fit",
    name: "Tom Becker",
    company: "Tinkerly",
    role: "Founder",
    avatarInitials: "TB",
    segmentTag: "New Lead — Needs Qualification",
    accent: "lime",
    crm: {
      lifecycleStage: "New Lead",
      dealStage: "—",
      owner: "Unassigned",
      lastActivity: "First visit, just now",
    },
    greetingBanner: "New lead — pre-qualification needed",
    vapiVariableValues: {
      persona_name: "Tom Becker",
      persona_company: "Tinkerly (2-person early-stage startup)",
      persona_role: "Founder",
      persona_context:
        "Tom is the solo founder of Tinkerly, a 2-person early-stage startup with no dedicated sales team and a very limited budget. He just landed on the site for the first time.",
      persona_directive:
        "Ask a couple of light qualifying questions (team size, budget, use case). Once it's clear the company is too small/early for this product, do NOT push a meeting. Be warm and respectful: acknowledge it's probably not the right time, suggest free or self-serve resources, and invite him to check back once the team grows. This is a graceful disqualify, not a brush-off — showing restraint here matters more than booking a call.",
    },
  },
];

export function getPersonaById(id: string): IslaPersona | undefined {
  return ISLA_PERSONAS.find((p) => p.id === id);
}
