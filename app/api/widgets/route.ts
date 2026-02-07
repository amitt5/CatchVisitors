import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getAuth } from "@clerk/nextjs/server";

// POST - Create new widget for an agent
export async function POST(request: NextRequest) {
  console.log('🧩 Widget creation API called');
  
  // Get authenticated user
  const { userId } = getAuth(request);
  if (!userId) {
    console.error('❌ Unauthorized: No user ID found');
    return NextResponse.json(
      { error: "Unauthorized. Please sign in." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { agentId } = body;
    
    console.log('📝 Widget creation request:', { agentId, userId });

    if (!agentId?.trim()) {
      console.error('❌ Missing agent ID');
      return NextResponse.json(
        { error: "Missing agent ID" },
        { status: 400 }
      );
    }

    const supabase = createServerSupabaseClient();
    
    // Verify agent belongs to user
    const { data: agent, error: agentError } = await supabase
      .from("agents")
      .select("id, name, vapi_assistant_id")
      .eq("id", agentId)
      .eq("user_id", userId)
      .single();

    if (agentError || !agent) {
      console.error('❌ Agent not found or access denied');
      return NextResponse.json(
        { error: "Agent not found or access denied" },
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

    // Check if widget already exists
    const { data: existingWidget } = await supabase
      .from("widgets")
      .select("id")
      .eq("agent_id", agentId)
      .single();

    if (existingWidget) {
      console.error('❌ Widget already exists for this agent');
      return NextResponse.json(
        { error: "Widget already exists for this agent" },
        { status: 409 }
      );
    }

    // Generate unique widget ID
    const widgetId = `widget_${Date.now()}_${Math.random().toString(36).substr(2, 8)}`;

    // Create widget
    const { data: widget, error: widgetError } = await supabase
      .from("widgets")
      .insert({
        agent_id: agentId,
        user_id: userId,
        widget_id: widgetId,
        is_active: true,
      })
      .select("id, widget_id")
      .single();

    if (widgetError) {
      console.error('❌ Failed to create widget:', widgetError);
      return NextResponse.json(
        { error: "Failed to create widget", details: widgetError.message },
        { status: 500 }
      );
    }

    // Update agent with widget reference
    const { error: updateError } = await supabase
      .from("agents")
      .update({ widget_id: widgetId })
      .eq("id", agentId)
      .eq("user_id", userId);

    if (updateError) {
      console.error('❌ Failed to update agent with widget ID:', updateError);
      // Don't fail the operation, but log the error
    }

    console.log('✅ Widget created successfully:', { widgetId, agentId });
    
    return NextResponse.json({
      success: true,
      widget: {
        id: widget.id,
        widget_id: widgetId,
        embed_code: `<script src="'https://www.catchvisitors.com'}/widget.js" data-widget-id="${widgetId}"></script>`,
        instructions: "Add this code to your website's HTML before the closing </body> tag."
      }
    });

  } catch (error) {
    console.error('💥 Widget creation error:', error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

// GET - Public endpoint to fetch widget configuration
export async function GET(request: NextRequest) {
  console.log('📋 Widget fetch API called');
  
  try {
    const url = new URL(request.url || 'http://localhost:3000');
    const widgetId = url.pathname.split('/').pop();
    
    if (!widgetId?.trim()) {
      console.error('❌ Missing widget ID');
      return NextResponse.json(
        { error: "Missing widget ID" },
        { status: 400 }
      );
    }

    const supabase = createServerSupabaseClient();
    
    // Get widget with agent information
    const { data: widget, error: widgetError } = await supabase
      .from("widgets")
      .select(`
        id,
        agent_id,
        widget_id,
        is_active
      `)
      .eq("widget_id", widgetId)
      .eq("is_active", true)
      .single();

    if (widgetError || !widget) {
      console.error('❌ Widget not found:', widgetId);
      return NextResponse.json(
        { error: "Widget not found" },
        { status: 404 }
      );
    }

    // Get agent details
    const { data: agent, error: agentError } = await supabase
      .from("agents")
      .select("name, vapi_assistant_id")
      .eq("id", widget.agent_id)
      .single();

    if (agentError || !agent) {
      console.error('❌ Agent not found for widget:', widget.agent_id);
      return NextResponse.json(
        { error: "Agent configuration not found" },
        { status: 404 }
      );
    }

    if (!agent.vapi_assistant_id) {
      console.error('❌ Agent has no VAPI assistant ID');
      return NextResponse.json(
        { error: "Agent not configured for voice calls" },
        { status: 400 }
      );
    }

    console.log('✅ Widget configuration fetched:', { widgetId, agentName: agent.name });
    
    return NextResponse.json({
      success: true,
      widget: {
        id: widget.id,
        widget_id: widget.widget_id,
        agent_name: agent.name,
        vapi_assistant_id: agent.vapi_assistant_id,
        is_active: widget.is_active,
        app_url: process.env.NEXT_PUBLIC_APP_URL
      }
    });

  } catch (error) {
    console.error('💥 Widget fetch error:', error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
