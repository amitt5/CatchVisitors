import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log('🧪 VAPI agent test API called');
  
  try {
    const body = await request.json();
    const { assistantId } = body;
    
    console.log('📝 Test request received:', { assistantId });

    if (!assistantId?.trim()) {
      console.error('❌ Missing assistant ID');
      return NextResponse.json(
        { error: "Missing assistant ID" },
        { status: 400 }
      );
    }

    // Get VAPI public API key from environment (same as landing page)
    const vapiApiKey = process.env.NEXT_PUBLIC_VAPI_API_KEY;
    if (!vapiApiKey) {
      console.error('❌ VAPI API key not configured');
      return NextResponse.json(
        { error: "VAPI API key not configured. Add NEXT_PUBLIC_VAPI_API_KEY to .env.local." },
        { status: 500 }
      );
    }

    console.log('📞 Preparing VAPI test call configuration for assistant:', assistantId);

    // Return configuration for client-side VAPI SDK (like landing page)
    return NextResponse.json({
      success: true,
      assistantId: assistantId,
      apiKey: vapiApiKey,
      message: "Test configuration prepared. Use VAPI SDK on client-side to start the call.",
      config: {
        assistantId: assistantId,
        metadata: {
          testCall: true,
          source: "catch-visitors-dashboard",
        },
      }
    });

  } catch (error) {
    console.error('💥 VAPI test error:', error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
