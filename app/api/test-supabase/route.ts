import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST() {
  try {
    const supabase = createServerSupabaseClient();

    const { data, error } = await supabase
      .from("demos")
      .insert({
        website_url: "https://example.com",
        language: "en",
        scraped_content: "Test demo row created to verify Supabase keys.",
      })
      .select("id, created_at")
      .single();

    if (error) {
      console.error("Supabase test insert error:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Supabase test insert failed",
          details: error.message,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Supabase test insert succeeded",
      demoId: data.id,
      created_at: data.created_at,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      {
        success: false,
        error: "Supabase test insert failed",
        details: message,
      },
      { status: 500 },
    );
  }
}

