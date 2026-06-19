import {
  FileText,
  Presentation,
  Swords,
  HelpCircle,
  Tag,
  Video,
  MessageSquareText,
  Mail,
  MailOpen,
  MousePointerClick,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/dashboard/data-table";

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
            <Icon className="w-4 h-4 text-indigo-600 shrink-0" />
            <p className="text-sm text-foreground flex-1">{item.name}</p>
            <Badge variant="secondary">{item.type}</Badge>
            <span className="text-xs text-muted-foreground w-20 text-right">{item.updated}</span>
          </div>
        );
      })}
    </div>
  );
}

const GUIDES = [
  { name: "Objection handling", description: "Reframe common pricing, timing, and competitor objections without sounding defensive." },
  { name: "Pricing questions", description: "How to talk about plans and ROI before a visitor sees a number." },
  { name: "Booking a demo", description: "The exact ask, fallback offers, and how to handle calendar conflicts." },
  { name: "Technical deep-dive escalation", description: "When and how to hand off to a solutions engineer." },
];

export function GuidesTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {GUIDES.map((g) => (
        <div key={g.name} className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1.5">
            <MessageSquareText className="w-4 h-4 text-indigo-600" />
            <p className="text-sm font-medium text-foreground">{g.name}</p>
          </div>
          <p className="text-xs text-muted-foreground">{g.description}</p>
        </div>
      ))}
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
