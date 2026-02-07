export async function createVapiAssistant(prompt: string, agentId: string) {
  const vapiApiKey = process.env.VAPI_PRIVATE_KEY;
  if (!vapiApiKey) {
    throw new Error("VAPI API key not configured");
  }

  const vapiResponse = await fetch("https://api.vapi.ai/assistant", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${vapiApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: {
        provider: "openai",
        model: "gpt-4o",
        knowledgeBase: {
          provider: "openai",
          model: "gpt-4o"
        }
      },
      name: `Agent ${agentId}`,
      instructions: prompt,
      voice: {
        provider: "11labs",
        voiceId: "rachel"
      },
      firstMessage: "Hello! How can I help you today?",
      serverUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/vapi-webhook`,
      serverUrlPath: `/api/vapi-webhook`,
      serverUrlSecret: process.env.VAPI_WEBHOOK_SECRET,
    }),
  });

  if (!vapiResponse.ok) {
    const errorText = await vapiResponse.text();
    throw new Error(`VAPI API failed: ${errorText}`);
  }

  return await vapiResponse.json();
}