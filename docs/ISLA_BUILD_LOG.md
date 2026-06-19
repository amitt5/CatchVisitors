# Isla — Hackathon Build Log

Branch: `isla` · Started: 2026-06-19 · Status: **core demo built and verified working**

## Background

User is repurposing this repo (CatchVisitors) for a same-day hackathon by cloning the
demoable parts of [Qualified.com](https://www.qualified.com)'s "Piper" AI SDR product.
Full Qualified research (features, pricing tiers, visual design, what's realistically
copyable in a few hours) is in `docs/QUALIFIED_RESEARCH.md`.

The new product is called **Isla** ("Inbound Sales & Lead Agent"). Visual style is meant
to look like Qualified's marketing site: dark navy background (`#0B0E14`), bold sans-serif
headlines, pill-shaped accent-colored CTA buttons, glassmorphism/glow cards.

## Scope decisions (locked in via discussion before building)

These were explicit user choices — don't silently change them without asking:

1. **New isolated route** at `/app/isla/`. Existing demos (`/hotels`, `/chiro`, `/navank`,
   `/strategence`) are untouched.
2. **Only the live voice conversation is real.** Everything else (CRM, Agent Setup,
   Content Library) is a static UI mockup — not wired to any backend, not persisted.
3. **Booking + "meeting confirmed" beat is fully simulated** — no real Cal.com integration,
   no real email sent. Just an on-screen confirmation card inside the voice widget.
4. **CRM screens are static** (no live data fetching), styled to look like HubSpot
   (orange `#FF7A59` accent), but live inside Isla's own dashboard chrome rather than
   literally cloning HubSpot's UI.

## The centerpiece mechanism

One Vapi assistant, one system prompt template with `{{persona_name}}`,
`{{persona_company}}`, `{{persona_role}}`, `{{persona_context}}`, `{{persona_directive}}`
placeholders, and a different `assistantOverrides.variableValues` payload injected at
call start per persona (`vapi.start(assistantId, { variableValues })`). Five visitor
personas → five genuinely different conversations from the same agent, not five
hand-scripted scripts. This is also the existing pattern already used elsewhere in this
repo at `app/(dashboard)/agent/[id]/page.tsx:246`.

## What was built

| Path | Purpose |
|---|---|
| `lib/isla/personas.ts` | Single source of truth for the 5 personas — CRM fields, greeting banner, and the `vapiVariableValues` injected into the agent |
| `scripts/create-isla-assistant.mjs` | One-off script that created the Vapi assistant (`NEXT_PUBLIC_VAPI_ASSISTANT_ID_ISLA` in `.env.local`). Re-run with `node --env-file=.env.local scripts/create-isla-assistant.mjs` only if the assistant needs recreating |
| `components/isla/isla-voice-widget.tsx` | The live voice widget: Vapi Web SDK call lifecycle, transcript rendering, mute/end-call controls, simulated booking sub-flow (day → time slot → confirmation) |
| `components/isla/isla-dashboard-nav.tsx` | Shared light-theme nav for the static dashboard pages (Setup / Content / CRM / Live Demo tabs) |
| `app/isla/page.tsx` | Switchboard home — dark hero, Act 1 (platform) / Act 2 (live demo) sections |
| `app/isla/setup/page.tsx` | Static agent config mockup (name, voice picker, brand color swatches) — client-side only, "Save" just shows a toast |
| `app/isla/content/page.tsx` | Static content-library mockup with tabs (Marketing / Customer Stories / Competitive Intel / Positioning / Guides) |
| `app/isla/crm/page.tsx` | Static HubSpot-styled contacts table, reuses `personas.ts` so it never drifts from the live demo data |
| `app/isla/live/page.tsx` | Persona picker — 5 cards |
| `app/isla/live/[personaId]/page.tsx` | Simulated B2B SaaS landing page with the voice widget auto-opening, plus a banner showing what Isla "already knows" about that visitor |

## The 5 personas (`lib/isla/personas.ts`)

1. **Cold anonymous visitor** — no CRM record. Agent qualifies cold, no name to use.
2. **Jen Patel** (Brightwave Co, Marketing Ops Lead) — MQL, opened a nurture email 2 days
   ago. Agent references that specific email.
3. **Marcus Chen** (Lumio, Head of RevOps) — SQL, 3rd visit this week, on the pricing page.
   Agent skips small talk, pushes straight to booking.
4. **Sarah Whitfield** (Northstar Logistics, VP Sales) — open $85k opportunity owned by
   Alex Rivera (AE). Agent skips qualifying entirely, offers to loop Alex in directly.
5. **Tom Becker** (Tinkerly, solo founder) — bad fit (too small/early). Agent gracefully
   disqualifies instead of pushing a meeting — the "showing restraint" beat.

## Bugs found and fixed during build/test

1. **500 error on every `/isla` page** — the Clerk middleware (`middleware.ts`) only
   allow-lists specific public routes; `/isla` wasn't in it, so unauthenticated requests
   hit a redirect path with a pre-existing header-immutability bug. Fixed by adding
   `"/isla(.*)"` to `isPublicRoute` in `middleware.ts`.
2. **Global floating voice widget overlapping the Isla widget** — `floating-voice-widget.tsx`
   excludes itself on `/hotels`, `/chiro`, `/navank`, `/strategence`, `/steel` but not
   `/isla`. Added `/isla` to that exclusion list.
3. **Vapi voice `11labs`/`rachel` failed** (`Couldn't Find 11labs Voice` — needs an
   account-linked credential). Switched to a Vapi-provided built-in voice
   (`provider: "vapi"`, `voiceId: "Savannah"`) which needs no external account.
4. **Transcript stuttering/duplication** — the hotel widget's prefix-matching transcript
   dedup heuristic (copied as a starting point) doesn't generalize to the assistant's TTS
   captions and produced garbled repeated text. Replaced with logic that tracks
   `message.transcriptType === "final"` to know when an utterance bubble is "closed" vs.
   still being updated by partials.

## Verified working

- All 5 persona live pages return 200 and render.
- A full real Vapi call was tested end-to-end in a headless browser (fake mic permissions):
  the call connects, and the VIP persona's opening line correctly referenced "Sarah",
  "Northstar Logistics", and "Alex Rivera sent you a proposal" — confirming the
  `assistantOverrides.variableValues` injection actually drives the agent's behavior, not
  just cosmetic UI.
- `tsc --noEmit` clean on all new files.
- Screenshots of every screen saved under `screenshots/isla-*.png`.

## Not done / explicitly out of scope for the hackathon

- No real HubSpot connection, no real Cal.com booking, no real email sending — all
  deliberately simulated per the scope decisions above.
- Agent Setup / Content Library pages don't persist anything (by design).
