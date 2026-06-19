# Qualified.com — Research Notes (for hackathon repurposing)

Source: https://www.qualified.com/ (and subpages: /platform, /pricing, /piper, /conversations, /signals)
Fetched: 2026-06-19

## What Qualified Is

B2B "agentic marketing" platform. Core product is **Piper**, an AI SDR (Sales Development Rep) agent
that engages website visitors and converts them into sales pipeline — autonomously, across channels.
Pitched as a replacement/augmentation for human SDR teams. Enterprise B2B SaaS customers (Sinch, LogicMonitor,
Unisys, Emburse). 500+ companies use Piper. Deep Salesforce integration is central to the pitch.

This is the same general shape as CatchVisitors (AI voice/chat agent on a website) but B2B-sales-flavored
instead of B2C-booking-flavored, with much heavier emphasis on **visitor identification, intent data, and
CRM routing** rather than booking/calendar flows.

## Core Product: Piper (AI SDR Agent)

Channels Piper operates across:
- **Conversations** — real-time chat/voice/video on the website
- **Email** — automated nurture & follow-up
- **Meetings** — instant calendar scheduling
- **Offers** — personalized content delivery (whitepapers, case studies, etc. served contextually)
- **Slack** — reps get notified / can jump into conversations from Slack

Solution packaging (same engine, different funnel stage):
- **Agentic Nurture** — top-of-funnel lead handling
- **Agentic Product-Led Growth (PLG)** — converting free-trial users
- **Outbound**
- **Account-Based Marketing (ABM)**

## How the Chat Widget Behaves (most copy-able part)

- **Proactive greeting**, not just "click to chat" — Piper initiates based on who's visiting:
  - Target account detected → custom message referencing their company
  - Known open opportunity / existing pipeline contact → contextual message
  - Traffic source aware — e.g. "Looks like you saw our Concur ad on LinkedIn"
  - Example greeting: *"Hi Jen! Piper the AI SDR Agent, here. Interested in making the switch from Concur?"*
  - Example greeting: *"Hi there, Asana team! 👋 Piper here. Looks like you saw our Concur ad on LinkedIn. What questions can I answer for you today?"*
- Widget supports **toggling voice** mid-conversation (text → voice without losing context)
- Can **escalate to a human rep** mid-chat
- Can **route directly to the visitor's assigned sales rep**, or book a meeting on the spot
- Gives visitors a "guided tour" of the website (contextual navigation, not just Q&A)

## "Signals" — Visitor/Account Intelligence (the data layer behind the personalization)

This is what makes the proactive greeting possible. Two kinds of intent:
- **Engagement intent (1st-party)**: which accounts are browsing the site right now, which pages/products they look at
- **Research intent (3rd-party)**: external signals that a company is "in-market" even before they visit

Three surfaces for this data:
1. **Account Trend Report** — dashboard of buying intent across all tracked accounts, filterable by tier/owner/industry
2. **Account 360** — single profile per account: activity timeline + a graph of "intent over time" with notable-activity markers
3. **Alerts** — mobile/email push when an account's intent trends up or down, so reps know when to reach out

All of this is the kind of thing that, in a hackathon, you'd fake/simplify rather than build for real (no real CRM, no real ad-network attribution) — but the **UI pattern** (account timeline + intent graph + alert feed) is very demoable.

## Platform Architecture (their internal framing — useful as a feature checklist)

1. **Agent Context** — lead/account data, segmentation, routing rules, qualification criteria
2. **Agent Onboarding** — knowledge base ingestion: marketing content, case studies, competitive info, product docs
3. **Agent Guidance** — goals, guardrails, engagement rules
4. **Agent Actions** — actually executing outreach across website + email using live GTM data
5. **Agent Optimization** — feedback loop, reviewing agent transcripts and tuning messaging

There's also an **"Agent Spotlight" dashboard**: a single view combining CRM data, buying stage, intent signals,
website activity, and email engagement per lead/account — basically a unified visitor/lead profile page.

## Pricing Tiers (no $ shown publicly, demo-gated)

- **Premier**: video/voice/text conversations, meeting scheduling, AI-generated emails, marketing offers, Slack collab, SSO, multi-language agent
- **Enterprise**: + enterprise APIs, custom data retention, 3rd-party intent signals, Salesforce sandbox, multi-site/multi-brand
- **Ultimate**: + multiple agent profiles, multiple production instances, high-volume sites/databases

## Integrations Mentioned

Salesforce (core/deep), HubSpot, Marketo, Eloqua, Outreach, Salesloft, Gong, Slack, Demandbase, 6sense

## Social Proof / Positioning Devices (for landing-page copying)

- "1,800+ five-star reviews", logos of 50+ customers
- Customer metric callouts (e.g. "6x SDR efficiency")
- Award badges: #1 Salesforce AppExchange, G2 Best Software, Forrester Wave Leader
- Resource hub: "Qualified University" courses, "AI SDR Playbook", "Agentic Marketing Report", own conference ("Piperfest")

## What's realistically copyable for a hackathon, mapped to what we already have

We already have: a voice/chat widget (Vapi-based), industry landing pages (hotels/chiro/navank), a dashboard
shell (agent/calls/settings), and a chat-sessions DB table. Qualified-style features that map cleanly onto
that foundation:

- **Proactive personalized greeting** — instead of generic "Hi, how can I help", open with something that
  references how the visitor arrived (referrer/UTM) or what page they're on. Cheap to fake convincingly.
- **Visitor/Account intel panel** — a simple "who's on your site right now" + per-visitor activity timeline,
  styled like Qualified's Account 360. Can be mocked with session/page-view data we already log.
- **Voice ⇄ text toggle mid-conversation** — we already support both modes separately; merging them into one
  live toggle is a believable, demo-worthy feature.
- **"Hand off to human" / escalate** — UI affordance even if the backend just simulates a handoff.
- **Meeting scheduling inline in chat** — we already built a calendar/booking flow for hotels; repurpose it as
  "book a sales call" instead of "book a room."
- **Lead/Account dashboard** — repurpose the existing `(dashboard)` routes (agent/calls/settings) into a
  Qualified-style "Conversations + Accounts + Signals" dashboard.
- **Intent "signal feed"** — a fake-but-plausible activity stream (visitor viewed pricing page, returned 3rd
  time this week, etc.) feeding the proactive greeting — good demo narrative even without real intent data.

Not realistic for a hackathon: real Salesforce sync, real 3rd-party intent data, multi-tenant agent profiles,
enterprise SSO. Skip these or stub them as "coming soon."
