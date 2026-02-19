# Health4Life Chiropractic — Missing Content Brief for Claude Code

## PROMPT FOR CLAUDE CODE

You are helping update the Health4Life Chiropractic website at `www.catchvisitors.com/chiro`. 
A full audit has been done comparing the new site to the original at `amsterdamchiropractic.com`. 
Below is all the missing content that needs to be added. 

For each section, implement it using the existing design system and component patterns already in the codebase. Do not change any existing sections — only add what is listed here.

Work through each section in order of priority (marked below). Ask me before creating any new pages if you're unsure whether content should be a new route or added to an existing page.

---

## PRIORITY 1 — Pricing & Insurance (Tarieven/Vergoedingen)

Add a **Pricing section** to the existing page (or create `/prijzen` route if more appropriate). This is the highest-priority missing content as patients look for this before booking.

### Prices (source: original site)

| Treatment | Price |
|---|---|
| Eerste Consult Volwassen (incl. medische acupunctuur + eerste wervelkolom correctie) | € 160 |
| Eerste Consult Kinderen tot 12 jaar | € 110 |
| Vervolg Consult Chiropractie | € 80 |
| Uitgebreid Consult Chiropractie + Medische Acupunctuur | € 130 |
| Diep Tissue Therapie / Massage 30 min | € 70 |
| Diep Tissue Therapie / Massage 60 min | € 120 |
| Orthopedische Inlegzolen (Custom Orthotics) | € 480 |
| Orthopedische Back Vitalizer | € 120 |
| Orthopedische Waterkern Kussen | € 150 |
| Orthopedische Luchtkussen (Neck/Rug) | € 150 |
| High-tech Voet Scan incl. advies | € 120 |
| Behandelplan Opzeggingskosten | € 150 |

**Payment note:** Het verschuldigde bedrag wordt na afloop van elk bezoek vereffend. Betaling mogelijk met contant of pinpas. De kwitantie kunt u indienen bij uw verzekeringsmaatschappij.

### Insurance (Vergoedingen)

Vrijwel alle ziektekostenverzekeraars hebben chiropractie in hun aanvullende pakket opgenomen. Voorwaarde is dat de chiropractor aangesloten is bij een beroepsvereniging (NCA) en ingeschreven staat bij de Stichting Chiropractie Nederland (SCN). Bij de meeste verzekeraars valt chiropractie onder "alternatieve geneeswijzen" of "beweegzorg". Raadpleeg uw polisvoorwaarden of bezoek: www.chiropractievergoeding.nl

**FAQ answer to update:** The existing FAQ question "Is chiropractic covered by Dutch health insurance?" should be answered with: "Yes — almost all Dutch insurers include chiropractic in their supplemental (aanvullende) package, provided the practitioner is registered with the NCA and SCN. Check your policy or visit chiropractievergoeding.nl for a full insurer list."

---

## PRIORITY 2 — Your First Visit / New Patient Info

Add a **"Your First Visit"** section or expandable block (fits naturally near the booking section or as an FAQ expansion). Content:

### Steps on your first visit:

1. **Patient Forms** — Complete health history and condition intake forms upon arrival.

2. **Consultation** — Discuss health problems, concerns, and treatment goals with Dr. Jahani. The first visit is about understanding your condition and what you want to achieve.

3. **Examination** — Full chiropractic exam including reflex and flexibility testing, plus neurological, orthopedic, postural, and physical assessments. Nothing is done without your consent.

4. **X-Ray Studies** — If needed based on your condition, X-rays are taken to develop the most effective treatment plan and check for serious spinal conditions.

5. **Report of Findings** — Dr. Jahani provides a full report covering: How can he help you? How often will you need to come in? What will the cost be?

6. **Treatment** — At the end of the first visit, you can choose to start your first treatment: spinal adjustment, physical therapy, and/or soft tissue massage.

7. **Wellness Program** — Before leaving, Dr. Jahani will suggest a home wellness program which may include: ice/heat instructions, activities to avoid, and home exercises or stretches.

---

## PRIORITY 3 — Dutch Language Condition Pages (Klachten)

The original site has a full Dutch section for conditions. The new site only lists condition names in English. 

**Option A (recommended):** Add a Dutch language toggle (NL/EN) to the site. When NL is selected, show Dutch content.

**Option B (simpler):** Add a dedicated `/klachten` section or page with Dutch content for each condition.

Below are the 12 conditions that need Dutch-language pages/content. For each, the slug and Dutch title are provided — the actual body copy should be written by Claude Code based on standard chiropractic knowledge for each condition.

| Slug | Dutch Title | English equivalent |
|---|---|---|
| `/klachten/lage-rugpijn` | Lage Rugpijn | Lower Back Pain |
| `/klachten/nek` | Nekpijn | Neck Pain |
| `/klachten/hernia` | Hernia / Discushernia | Herniated Disc |
| `/klachten/whiplash` | Whiplash | Whiplash |
| `/klachten/bovenrug-schouder` | Bovenrug & Schouder | Upper Back & Shoulder |
| `/klachten/hoofdpijn-migraine` | Hoofdpijn en Migraine | Headaches & Migraines |
| `/klachten/spanningshoofdpijn` | Spanningshoofdpijn | Tension Headaches |
| `/klachten/zwangerschap` | Zwangerschap | Pregnancy-Related Pain |
| `/klachten/sportblessures` | Sportblessures | Sports Injuries |
| `/klachten/kinderen` | Kinderen | Children's Care |
| `/klachten/baby-s` | Baby's | Infant Care |
| `/klachten/artrose-slijtage` | Artrose / Slijtage | Arthritis & Wear-and-Tear |

Each page should include: what the condition is, how chiropractic helps, and a CTA to book an appointment.

---

## PRIORITY 4 — FAQ Answers (Expand Existing)

The current FAQ has 6 questions but the answers are not visible / collapsed in the live site. Verify all answers are present and add the following content:

**Q: Does chiropractic treatment hurt?**
A: Most patients experience little to no discomfort during an adjustment. You may hear a popping sound — this is simply gas releasing from the joint, similar to cracking your knuckles. Some mild soreness after the first few sessions is normal and typically passes within 24 hours.

**Q: How many sessions will I need?**
A: This depends on your condition. After the first visit, Dr. Jahani will give you a clear treatment plan with an estimated number of sessions. Most acute conditions improve significantly within 4–8 sessions.

**Q: Do I need a referral from my GP?**
A: No. You can book directly without a GP referral.

**Q: What is the difference between neuro-based chiropractic and regular chiropractic?**
A: Neuro-based chiropractic focuses on the relationship between spinal alignment and the nervous system. Rather than just treating symptoms, it targets the root neurological cause of pain and dysfunction for more lasting results.

**Q: Do you treat children and infants?**
A: Yes. Dr. Jahani has experience treating infants and children. The first consultation for children under 12 is €110. Techniques used for younger patients are gentle and specifically adapted.

**Q: Is chiropractic covered by Dutch health insurance?**
A: Almost all Dutch supplemental health insurance plans (aanvullende verzekering) cover chiropractic. Health4Life is registered with the NCA and SCN, which are required by most insurers. Check your policy or visit chiropractievergoeding.nl.

---

## PRIORITY 5 — Fysio-Chiro Combined Therapy

The original site has a dedicated page for this. Add a section or card on the services page:

**Title:** Fysio-Chiro Gecombineerde Therapie

**Content:** An integrated treatment approach combining physiotherapy and chiropractic techniques. Designed for patients with complex or persistent conditions who benefit from both disciplines working together in a coordinated plan. Treatment is tailored per patient and may include manual therapy, targeted exercises, spinal correction, and soft tissue work.

---

## PRIORITY 6 — Vacatures (Job Openings)

Add a simple `/vacatures` page or footer link. Content:

**Title:** Vacatures — Health4Life Chiropractic

**Body:** Currently there are no open vacancies. If you are a qualified chiropractor, physiotherapist, or massage therapist interested in joining our team in Amsterdam Zuid, please send your CV and motivation letter to Dr\_mJahani@yahoo.ca with the subject line "Vacature".

---

## NOTES FOR CLAUDE CODE

- **Do not change** any existing sections (hero, services, about, testimonials, booking widget).
- **Match existing design** — use the same fonts, spacing, color tokens, and component patterns already in the codebase.
- **Dutch content** should render in Dutch. Do not auto-translate Dutch pages to English.
- **Pricing table** should be clean and scannable — consider a card or table layout consistent with the site style.
- The site uses Next.js. Check the existing routing structure before creating new pages.
- If a section is better as an addition to an existing page (e.g., FAQ answers, pricing block) rather than a new route, prefer that approach to keep the single-page feel of the current design.