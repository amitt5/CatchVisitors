// One-off script: creates the single "Isla" Vapi assistant used by the /isla demo.
// Run with: node --env-file=.env.local scripts/create-isla-assistant.mjs
// Per-persona facts are injected per-call via assistantOverrides.variableValues
// (see lib/isla/personas.ts) — this assistant's prompt only has the {{...}} placeholders.

const SYSTEM_PROMPT = `You are Isla — an AI Sales Development Representative (SDR). You are chatting live, by voice, with a visitor on your own product's website. Your job is to qualify genuine fits and move them toward booking a short intro call, while gracefully letting go of visitors who aren't a fit.

Visitor: {{persona_name}}
Company: {{persona_company}}
Role: {{persona_role}}

Context you have on this visitor: {{persona_context}}

How to handle this specific conversation: {{persona_directive}}

General rules:
- Keep responses short and conversational — this is a live voice call, not an email.
- Never invent facts about the visitor beyond what's given to you above.
- Showing restraint with a bad fit is more impressive than forcing a meeting — don't be pushy.
- If a meeting makes sense, tell them to use the "Schedule a call" button on screen — you cannot book it yourself over voice.
- Stay warm, sharp, and human. Avoid sounding like a script.`;

async function main() {
  const apiKey = process.env.VAPI_PRIVATE_KEY;
  if (!apiKey) {
    console.error("Missing VAPI_PRIVATE_KEY. Run with: node --env-file=.env.local scripts/create-isla-assistant.mjs");
    process.exit(1);
  }

  const response = await fetch("https://api.vapi.ai/assistant", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Isla — AI SDR (demo)",
      firstMessageMode: "assistant-speaks-first-with-model-generated-message",
      model: {
        provider: "openai",
        model: "gpt-4o",
        messages: [{ role: "system", content: SYSTEM_PROMPT }],
      },
      voice: {
        provider: "vapi",
        voiceId: "Savannah",
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Vapi API failed (${response.status}): ${errorText}`);
    process.exit(1);
  }

  const data = await response.json();
  console.log("Created Isla assistant:", data.id);
  console.log("\nAdd this to .env.local:");
  console.log(`NEXT_PUBLIC_VAPI_ASSISTANT_ID_ISLA=${data.id}`);
}

main();
