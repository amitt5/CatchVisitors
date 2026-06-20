// Scripted demo Q&A. Clicking a question shows the fixed answer in the widget
// and "presents" the matching section on the relevant product page.

export interface ScriptedQuestion {
  id: string;
  question: string;
  answer: string;
  route: string;
  sectionId: string;
  /** After answering, offer to book a meeting (shows Yes / Not now). */
  offerMeeting?: boolean;
}

export const SCRIPTED_QUESTIONS: ScriptedQuestion[] = [
  {
    id: "email-followup",
    question: "How does Isla follow up with leads over email?",
    answer:
      "The moment a high-intent lead asks to connect, I send an immediate, personalized AI email — cutting response time from days to minutes. Let me show you.",
    route: "/product/email",
    sectionId: "email-followup",
  },
  {
    id: "email-reply",
    question: "Can Isla reply to emails automatically?",
    answer:
      "Yes. When a buyer replies, I tap into my knowledge base to generate a contextual answer that keeps the conversation moving — no human needed. Here's how it works.",
    route: "/product/email",
    sectionId: "email-reply",
  },
  {
    id: "meetings-forms",
    question: "How does Isla book meetings?",
    answer:
      "When a qualified buyer submits a form or clicks a CTA, I invite them to grab a time on the spot and book it straight onto your rep's calendar. Take a look.",
    route: "/product/meetings",
    sectionId: "meetings-forms",
  },
  {
    id: "meetings-livechat",
    question: "Can Isla book a meeting during a live chat?",
    answer:
      "Absolutely — I can serve a meeting booker right inside the conversation and lock in the next meeting before the buyer leaves the site. Let me walk you through it.",
    route: "/product/meetings",
    sectionId: "meetings-livechat",
  },
  {
    id: "offers-serve",
    question: "What kind of offers can Isla present?",
    answer:
      "I audit your entire content library and surface the single best piece for each buyer based on where they are in their journey. Here's what that looks like.",
    route: "/product/offers",
    sectionId: "offers-serve",
  },
  {
    id: "offers-committee",
    question: "Can Isla nurture the whole buying committee?",
    answer:
      "Yes. B2B buying involves many stakeholders, so I serve personalized content to each person on the account to tailor their experience. Let me show you.",
    route: "/product/offers",
    sectionId: "offers-committee",
  },
  {
    id: "slack-overview",
    question: "Does Isla work with Slack?",
    answer:
      "I do — I work right inside Slack, just like one of your teammates. You can ask me anything and I'll respond in your most important work channel. Here's the overview.",
    route: "/product/slack",
    sectionId: "slack-overview",
  },
  {
    id: "slack-sales",
    question: "How does Isla help sales teams in Slack?",
    answer:
      "I give reps instant access to everything they need to perfect their first call — lead summaries, account context, and intent — right in Slack. Let me show you.",
    route: "/product/slack",
    sectionId: "slack-sales",
  },
  {
    id: "pricing",
    question: "How much does Isla cost?",
    answer:
      "We customize pricing to fit your needs, so talking to our sales team will get you the most accurate details. Would you like to set up a meeting?",
    route: "/pricing",
    sectionId: "pricing-top",
    offerMeeting: true,
  },
];
