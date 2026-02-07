import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getAuth } from "@clerk/nextjs/server";

// Type definitions
interface Agent {
  id: string;
  name: string;
  vapi_assistant_id: string | null;
  website_url: string;
  created_at: string;
}

interface VapiCall {
  id: string;
  createdAt?: string;
  created_at?: string;
  status: string;
  transcript?: string;
  summary?: string;
  recordingUrl?: string;
  startedAt?: string;
  endedAt?: string;
  cost?: number;
  [key: string]: any;
}

interface VapiResult {
  assistantId: string;
  calls: VapiCall[];
  error?: string;
}

// GET - Fetch calls for all user's agents
export async function GET(request: NextRequest) {
  console.log('📞 Fetching calls for user agents');
  
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
    const supabase = createServerSupabaseClient();
    const url = new URL(request.url || 'http://localhost:3000');
    
    // Get query parameters
    const agentId = url.searchParams.get('agentId');
    const limit = url.searchParams.get('limit') || '50';
    const offset = url.searchParams.get('offset') || '0';
    
    console.log('📋 Query parameters:', { agentId, limit, offset });

    // Step 1: Get user's agents
    console.log('🔍 Fetching user agents...');
    let agentsQuery = supabase
      .from("agents")
      .select("id, name, vapi_assistant_id, website_url, created_at")
      .eq("user_id", userId);

    // Filter by specific agent if provided
    if (agentId) {
      agentsQuery = agentsQuery.eq("id", agentId);
    }

    const { data: agents, error: agentsError } = await agentsQuery as { data: Agent[] | null, error: any };

    if (agentsError) {
      console.error('❌ Failed to fetch agents:', agentsError);
      return NextResponse.json(
        { error: "Failed to fetch agents", details: agentsError.message },
        { status: 500 }
      );
    }

    if (!agents || agents.length === 0) {
      console.log('📭 No agents found for user');
      return NextResponse.json({
        success: true,
        calls: [],
        agents: [],
        total: 0
      });
    }

    // Step 2: Extract VAPI assistant IDs
    const assistantIds = agents
      .map(agent => agent.vapi_assistant_id)
      .filter(id => id && id.trim() !== '');

    if (assistantIds.length === 0) {
      console.log('📭 No VAPI assistant IDs found');
      return NextResponse.json({
        success: true,
        calls: [],
        agents: agents,
        total: 0
      });
    }

    console.log('🤖 Found VAPI assistant IDs:', assistantIds);

    // Step 3: Fetch calls from VAPI for each assistant
    const vapiKey = process.env.VAPI_PRIVATE_KEY;
    if (!vapiKey) {
      console.error('❌ VAPI API key not configured');
      return NextResponse.json(
        { error: "VAPI API key not configured" },
        { status: 500 }
      );
    }

    console.log('📞 Fetching calls from VAPI...');
    
    // Fetch calls for each assistant
    const callsPromises = assistantIds.map(async (assistantId): Promise<VapiResult> => {
      try {
        const vapiResponse = await fetch(
          `https://api.vapi.ai/call?limit=${limit}`,
          {
            headers: {
              'Authorization': `Bearer ${vapiKey}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (!vapiResponse.ok) {
          console.error(`❌ VAPI API error for assistant ${assistantId}:`, vapiResponse.status);
          return { assistantId: assistantId!, calls: [], error: vapiResponse.statusText };
        }

        const vapiData = await vapiResponse.json();
        console.log(`✅ Fetched ${vapiData.length || 0} calls for assistant ${assistantId}`);
        
        return { assistantId: assistantId!, calls: vapiData || [] };
      } catch (error) {
        console.error(`❌ Failed to fetch calls for assistant ${assistantId}:`, error);
        return { assistantId: assistantId!, calls: [], error: error instanceof Error ? error.message : 'Unknown error' };
      }
    });

    const vapiResults = await Promise.all(callsPromises);

    // Step 4: Merge calls with agent data
    const allCalls = [];
    let totalCalls = 0;

    for (const result of vapiResults) {
      if (result.error) {
        console.error(`⚠️ Skipping assistant ${result.assistantId} due to error:`, result.error);
        continue;
      }

      const agent = agents.find(a => a.vapi_assistant_id === result.assistantId);
      if (!agent) {
        console.error(`⚠️ Agent not found for assistant ID: ${result.assistantId}`);
        continue;
      }

      const callsWithAgent = result.calls.map((call: any) => ({
        ...call,
        agent_id: agent.id,
        agent_name: agent.name,
        agent_website: agent.website_url,
        vapi_assistant_id: result.assistantId
      }));

      allCalls.push(...callsWithAgent);
      totalCalls += result.calls.length;
    }

    // Sort calls by creation date (newest first)
    allCalls.sort((a, b) => 
      new Date(b.createdAt || b.created_at).getTime() - new Date(a.createdAt || a.created_at).getTime()
    );

    console.log(`✅ Successfully fetched ${totalCalls} total calls from ${vapiResults.length} assistants`);

    return NextResponse.json({
      success: true,
      calls: allCalls,
      agents: agents,
      total: totalCalls,
      assistantIds: assistantIds
    });

  } catch (error) {
    console.error('💥 Error fetching calls:', error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
