import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const vapiKey = process.env.VAPI_API_KEY;
  if (!vapiKey) {
    return NextResponse.json(
      { error: "VAPI API key not configured. Add VAPI_API_KEY to .env.local." },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { demoId, formattedData } = body;

    if (!demoId || !formattedData) {
      return NextResponse.json(
        { error: "Missing demoId or formattedData" },
        { status: 400 }
      );
    }

    // Build the dynamic prompt using your template
    const prompt = buildVapiPrompt(formattedData);

    // Create or update VAPI assistant
    const assistantData = {
      name: `${formattedData.FIRM_NAME} Assistant`,
      model: {
        provider: "openai",
        model: "gpt-4o",
        temperature: 0.7,
        maxTokens: 1000,
      },
      voice: {
        provider: "elevenlabs",
        voiceId: "rachel", // Default voice, can be customized
      },
      firstMessage: "Hello! I'm here to help you learn about our services. What questions can I answer for you today?",
      prompt: {
        content: prompt,
      },
      serverUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/vapi-webhook`,
      serverUrlSecret: process.env.VAPI_WEBHOOK_SECRET || "your-webhook-secret",
    };

    // Create the assistant
    const assistantResponse = await fetch("https://api.vapi.ai/assistant", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${vapiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(assistantData),
    });

    if (!assistantResponse.ok) {
      const errorText = await assistantResponse.text();
      console.error("VAPI assistant creation failed:", errorText);
      return NextResponse.json(
        { error: "Failed to create VAPI assistant", details: errorText },
        { status: 500 }
      );
    }

    const assistant = await assistantResponse.json();

    // Store the assistant ID in Supabase
    const supabase = createServerSupabaseClient();
    const { error: updateError } = await supabase
      .from("demos")
      .update({ 
        vapi_assistant_id: assistant.id,
        vapi_assistant_data: assistant 
      })
      .eq("id", demoId);

    if (updateError) {
      console.error("Failed to update demo with VAPI assistant ID:", updateError);
      // Don't fail the request, just log it
    }

    // Create a phone number for the assistant (optional)
    const phoneResponse = await fetch("https://api.vapi.ai/phone-number", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${vapiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        assistantId: assistant.id,
        areaCode: "555", // You can customize this
      }),
    });

    let phoneNumber = null;
    if (phoneResponse.ok) {
      const phoneData = await phoneResponse.json();
      phoneNumber = phoneData.number;
      
      // Store phone number in Supabase
      await supabase
        .from("demos")
        .update({ vapi_phone_number: phoneNumber })
        .eq("id", demoId);
    }

    return NextResponse.json({
      success: true,
      assistantId: assistant.id,
      phoneNumber,
      // For web demo, we'll use the assistant ID directly
      webConfig: {
        assistantId: assistant.id,
        apiKey: vapiKey, // Note: In production, you might want to use a more secure approach
      }
    });

  } catch (error) {
    console.error("VAPI API error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

function buildVapiPrompt(data: any): string {
  const services = Array.isArray(data.services) ? data.services.join(", ") : data.services || "—";
  const locations = Array.isArray(data.locations) ? data.locations.join(", ") : data.locations || "—";
  const typicalClients = Array.isArray(data.Typical_clients) 
    ? data.Typical_clients.join(", ") 
    : data.Typical_clients || "—";

  return `You are a friendly and professional AI assistant for ${data.FIRM_NAME}, located at ${locations}.

About the firm:
${data.FIRM_NAME} specializes in ${data.PRACTICE_AREAS}.

${data.SCRAPED_WEBSITE_DATA}

Services offered: ${services}

Typical clients include: ${typicalClients}

Your role:
1. Answer visitor questions about the firm's services in a warm, conversational manner
2. After answering 2-3 questions, proactively offer to schedule a consultation
3. If they're interested in booking, collect: their name, email or phone, preferred time/date, and a brief description of their situation

Guidelines:
- Keep responses natural and concise (2-3 sentences unless they need more detail)
- Don't overwhelm with information - answer what they ask
- Be honest if you don't know something specific
- Sound human, not robotic

When offering to book:
Say something like: "I'd be happy to schedule a consultation for you to discuss this further with our team. Would that be helpful?"

When collecting booking details:
- Ask for one piece of information at a time
- Confirm their preferred date/time
- Ask them to briefly describe their situation so the lawyer can prepare`;
}
