import { createVapiAssistant } from "@/lib/vapi";
import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getAuth } from "@clerk/nextjs/server";
import { Agent } from "@/types/database";

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

// GET - Fetch user's agents
export async function GET(request: NextRequest) {
  console.log('📋 Fetching user agents');
  
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
    const agentId = url.searchParams.get('id');
    
    if (agentId) {
      // Fetch single agent
      console.log('🔍 Fetching single agent:', agentId);
      const { data, error } = await supabase
        .from("agents")
        .select("*")
        .eq("user_id", userId)
        .eq("id", agentId)
        .single();

      if (error) {
        console.error('❌ Failed to fetch agent:', error);
        return NextResponse.json(
          { error: "Failed to fetch agent", details: error.message },
          { status: 500 }
        );
      }

      if (!data) {
        console.error('❌ Agent not found:', agentId);
        return NextResponse.json(
          { error: "Agent not found" },
          { status: 404 }
        );
      }

      console.log('✅ Successfully fetched agent:', { id: data.id, name: data.name });
      return NextResponse.json({
        success: true,
        agent: data,
      });
    } else {
      // Fetch all agents
      console.log('📋 Fetching all agents for user:', userId);
      const { data, error } = await supabase
        .from("agents")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error('❌ Failed to fetch agents:', error);
        return NextResponse.json(
          { error: "Failed to fetch agents", details: error.message },
          { status: 500 }
        );
      }

      console.log('✅ Successfully fetched agents:', { count: data?.length || 0 });
      return NextResponse.json({
        success: true,
        agents: data || [],
      });
    }
  } catch (error) {
    console.error('💥 Error fetching agents:', error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

// PUT - Update existing agent
export async function PUT(request: NextRequest) {
  console.log('🔄 Agent update API called');
  
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
    const { name, website_url, languages, prompt, vapi_assistant_id } = body;
    const url = new URL(request.url || 'http://localhost:3000');
    const agentId = url.searchParams.get('id');
    
    if (!agentId) {
      console.error('❌ Missing agent ID');
      return NextResponse.json(
        { error: "Missing agent ID in URL" },
        { status: 400 }
      );
    }

    if (!name?.trim() || !website_url?.trim() || !languages?.length) {
      console.error('❌ Missing required fields');
      return NextResponse.json(
        { error: "Missing required fields: name, website_url, and languages are required" },
        { status: 400 }
      );
    }

    console.log('📝 Updating agent:', { agentId, name, website_url, languages, vapi_assistant_id, userId });
    
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("agents")
      .update({
        name: name.trim(),
        website_url: website_url.trim(),
        languages: languages,
        prompt: prompt,
        vapi_assistant_id: vapi_assistant_id || null,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId)
      .eq("id", agentId)
      .select()
      .single();

    if (error) {
      console.error('❌ Failed to update agent:', error);
      return NextResponse.json(
        { error: "Failed to update agent", details: error.message },
        { status: 500 }
      );
    }

    if (!data) {
      console.error('❌ Agent not found:', agentId);
      return NextResponse.json(
        { error: "Agent not found" },
        { status: 404 }
      );
    }

    console.log('✅ Agent updated successfully:', { id: data.id, name: data.name });
    
    // Create/update VAPI agent with the prompt
// try {
//   const vapiResponse =  await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/vapi-agent`, {
// method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           prompt: prompt,
//           agentId: data.id
//         })
//       });
//       
//       const vapiData = await vapiResponse.json();
//       console.log('🤖 VAPI agent response:', vapiData);
//       
//       if (vapiData.success && vapiData.assistantId) {
//         // Update agent with VAPI assistant ID
//         await supabase
//           .from('agents')
//           .update({ vapi_assistant_id: vapiData.assistantId })
//           .eq('id', data.id);
//       }
//     } catch (vapiError) {
//       console.error('❌ Failed to create VAPI agent:', vapiError);
//       // Don't fail the whole operation if VAPI fails
//     }

// VAPI assistant will be created manually and ID added via edit form
    
    return NextResponse.json({
      success: true,
      agent: data,
    });

  } catch (error) {
    console.error('💥 Agent update error:', error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

// POST - Create new agent

export async function POST(request: NextRequest) {
  console.log('🤖 Agent creation API called');
  
  // Get authenticated user (required for agent creation)
  const { userId } = getAuth(request);
  if (!userId) {
    console.error('❌ Unauthorized: No user ID found');
    return NextResponse.json(
      { error: "Unauthorized. Please sign in." },
      { status: 401 }
    );
  }
  
  const openrouterApiKey = process.env.OPENROUTER_API_KEY;
  console.log('🔑 OpenRouter API key check:', { 
    hasKey: !!openrouterApiKey, 
    keyLength: openrouterApiKey?.length,
    keyPrefix: openrouterApiKey?.substring(0, 10) + '...'
  });
  
  if (!openrouterApiKey) {
    console.error('❌ OpenRouter API key not configured');
    return NextResponse.json(
      { error: "OpenRouter API key not configured. Add OPENROUTER_API_KEY to .env.local." },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { businessName, website, languages, vapi_assistant_id } = body;
    console.log('📝 Agent creation request received:', { businessName, website, languages, vapi_assistant_id, userId });

    if (!businessName?.trim() || !website?.trim() || !languages?.length) {
      console.error('❌ Missing required fields');
      return NextResponse.json(
        { error: "Missing required fields: businessName, website, and languages are required" },
        { status: 400 }
      );
    }

    // Normalize URL
    let targetUrl = website.trim();
    if (!/^https?:\/\//i.test(targetUrl)) {
      targetUrl = `https://${targetUrl}`;
    }

    // Validate URL
    try {
      new URL(targetUrl);
    } catch {
      console.error('❌ Invalid URL format:', targetUrl);
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 }
      );
    }

    console.log('🔗 Normalized URL:', targetUrl);

    const supabase = createServerSupabaseClient();

    // Check for existing agent for this website + user
    console.log('🔍 Checking for existing agent...');
    type ExistingAgent = {
      id: string;
      prompt: string | null;
    };
    
    let existingAgent: ExistingAgent | null = null;

    try {
      const { data, error } = await supabase
        .from("agents")
        .select("id, prompt")
        .eq("user_id", userId)
        .eq("website_url", targetUrl)
        .maybeSingle<ExistingAgent>();

      if (error && error.code !== "PGRST116") {
        console.error('❌ Supabase lookup error:', error);
      } else if (data) {
        existingAgent = data;
        console.log('✅ Found existing agent:', { agentId: data.id, hasPrompt: !!data.prompt });
      }
    } catch (err) {
      console.error('💥 Supabase lookup threw:', err);
    }

    // Return existing prompt if available
    if (existingAgent?.prompt) {
      console.log('📋 Returning existing agent prompt');
      return NextResponse.json({
        success: true,
        agentId: existingAgent.id,
        prompt: existingAgent.prompt,
        fromCache: true,
      });
    }

    // Call OpenRouter API with Gemini model
    console.log('🚀 Calling OpenRouter API with Gemini model...');
    const researchPrompt = `${targetUrl}

Research this website with the goal of writing a comprehensive assistant prompt for a helpful VAPI AI voice agent receptionist voice/chat widget on the website that would answer frequently asked questions and guide the potential customer to book an appointment.

Business name: ${businessName}

Return ONLY a JSON object with this structure:
{
  "organisation_name": "the company name",
  "vapi_prompt": "the complete assistant prompt"
}

No other text, no explanation, only the JSON object.`;

    const openrouterResponse = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openrouterApiKey}`,
        "HTTP-Referer": "https://catch-visitors.com",
        "X-Title": "Inboundly Agent",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          {
            role: "user",
            content: researchPrompt
          }
        ],
        temperature: 0.4,
        max_tokens: 4000,
      }),
    });

    if (!openrouterResponse.ok) {
      const errorText = await openrouterResponse.text();
      console.error('❌ OpenRouter API error:', { status: openrouterResponse.status, error: errorText });
      return NextResponse.json(
        { error: "OpenRouter API request failed", details: errorText },
        { status: openrouterResponse.status >= 500 ? 502 : 400 }
      );
    }

    const openrouterData = await openrouterResponse.json();
    console.log('📊 OpenRouter API response received:', { 
      hasChoices: !!openrouterData.choices?.length,
      choiceCount: openrouterData.choices?.length
    });
    
    // Extract the prompt from OpenRouter response
    let prompt = "";
    let organisationName = "";
    try {
      if (openrouterData.choices?.[0]?.message?.content) {
        let content = openrouterData.choices[0].message.content;
        console.log('📝 OpenRouter returned content:', content.substring(0, 200) + '...');
        
        // Clean markdown code blocks if present
        if (content.includes('```')) {
          console.log('🧹 Cleaning markdown code blocks...');
          content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
          console.log('✅ Cleaned content:', content.substring(0, 200) + '...');
        }
        
        // Parse JSON response
        const jsonResponse = JSON.parse(content);
        organisationName = jsonResponse.organisation_name || businessName;
        prompt = jsonResponse.vapi_prompt || "";
        
        console.log('✅ Parsed JSON response:', { 
          organisationName, 
          promptLength: prompt.length 
        });
      } else {
        throw new Error("No content found in OpenRouter response");
      }
    } catch (error) {
      console.error('❌ Failed to parse OpenRouter response:', error);
      return NextResponse.json(
        { error: "Failed to parse OpenRouter response", details: error instanceof Error ? error.message : "Unknown error" },
        { status: 502 }
      );
    }

    console.log('✅ Successfully extracted prompt from OpenRouter, length:', prompt.length);

    // Save new agent or update existing
let agentId: string;

if (existingAgent) {
  agentId = existingAgent.id;
  console.log('💾 Updating existing agent:', agentId);
  // Update existing agent
  const { error: updateError } = await supabase
    .from("agents")
    .update({ 
      prompt: prompt,
      name: businessName,
      updated_at: new Date().toISOString(),
    })
    .eq("id", agentId);

  if (updateError) {
    console.error('❌ Failed to update agent:', updateError);
    return NextResponse.json(
      { error: "Failed to save agent", details: updateError.message },
      { status: 500 }
    );
  }
} else {
  console.log('🆕 Creating new agent...');
  // Create new agent
  const { data, error } = await supabase
    .from("agents")
    .insert({
      user_id: userId,
      name: businessName,
      website_url: targetUrl,
      languages: languages,
      prompt: prompt,
      vapi_assistant_id: vapi_assistant_id || null,
      status: 'active',
      calls: 0,
    })
    .select("id")
    .single();

  if (error) {
    console.error('❌ Failed to save new agent:', error);
    return NextResponse.json(
      { error: "Failed to save agent", details: error.message },
      { status: 500 }
    );
  }
  
  if (!data?.id) {
    console.error('❌ Failed to save agent: no id returned');
    return NextResponse.json(
      { error: "Failed to save agent: no id returned" },
      { status: 500 }
    );
  }
  
  agentId = data.id;
  console.log('✅ New agent created:', agentId);
}

// Create VAPI agent with prompt
// try {
//   const vapiData = await createVapiAssistant(prompt, agentId);
//   console.log('🤖 VAPI agent response:', vapiData);
//   
//   if (vapiData.id) {
//     await supabase
//       .from('agents')
//       .update({ vapi_assistant_id: vapiData.id })
//       .eq('id', agentId);
//   }
// } catch (vapiError) {
//   console.error('❌ Failed to create VAPI agent:', vapiError);
// }

// VAPI assistant will be created manually and ID added via edit form

console.log('🎉 Agent creation completed successfully');

return NextResponse.json({
  success: true,
  agentId: agentId,  // ← Changed from data.id to agentId
  prompt: prompt,
});

} catch (error) {
  console.error('💥 Agent creation error:', error);
  return NextResponse.json(
    { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
    { status: 500 }
  );
}
}  // ← This closes the POST function
