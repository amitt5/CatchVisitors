import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  console.log('🔍 Get prompt API called');
  
  try {
    const body = await request.json();
    const { assistantId } = body;
    console.log('📝 Request received:', { assistantId });

    if (!assistantId) {
      console.error('❌ Missing assistantId');
      return NextResponse.json(
        { error: "Missing assistantId" },
        { status: 400 }
      );
    }

    const supabase = createServerSupabaseClient();
    
    // Get the most recent demo with a Gemini prompt (since we use the same assistant for all)
    console.log('🔍 Searching for most recent Gemini prompt...');
    const { data, error } = await supabase
      .from("demos")
      .select("gemini_prompt")
      .not("gemini_prompt", "is", null)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error('❌ Database error:', error);
      return NextResponse.json(
        { error: "Database error", details: error.message },
        { status: 500 }
      );
    }

    if (!data || !data.gemini_prompt) {
      console.log('⚠️ No Gemini prompt found');
      return NextResponse.json(
        { error: "No Gemini prompt found" },
        { status: 404 }
      );
    }

    console.log('✅ Gemini prompt found, length:', data.gemini_prompt.length);
    return NextResponse.json({
      success: true,
      prompt: data.gemini_prompt
    });

  } catch (error) {
    console.error('💥 Get prompt API error:', error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
