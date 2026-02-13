import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const {
      id,
      assistantId,
      orgId,
      messages,
      cost,
      costs,
      createdAt,
      updatedAt
    } = await request.json();

    if (!id || !assistantId || !messages) {
      return NextResponse.json(
        { error: "id, assistantId, and messages are required" },
        { status: 400 }
      );
    }

    const supabase = createServerSupabaseClient();

    // Check if chat session already exists
    const { data: existing } = await supabase
      .from("chat_sessions")
      .select("id")
      .eq("id", id)
      .single();

    if (existing) {
      // Update existing session
      const { data, error } = await supabase
        .from("chat_sessions")
        .update({
          messages,
          cost: cost || 0,
          costs: costs || [],
          updated_at: updatedAt || new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Error updating chat session:", error);
        return NextResponse.json(
          { error: "Failed to update chat session" },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        action: "updated",
        data
      });
    } else {
      // Create new session
      const { data, error } = await supabase
        .from("chat_sessions")
        .insert({
          id,
          assistant_id: assistantId,
          org_id: orgId,
          messages,
          cost: cost || 0,
          costs: costs || [],
          created_at: createdAt || new Date().toISOString(),
          updated_at: updatedAt || new Date().toISOString(),
        })
        .select()
        .single();

      if (error) {
        console.error("Error creating chat session:", error);
        return NextResponse.json(
          { error: "Failed to create chat session" },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        action: "created",
        data
      });
    }

  } catch (error) {
    console.error("Error in chat-sessions route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Get all chat sessions or a specific one
export async function GET(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const assistantId = searchParams.get("assistantId");

    let query = supabase.from("chat_sessions").select("*");

    if (id) {
      query = query.eq("id", id).single();
    } else if (assistantId) {
      query = query.eq("assistant_id", assistantId);
    }

    query = query.order("created_at", { ascending: false });

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching chat sessions:", error);
      return NextResponse.json(
        { error: "Failed to fetch chat sessions" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });

  } catch (error) {
    console.error("Error in chat-sessions GET route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
