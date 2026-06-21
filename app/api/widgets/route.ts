import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getAuth } from "@clerk/nextjs/server";

// POST - Create widget for an agent
export async function POST(request: NextRequest) {
  console.log('🎨 Widget creation API called');
  
  try {
    const { userId } = await getAuth(request);
    
    if (!userId) {
      console.error('❌ Unauthorized: No user ID');
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { agent_id } = body;
    
    if (!agent_id?.trim()) {
      console.error('❌ Missing agent ID');
      return NextResponse.json(
        { error: "Missing agent ID" },
        { status: 400 }
      );
    }

    console.log('🔍 Creating widget for agent:', agent_id);

    const supabase = createServerSupabaseClient();
    
    // Check if agent exists and belongs to user
    const { data: agent, error: agentError } = await supabase
      .from("agents")
      .select("id, user_id, vapi_assistant_id")
      .eq("id", agent_id)
      .eq("user_id", userId)
      .single() as any;

    if (agentError || !agent) {
      console.error('❌ Agent not found or unauthorized');
      return NextResponse.json(
        { error: "Agent not found or unauthorized" },
        { status: 404 }
      );
    }

    if (!agent.vapi_assistant_id) {
      console.error('❌ Agent has no VAPI assistant ID');
      return NextResponse.json(
        { error: "Agent must have a VAPI assistant ID before creating widget" },
        { status: 400 }
      );
    }

    // Check if widget already exists for this agent
    const { data: existingWidget } = await supabase
      .from("widgets")
      .select("*")
      .eq("agent_id", agent_id)
      .eq("user_id", userId)
      .single() as any;

    if (existingWidget) {
      console.log('✅ Widget already exists:', existingWidget.widget_id);
      return NextResponse.json({
        success: true,
        widget: existingWidget,
        embed_code: `<script src="https://www.inboundly.com/widget.js" data-widget-id="${existingWidget.widget_id}"></script>`,
        message: "Widget already exists for this agent"
      });
    }

    // Generate unique widget ID
    const widgetId = `widget_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    
    console.log('🆕 Generated widget ID:', widgetId);

    // Create widget
    const { data: widget, error: widgetError } = await supabase
      .from("widgets")
      .insert({
        widget_id: widgetId,
        agent_id: agent_id,
        user_id: userId,
        is_active: true
      })
      .select()
      .single() as any;

    if (widgetError) {
      console.error('❌ Failed to create widget:', widgetError);
      return NextResponse.json(
        { error: "Failed to create widget", details: widgetError.message },
        { status: 500 }
      );
    }

    console.log('✅ Widget created successfully');

    return NextResponse.json({
      success: true,
      widget,
      embed_code: `<script src="https://www.inboundly.com/widget.js" data-widget-id="${widgetId}"></script>`,
      message: "Widget created successfully"
    });

  } catch (error) {
    console.error('💥 Widget creation error:', error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
