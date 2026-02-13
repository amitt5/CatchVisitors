import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { assistantId, input, previousChatId } = await request.json();

    if (!assistantId || !input) {
      return NextResponse.json(
        { error: "assistantId and input are required" },
        { status: 400 }
      );
    }

    const vapiApiKey = process.env.VAPI_PRIVATE_KEY;
    if (!vapiApiKey) {
      return NextResponse.json(
        { error: "VAPI API key not configured" },
        { status: 500 }
      );
    }

    const body: any = {
      assistantId,
      input,
    };

    if (previousChatId) {
      body.previousChatId = previousChatId;
    }

    const response = await fetch("https://api.vapi.ai/chat", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${vapiApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Vapi chat API error:", errorText);
      return NextResponse.json(
        { error: `Vapi chat failed: ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error("Error in vapi-chat route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
