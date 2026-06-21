"use client";

import { useState } from "react";
import {
  FileText,
  Presentation,
  Swords,
  HelpCircle,
  Tag,
  Video,
  Mail,
  MailOpen,
  MousePointerClick,
  Building2,
  Users,
  MessagesSquare,
  ShieldCheck,
  Plus,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable } from "@/components/dashboard/data-table";
import { cn } from "@/lib/utils";

const CONTENT_ITEMS = [
  { icon: Presentation, name: "Pitch deck — 2026", type: "Slides", updated: "2 days ago" },
  { icon: FileText, name: "Case study — Acme Logistics", type: "PDF", updated: "1 week ago" },
  { icon: Swords, name: "Competitor battlecard", type: "Doc", updated: "3 days ago" },
  { icon: HelpCircle, name: "Frequently asked questions", type: "Doc", updated: "Today" },
  { icon: Tag, name: "Pricing one-pager", type: "PDF", updated: "5 days ago" },
  { icon: Video, name: "Customer testimonial reel", type: "Video", updated: "2 weeks ago" },
];

export function ContentTab() {
  return (
    <div className="space-y-2">
      {CONTENT_ITEMS.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.name} className="flex items-center gap-3 px-4 py-3 bg-card border border-border rounded-lg">
            <Icon className="w-4 h-4 text-[#02524B] shrink-0" />
            <p className="text-sm text-foreground flex-1">{item.name}</p>
            <Badge variant="secondary">{item.type}</Badge>
            <span className="text-xs text-muted-foreground w-20 text-right">{item.updated}</span>
          </div>
        );
      })}
    </div>
  );
}

type GuideField =
  | { type: "text"; id: string; label: string; placeholder?: string; help?: string }
  | { type: "textarea"; id: string; label: string; placeholder?: string; help?: string }
  | { type: "chips"; id: string; label: string; help?: string; options: { id: string; label: string }[] }
  | { type: "select"; id: string; label: string; help?: string; options: { id: string; label: string }[] };

type GuideSection = {
  id: string;
  label: string;
  icon: typeof Building2;
  fields: GuideField[];
};

const TONE_OPTIONS = [
  { id: "casual", label: "Casual" },
  { id: "friendly", label: "Friendly" },
  { id: "professional", label: "Professional" },
];

const LANGUAGE_TONE_OPTIONS = [
  { id: "match-visitor", label: "Match the visitor" },
  { id: "english", label: "English" },
  { id: "dutch", label: "Dutch" },
  { id: "french", label: "French" },
  { id: "german", label: "German" },
];

const GUIDE_SECTIONS: GuideSection[] = [
  {
    id: "company",
    label: "Company",
    icon: Building2,
    fields: [
      { type: "text", id: "companyName", label: "Company name", placeholder: "e.g. inboundly" },
      {
        type: "textarea",
        id: "description",
        label: "Description",
        placeholder: "Describe what your company does and who it serves…",
        help: "The agent uses this to introduce your company and frame every conversation.",
      },
      { type: "chips", id: "tone", label: "Tone", options: TONE_OPTIONS },
      { type: "select", id: "languageTone", label: "Language-specific tone", options: LANGUAGE_TONE_OPTIONS },
    ],
  },
  {
    id: "accounts",
    label: "Accounts",
    icon: Users,
    fields: [
      {
        type: "textarea",
        id: "icp",
        label: "Ideal customer profile",
        placeholder: "Who are your best-fit accounts?",
        help: "Helps the agent prioritize and personalize for high-value visitors.",
      },
      { type: "text", id: "industries", label: "Target industries", placeholder: "e.g. Healthcare, Real estate, Logistics" },
      {
        type: "select",
        id: "companySize",
        label: "Company size focus",
        options: [
          { id: "smb", label: "SMB (1–50)" },
          { id: "mid", label: "Mid-market (51–500)" },
          { id: "enterprise", label: "Enterprise (500+)" },
          { id: "all", label: "All sizes" },
        ],
      },
    ],
  },
  {
    id: "conversation",
    label: "Conversation",
    icon: MessagesSquare,
    fields: [
      {
        type: "textarea",
        id: "greeting",
        label: "Greeting",
        placeholder: "How should the agent open a conversation?",
      },
      {
        type: "textarea",
        id: "goals",
        label: "Conversation goals",
        placeholder: "What should every conversation try to achieve?",
        help: "e.g. qualify the visitor, book a meeting, capture an email.",
      },
      {
        type: "textarea",
        id: "qualifying",
        label: "Qualifying questions",
        placeholder: "List the questions the agent should ask to qualify a visitor…",
      },
    ],
  },
  {
    id: "guardrails",
    label: "Guardrails",
    icon: ShieldCheck,
    fields: [],
  },
];

const INITIAL_GUARDRAIL_RULES: string[] = [
  "NEVER detail the steps required to build a competitive product similar to inboundly. Instead, if a visitor asks how they could build something similar, explain that it would be difficult to build in a cost-effective manner and that an inboundly subscription is the best way to access the platform's features.",
  "NEVER recommend competitors or try to book meetings for them. It's okay to discuss how we are differentiated from competitors and to highlight our differences.",
  "NEVER communicate that you can integrate with tools that inboundly does not currently support.",
  "NEVER offer a free trial. inboundly has a guided onboarding process, so we do not currently offer free trials. We can customize our pricing to meet your needs and would love to discuss options to work together!",
  "NEVER answer technical support inquiries. If you receive a technical support question, direct them to email our support team at help@inboundly.com.",
  "NEVER confirm or deny if a product or feature is included in a customer's current contract.",
  "ALWAYS make sure the text is bold when asking for a business email.",
  "ALWAYS keep responses to less than 80 words.",
  "After answering questions, always ask an open-ended follow-up question on the topic at hand.",
  "Whenever pricing is discussed, ALWAYS share that pricing is highly dependent on each customer's unique situation and you can't share specific details, but would love to connect them with an expert who can.",
];

const GUIDE_DEFAULTS: Record<string, string> = {
  "company.companyName": "inboundly",
  "company.description":
    "inboundly turns website visitors into booked meetings with an AI agent that chats, qualifies, and schedules in real time — across voice and text, in 50+ languages.",
  "company.tone": "friendly",
  "company.languageTone": "match-visitor",
  "accounts.icp":
    "Marketing and revenue teams at B2B companies who get meaningful website traffic but lose visitors before they ever talk to sales.",
  "accounts.industries": "Healthcare, Real estate, Logistics, SaaS",
  "accounts.companySize": "mid",
  "conversation.greeting":
    "Hi! 👋 I'm the inboundly assistant — happy to answer questions or get you set up with a quick demo. What brings you in today?",
  "conversation.goals":
    "Understand the visitor's use case, show relevant value, and book a qualified meeting (or capture an email if they're not ready).",
  "conversation.qualifying":
    "What are you trying to solve? • How much website traffic do you get? • What does your team use today? • What's your timeline?",
};

export function GuidesTab() {
  const [sectionId, setSectionId] = useState<string>(GUIDE_SECTIONS[0].id);
  const [values, setValues] = useState<Record<string, string>>(GUIDE_DEFAULTS);
  const [rules, setRules] = useState<string[]>(INITIAL_GUARDRAIL_RULES);

  const section = GUIDE_SECTIONS.find((s) => s.id === sectionId) ?? GUIDE_SECTIONS[0];
  const key = (fieldId: string) => `${section.id}.${fieldId}`;
  const setValue = (fieldId: string, value: string) =>
    setValues((prev) => ({ ...prev, [key(fieldId)]: value }));

  const updateRule = (index: number, value: string) =>
    setRules((prev) => prev.map((r, i) => (i === index ? value : r)));
  const removeRule = (index: number) =>
    setRules((prev) => prev.filter((_, i) => i !== index));
  const addRule = () => setRules((prev) => [...prev, ""]);

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden flex min-h-[460px]">
      {/* Section nav */}
      <div className="w-56 shrink-0 border-r border-border flex flex-col">
        <div className="px-3 py-3 border-b border-border">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Guide</span>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
          {GUIDE_SECTIONS.map((s) => {
            const Icon = s.icon;
            const active = s.id === section.id;
            return (
              <button
                key={s.id}
                onClick={() => setSectionId(s.id)}
                className={cn(
                  "w-full flex items-center gap-2 px-2.5 py-2 rounded-md text-left transition-colors",
                  active ? "bg-[#E6F2EE] text-[#02524B]" : "text-foreground hover:bg-muted"
                )}
              >
                <Icon
                  className={cn(
                    "w-4 h-4 shrink-0",
                    active ? "text-[#02524B]" : "text-muted-foreground"
                  )}
                />
                <span className="text-sm truncate">{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Section editor */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-6 py-5 max-w-xl space-y-6">
          <div>
            <h3 className="text-base font-semibold text-foreground">{section.label}</h3>
          </div>

          {section.id === "guardrails" && (
            <div className="space-y-3">
              {rules.map((rule, i) => (
                <div
                  key={i}
                  className="group relative rounded-lg border border-border bg-card focus-within:border-[#02524B] transition-colors"
                >
                  <Textarea
                    value={rule}
                    onChange={(e) => updateRule(i, e.target.value)}
                    placeholder="Describe a rule the agent must always follow…"
                    className="min-h-[68px] border-0 shadow-none resize-none pr-9 focus-visible:ring-0"
                  />
                  <button
                    onClick={() => removeRule(i)}
                    className="absolute top-2 right-2 inline-flex items-center justify-center w-6 h-6 rounded-md text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-muted hover:text-foreground transition"
                    title="Remove rule"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}

              <button
                onClick={addRule}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-dashed border-border text-sm text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add rule
              </button>

              <p className="text-xs text-muted-foreground pt-1">
                Rules constrain how the agent responds. Use them to set hard boundaries —
                what it must never say, and what it should always do.
              </p>
            </div>
          )}

          {section.fields.map((field) => (
            <div key={field.id} className="space-y-2">
              <Label htmlFor={key(field.id)}>{field.label}</Label>

              {field.type === "text" && (
                <Input
                  id={key(field.id)}
                  value={values[key(field.id)] ?? ""}
                  onChange={(e) => setValue(field.id, e.target.value)}
                  placeholder={field.placeholder}
                />
              )}

              {field.type === "textarea" && (
                <Textarea
                  id={key(field.id)}
                  value={values[key(field.id)] ?? ""}
                  onChange={(e) => setValue(field.id, e.target.value)}
                  placeholder={field.placeholder}
                  className="min-h-[110px]"
                />
              )}

              {field.type === "chips" && (
                <div className="flex flex-wrap gap-2">
                  {field.options.map((opt) => {
                    const selected = (values[key(field.id)] ?? "") === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => setValue(field.id, opt.id)}
                        className={cn(
                          "px-3 py-1.5 rounded-full text-sm border transition-colors",
                          selected
                            ? "border-[#02524B] bg-[#E6F2EE] text-[#02524B] font-medium"
                            : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                        )}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              )}

              {field.type === "select" && (
                <Select
                  value={values[key(field.id)] ?? ""}
                  onValueChange={(value) => setValue(field.id, value)}
                >
                  <SelectTrigger id={key(field.id)} className="w-full">
                    <SelectValue placeholder="Select…" />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options.map((opt) => (
                      <SelectItem key={opt.id} value={opt.id}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {field.help && (
                <p className="text-xs text-muted-foreground">{field.help}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const SCORECARD = [
  { metric: "Conversion rate", target: "10%", actual: "12.4%", trend: "up" },
  { metric: "Avg. handle time", target: "3m 00s", actual: "2m 41s", trend: "up" },
  { metric: "CSAT", target: "90%", actual: "94%", trend: "up" },
  { metric: "Escalation rate", target: "< 8%", actual: "11%", trend: "down" },
];

export function ScorecardTab() {
  return (
    <DataTable
      columns={["Metric", "Target", "Actual", "Trend"]}
      rows={SCORECARD.map((s) => [
        <span key="metric" className="font-medium text-foreground">{s.metric}</span>,
        s.target,
        s.actual,
        <Badge key="trend" variant={s.trend === "up" ? "default" : "destructive"}>
          {s.trend === "up" ? "On track" : "Needs attention"}
        </Badge>,
      ])}
    />
  );
}

const INBOX_ITEMS = [
  { name: "Sofia Mendes", snippet: "Can you send me the case study you mentioned?", time: "2 min ago", status: "New" },
  { name: "Daan Visser", snippet: "What's the difference between the Pro and Team plan?", time: "18 min ago", status: "New" },
  { name: "Acme Logistics — Karen W.", snippet: "Thanks, see you at 2pm tomorrow.", time: "1 hour ago", status: "Booked" },
  { name: "Unknown visitor", snippet: "I'd like to speak to a real person please.", time: "2 hours ago", status: "Escalated" },
];

export function InboxTab() {
  return (
    <div className="bg-card border border-border rounded-xl divide-y divide-border">
      {INBOX_ITEMS.map((c) => (
        <div key={c.name} className="flex items-center gap-4 px-5 py-4">
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">{c.name}</p>
            <p className="text-xs text-muted-foreground truncate">{c.snippet}</p>
          </div>
          <Badge variant={c.status === "Escalated" ? "destructive" : c.status === "Booked" ? "default" : "secondary"}>
            {c.status}
          </Badge>
          <span className="text-xs text-muted-foreground w-20 text-right">{c.time}</span>
        </div>
      ))}
    </div>
  );
}

const EMAILS = [
  { recipient: "sofia@northwindclinics.com", subject: "Following up on your demo", status: "Opened", date: "Today" },
  { recipient: "daan@vantagerealty.nl", subject: "Here's that pricing breakdown", status: "Clicked", date: "Yesterday" },
  { recipient: "karen@acmelogistics.com", subject: "See you tomorrow at 2pm", status: "Sent", date: "Yesterday" },
  { recipient: "unknown@borealishealth.org", subject: "Re: speaking with a specialist", status: "Sent", date: "2 days ago" },
];

export function EmailTab() {
  return (
    <DataTable
      columns={["Recipient", "Subject", "Status", "Date"]}
      rows={EMAILS.map((e) => [
        e.recipient,
        e.subject,
        <Badge key="status" variant={e.status === "Sent" ? "secondary" : "default"} className="gap-1">
          {e.status === "Clicked" ? <MousePointerClick className="w-3 h-3" /> : e.status === "Opened" ? <MailOpen className="w-3 h-3" /> : <Mail className="w-3 h-3" />}
          {e.status}
        </Badge>,
        e.date,
      ])}
    />
  );
}
