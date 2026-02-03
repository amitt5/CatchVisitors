import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  console.log('🎙️ VAPI prompt storage API called');
  
  try {
    const body = await request.json();
    const { demoId, prompt } = body;
    console.log('📝 VAPI request received:', { demoId, hasPrompt: !!prompt, promptLength: prompt?.length });

    if (!demoId || !prompt) {
      console.error('❌ Missing required parameters:', { demoId: !!demoId, prompt: !!prompt });
      return NextResponse.json(
        { error: "Missing demoId or prompt" },
        { status: 400 }
      );
    }

    const supabase = createServerSupabaseClient();
    
    // Store only the Gemini prompt (assistant ID comes from env)
    console.log('💾 Storing Gemini prompt in database...');
    const { error: updateError } = await supabase
      .from("demos")
      .update({ 
        gemini_prompt: prompt
      })
      .eq("id", demoId);

    if (updateError) {
      console.error('❌ Failed to update demo with Gemini prompt:', updateError);
      return NextResponse.json(
        { error: "Failed to save prompt", details: updateError.message },
        { status: 500 }
      );
    }

    console.log('✅ Gemini prompt stored successfully');
    return NextResponse.json({
      success: true,
      message: "Gemini prompt stored successfully.",
      demoId,
    });

  } catch (error) {
    console.error('💥 VAPI prompt API error:', error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
