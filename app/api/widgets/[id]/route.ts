import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

// GET - Public endpoint to fetch widget configuration
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  console.log('📋 Widget fetch API called');
  
  try {
    const params = await context.params;
    const widgetId = params.id;
    
    console.log('🔍 Widget ID from params:', widgetId);
    
    if (!widgetId?.trim()) {
      console.error('❌ Missing widget ID');
      return NextResponse.json(
        { error: "Missing widget ID" },
        { status: 400 }
      );
    }

    console.log('🔎 Searching for widget_id:', widgetId);

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
      .single() as any;

    console.log('📊 Widget query result:', { widget, error: widgetError });

    if (widgetError || !widget) {
      console.error('❌ Widget not found:', widgetId);
      console.error('❌ Error details:', widgetError);
      return NextResponse.json(
        { error: "Widget not found" },
        { status: 404 }
      );
    }

    // Get agent details - only select fields that exist
    const { data: agent, error: agentError } = await supabase
      .from("agents")
      .select("name, vapi_assistant_id")
      .eq("id", widget.agent_id)
      .single() as any;

    console.log('📊 Agent query result:', { agent, error: agentError });

    if (agentError || !agent) {
      console.error('❌ Agent not found for widget:', widget.agent_id);
      console.error('❌ Agent error details:', agentError);
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
    
    const response = NextResponse.json({
      success: true,
      widget: {
        id: widget.id,
        widget_id: widget.widget_id,
        agent_name: agent.name,
        vapi_assistant_id: agent.vapi_assistant_id,
        is_active: widget.is_active,
        vapi_api_key: process.env.NEXT_PUBLIC_VAPI_API_KEY
      }
    });

    // Add CORS headers for local testing
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return response;

  } catch (error) {
    console.error('💥 Widget fetch error:', error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

// OPTIONS handler for CORS preflight
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
