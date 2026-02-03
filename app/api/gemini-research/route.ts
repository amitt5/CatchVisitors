import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

export async function POST(request: NextRequest) {
  console.log('🌟 Gemini research API called (via OpenRouter)');
  
  const openrouterApiKey = process.env.OPENROUTER_API_KEY;
  if (!openrouterApiKey) {
    console.error('❌ OpenRouter API key not configured');
    return NextResponse.json(
      { error: "OpenRouter API key not configured. Add OPENROUTER_API_KEY to .env.local." },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { url, language = "en" } = body;
    console.log('📝 Request received:', { url, language });

    if (!url?.trim()) {
      console.error('❌ Missing URL in request');
      return NextResponse.json(
        { error: "Missing or empty url in request body" },
        { status: 400 }
      );
    }

    // Normalize URL
    let targetUrl = url.trim();
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

    // Check for existing research for this website + language
    console.log('🔍 Checking for existing research...');
    type ExistingResearch = {
      id: string;
      gemini_prompt: string | null;
    };
    
    let existingResearch: ExistingResearch | null = null;

    try {
      const { data, error } = await supabase
        .from("demos")
        .select("id, gemini_prompt")
        .eq("website_url", targetUrl)
        .eq("language", language)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle<ExistingResearch>();

      if (error && error.code !== "PGRST116") {
        console.error('❌ Supabase lookup error:', error);
      } else if (data) {
        existingResearch = data;
        console.log('✅ Found existing research:', { demoId: data.id, hasPrompt: !!data.gemini_prompt });
      }
    } catch (err) {
      console.error('💥 Supabase lookup threw:', err);
    }

    // Return cached prompt if available
    if (existingResearch?.gemini_prompt) {
      console.log('📋 Returning cached prompt');
      return NextResponse.json({
        success: true,
        demoId: existingResearch.id,
        url: targetUrl,
        language,
        prompt: existingResearch.gemini_prompt,
        fromCache: true,
      });
    }

    // Call OpenRouter API with Gemini model
    console.log('🚀 Calling OpenRouter API with Gemini model...');
    const researchPrompt = language === "nl" 
      ? `${targetUrl}

Onderzoek deze website met het doel van het schrijven van een uitgebreide assistent-prompt voor een behulpzame VAPI AI-stemagent receptionist stem/chat widget op de website die veelgestelde vragen zou beantwoorden en de potentiële klant zou begeleiden om een afspraak te boeken.`
      : `${targetUrl}

Research this website with the goal of writing a comprehensive assistant prompt for a helpful VAPI AI voice agent receptionist voice/chat widget on the website that would answer frequently asked questions and guide the potential customer to book an appointment.`;

    const openrouterResponse = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openrouterApiKey}`,
        "HTTP-Referer": "https://catch-visitors.com", // Optional: your app URL
        "X-Title": "CatchVisitors Demo", // Optional: your app name
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite", // Gemini model via OpenRouter
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
    try {
      if (openrouterData.choices?.[0]?.message?.content) {
        prompt = openrouterData.choices[0].message.content;
        console.log('📝 OpenRouter returned content, using directly');
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

    // Save new research or update existing
    let demoId: string;
    
    if (existingResearch) {
      demoId = existingResearch.id;
      console.log('💾 Updating existing research record:', demoId);
      // Update existing record
      const { error: updateError } = await supabase
        .from("demos")
        .update({ gemini_prompt: prompt })
        .eq("id", demoId);

      if (updateError) {
        console.error('❌ Failed to update demo with Gemini prompt:', updateError);
        return NextResponse.json(
          { error: "Failed to save research", details: updateError.message },
          { status: 500 }
        );
      }
    } else {
      console.log('🆕 Creating new research record...');
      // Create new record
      const { data, error } = await supabase
        .from("demos")
        .insert({
          website_url: targetUrl,
          language,
          gemini_prompt: prompt,
        })
        .select("id")
        .single();

      if (error) {
        console.error('❌ Failed to save new demo:', error);
        return NextResponse.json(
          { error: "Failed to save research", details: error.message },
          { status: 500 }
        );
      }
      
      if (!data?.id) {
        console.error('❌ Failed to save research: no id returned');
        return NextResponse.json(
          { error: "Failed to save research: no id returned" },
          { status: 500 }
        );
      }
      
      demoId = data.id;
      console.log('✅ New research record created:', demoId);
    }

    console.log('🎉 Gemini research completed successfully');
    return NextResponse.json({
      success: true,
      demoId,
      url: targetUrl,
      language,
      prompt,
    });

  } catch (error) {
    console.error('💥 Gemini research error:', error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
