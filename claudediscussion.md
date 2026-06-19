i am thinking for the demo I can have 5 personas. so I can select on any persona for demo. before that i show the data i have in crm. so for demo  based on the persona, the ai agent responds accordingly.
18 Jun

That's a clean demo structure and it directly mirrors how Qualified actually pitches this (their own marketing page is built the same way: five named use cases, each with a different visitor type and a different scripted outcome). A few things worth nailing down before you build, since these are the parts that'll make or break a hackathon judge's read on it.

Persona selection should feel like "logging in as a visitor," not a settings dropdown. The strongest version of this demo is: judge picks a persona card (with a face/company logo, name, role), that simulates "this person just landed on the site," and then the chat widget opens already knowing who they are, exactly like Piper's real greetings ("Welcome back, Jen! Looks like you received Kyle's email"). The CRM view beforehand is your setup, the persona switch is your "watch the magic" moment, and the chat is your payoff. That order (CRM first, then persona picker, then live chat) is exactly right and mirrors how Qualified's own demo videos are sequenced.

Your five personas should each force a different code path in the agent, not just a different name. Based on the real use cases: a brand new anonymous visitor with zero CRM history (agent has to qualify them cold and decide whether to create a new lead), a known lead who just opened a nurture email (agent references the specific content they engaged with), a high-intent visitor caught on the pricing page (agent pushes straight to booking), a VIP with an open opportunity (agent skips qualifying entirely and routes to the named rep), and someone who chats but isn't a fit (agent should gracefully disqualify rather than pushing a meeting, since showing restraint is actually a more impressive demo beat than always converting). If all five personas converge on "great, let's book a meeting," judges will clock it as a single scripted path wearing five costumes.

The mechanism for "agent responds accordingly" matters for how convincing this looks. The cleanest implementation is a system prompt per persona built from their CRM row, not five different system prompts you wrote by hand. So your flow is: persona selected → pull their account/contact/visit data from Supabase → assemble that into context → inject into the LLM call → same agent logic, different injected facts. That's also closer to how the real product actually works (data-driven personalization, not branching scripts) and it's less work for you since you write one agent, not five.

One thing to decide now: do you want the persona switch to also visibly update the CRM screen in real time (e.g., a new "conversation" row appears, status changes to "meeting booked"), so the judges see the write-back loop too? That's a nice closing beat if you have time, but it's the first thing to cut if you're behind schedule.

ok for the features and demo i am thining this
1) it is connected to a CRM (hubspot). so it connects the digitar signature of visitor with data in CRM. also keeps track of conversations and learnings. updates CRM
2) Voice AI SDR - which visitor can talk to. SDR helps set up meetings
3) dashbaord: user can set up agent - selct name, voice, color scheme. add contents (marketing content, customer stories, competitive intel, product positioning), guides, (text based instruction manual for the agent), see recent interactions for eahc visitor and other details

so in a demo i show - how users can setup an agent, connect with their crm, see how the agent has been working, and then show the agent in cation

what do you think?
21:13

This is a strong scope. Genuinely differentiated from a basic chatbot demo because you're showing the full loop: setup → CRM sync → agent in action → results visible back in the dashboard. A few honest thoughts on each piece:

What's strong about this plan

The agent setup screen (name, voice, color, content upload) is a great opening demo beat because it's immediately tangible. Judges understand "this is configuring an AI employee" without needing explanation. The fact that you can drop in competitive intel and customer stories as context is actually a meaningful differentiator — most hackathon AI demos skip the RAG/knowledge layer entirely and it shows. Starting with setup also buys you a natural narrative arc: "first you configure it, then you deploy it, then watch what it does."

The CRM integration story is your most impressive claim and also your biggest risk. Saying "it reads and writes HubSpot" is a powerful statement for a B2B audience. But for a hackathon demo you need to decide upfront: are you doing a real live HubSpot OAuth connection, or simulating it with seeded data? Real connection = impressive but fragile under demo conditions. Seeded fake CRM data = reliable but you have to make it look real enough that judges don't feel cheated. Given your time constraint, the pragmatic call is seeded data with the HubSpot logo and field names, built so it looks and feels native. You can always say "and here's where you'd connect your actual HubSpot" without needing it live.

The one thing I'd sharpen

Right now the three pieces (CRM, Voice SDR, Dashboard) feel like three separate features. For a hackathon pitch, you want them to feel like one story with three chapters. The thread connecting them is the visitor journey: visitor lands → agent identifies them from CRM → voice conversation happens → dashboard captures outcome → CRM gets updated. If you demo in that sequence, the three features feel inevitable rather than additive.

The voice piece is your wow moment — protect it

Voice AI in a live demo is high-risk/high-reward. The thing that could go wrong is latency or a cold start on stage. Worth thinking about: do you demo voice live, or do you have a pre-recorded fallback of a clean voice conversation you can play if the live demo misbehaves? Having the fallback doesn't mean you won't go live, it means you're not sweating it.

What I'd cut if time gets tight

Color scheme customization is the first thing to drop. It's a nice-to-have but judges don't care about brand colors, they care about intelligence. Spend that time making the agent's personalized greeting land harder instead.

One thing worth adding if you have time

A live "visitor is on your site right now" feed in the dashboard — even just a pulsing dot with company name and current page — is a single UI component but it's the most visceral way to show the CRM-to-website connection working in real time. Qualified leans heavily on this in their own demos because it makes the invisible (anonymous web traffic) suddenly feel known and actionable.


yeah I'll just show CRM integration and color scheme etc - that its possible. ofcourse not show it working. for working i'll only show the voice ai agent in action. And then may be the call being recorded and meeting set up. May be also show me receiving an email after a meeting is setup
21:15

Perfect scope for a hackathon. You've essentially split it into "here's what the platform can do" (shown as UI/screenshots) and "here's the magic working live" (voice agent → call recorded → meeting booked → email received). That's a clean two-act demo.

The live demo sequence you're describing is actually a complete story arc:

Visitor lands → voice agent identifies them (personalized greeting using their "CRM data") → conversation happens → agent books a meeting → you receive a confirmation email on stage. That last beat — your phone buzzing or email landing live — is a genuinely great closing moment. Judges see the full output, not just a chat window.

A few things to nail for that to land cleanly:

The personalized greeting is everything. The first 5 seconds of the voice conversation need to immediately signal "this agent knows who I am." Something like "Welcome back, [name], I saw you were looking at our pricing page — are you ready to explore options?" establishes the CRM connection without you having to explain it.

The meeting booking needs to feel instant. When the agent says "let me find a time for you" and a calendar slot appears (or a confirmation email lands) within seconds, that's the wow. Any lag there kills the moment. Cal.com has a decent API if you want real booking without building calendar infrastructure from scratch.

The email after booking is your curtain call. Keep it on screen — ideally you're showing the demo on a laptop and your email client is open in another tab, so you can flip to it live. Even better if the email references the conversation ("Following up on your interest in pricing, here's what we discussed...").

One practical thing: rehearse the voice conversation at least 10 times with the exact persona you're going to use on stage. VAPI can be unpredictable with background noise in a busy hackathon room. Know exactly what you're going to say to the agent so you're not improvising under pressure while also pitching.

