import { NextRequest, NextResponse } from "next/server";

const VAPI_API_URL = "https://api.vapi.ai/assistant";

export async function POST(request: NextRequest) {
  console.log('🤖 VAPI agent creation API called');
  
  const vapiApiKey = process.env.NEXT_PUBLIC_VAPI_API_KEY;
  if (!vapiApiKey) {
    console.error('❌ VAPI API key not configured');
    return NextResponse.json(
      { error: "VAPI API key not configured. Add NEXT_PUBLIC_VAPI_API_KEY to .env.local." },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { prompt, agentId } = body;
    console.log('📝 VAPI request received:', { agentId, hasPrompt: !!prompt });

    if (!prompt?.trim()) {
      console.error('❌ Missing prompt in request');
      return NextResponse.json(
        { error: "Missing or empty prompt in request body" },
        { status: 400 }
      );
    }

    // Create VAPI assistant
    console.log('🚀 Creating VAPI assistant...');
    const vapiResponse = await fetch(VAPI_API_URL, {
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
      console.error('❌ VAPI API error:', { 
        status: vapiResponse.status, 
        statusText: vapiResponse.statusText,
        error: errorText,
        headers: Object.fromEntries(vapiResponse.headers.entries())
      });
      return NextResponse.json(
        { error: "VAPI API request failed", details: errorText },
        { status: vapiResponse.status >= 500 ? 502 : 400 }
      );
    }

    let vapiData;
    try {
      vapiData = await vapiResponse.json();
      console.log('✅ VAPI assistant created:', { 
        id: vapiData.id, 
        name: vapiData.name 
      });
    } catch (parseError) {
      console.error('❌ Failed to parse VAPI response as JSON:', parseError);
      console.error('❌ Raw response text:', errorText);
      return NextResponse.json(
        { error: "VAPI API returned invalid response", details: "Expected JSON but received HTML" },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      assistantId: vapiData.id,
      name: vapiData.name,
    });

  } catch (error) {
    console.error('💥 VAPI agent creation error:', error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
