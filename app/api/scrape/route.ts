import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const SCRAPE_DO_BASE = "https://api.scrape.do";

export type FormattedFirmData = {
  FIRM_NAME: string;
  PRACTICE_AREAS: string;
  SCRAPED_WEBSITE_DATA: string;
  services: string[] | string;
  locations: string[] | string;
  Typical_clients: string[] | string;
};

const OPENAI_EXTRACT_SYSTEM = `You are extracting structured data from a law firm (or similar professional services) website.

Given raw HTML or text from a website, return a single JSON object with exactly these keys (no extra keys, no markdown, no code block):
- FIRM_NAME: string — the firm or company name
- PRACTICE_AREAS: string — e.g. "employment law", "personal injury"
- SCRAPED_WEBSITE_DATA: string — a concise summary of the firm's details (services, approach, key info) suitable for an AI voice assistant to use when answering visitor questions. Include only the most relevant facts.
- services: array of strings — list of services offered (e.g. ["Wrongful termination", "Discrimination claims"])
- locations: string or array — office location(s) or service areas
- Typical_clients: string or array — who they typically serve (e.g. "Employees", "Small businesses")

If something is not found, use empty string "" or empty array []. Return only valid JSON.`;

async function isWebsiteReachable(url: string): Promise<boolean> {
  // First try a HEAD request
  try {
    const res = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: AbortSignal.timeout(10_000),
    });
    if (res.ok) return true;
  } catch {
    // ignore and try GET below
  }

  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: AbortSignal.timeout(10_000),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  const token = process.env.SCRAPE_DO_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "Scrape.do token not configured. Add SCRAPE_DO_TOKEN to .env.local." },
      { status: 500 }
    );
  }

  let body: { url?: string; language?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const rawUrl = body.url?.trim();
  if (!rawUrl) {
    return NextResponse.json(
      { error: "Missing or empty url in request body" },
      { status: 400 }
    );
  }

  const language = body.language === "nl" ? "nl" : "en";

  let targetUrl = rawUrl;
  if (!/^https?:\/\//i.test(targetUrl)) {
    targetUrl = `https://${targetUrl}`;
  }

  try {
    new URL(targetUrl);
  } catch {
    return NextResponse.json(
      { error: "Invalid URL" },
      { status: 400 }
    );
  }

  const supabase = createServerSupabaseClient();

  // 1) Check for existing demo for this website + language
  type ExistingDemo = {
    id: string;
    scraped_content: string | null;
    formatted_data: unknown | null;
  };
  let existingDemo: ExistingDemo | null = null;

  try {
    const { data, error } = await supabase
      .from("demos")
      .select("id, scraped_content, formatted_data")
      .eq("website_url", targetUrl)
      .eq("language", language)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle<ExistingDemo>();

    if (error && error.code !== "PGRST116") {
      console.error("Supabase lookup error:", error);
    } else if (data) {
      existingDemo = data;
    }
  } catch (err) {
    console.error("Supabase lookup threw:", err);
  }

  // If we already have formatted data, return it immediately
  if (existingDemo?.formatted_data) {
    return NextResponse.json({
      success: true,
      demoId: existingDemo.id,
      url: targetUrl,
      language,
      formattedData: existingDemo.formatted_data,
      fromCache: true,
    });
  }

  // 2) Determine source content: reuse scraped_content if we have it; otherwise scrape.
  let scrapedContent: string;
  let demoId: string;

  if (existingDemo?.scraped_content) {
    scrapedContent = existingDemo.scraped_content;
    demoId = existingDemo.id;
  } else {
    // Check that website is reachable before scraping
    const reachable = await isWebsiteReachable(targetUrl);
    if (!reachable) {
      return NextResponse.json(
        {
          error: "Website appears unreachable. Please check the URL and try again.",
        },
        { status: 400 },
      );
    }

    const params = new URLSearchParams({ token, url: targetUrl });
    params.set("render", "true");
    const apiUrl = `${SCRAPE_DO_BASE}/?${params.toString()}`;

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
        signal: AbortSignal.timeout(90_000),
      });

      if (!response.ok) {
        const text = await response.text();
        return NextResponse.json(
          {
            error: `Scrape.do request failed (${response.status})`,
            details: text.slice(0, 500),
          },
          { status: response.status >= 500 ? 502 : 400 },
        );
      }

      scrapedContent = await response.text();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Scraping failed";
      return NextResponse.json(
        { error: "Scraping failed", details: message },
        { status: 502 },
      );
    }

    // Save new demo row
    try {
      const { data, error } = await supabase
        .from("demos")
        .insert({
          website_url: targetUrl,
          language,
          scraped_content: scrapedContent,
        })
        .select("id")
        .single();

      if (error) {
        console.error("Supabase insert error:", error);
        return NextResponse.json(
          { error: "Failed to save demo", details: error.message },
          { status: 500 },
        );
      }
      if (!data?.id) {
        return NextResponse.json(
          { error: "Failed to save demo: no id returned" },
          { status: 500 },
        );
      }
      demoId = data.id;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Database error";
      return NextResponse.json(
        { error: "Failed to save demo", details: message },
        { status: 500 },
      );
    }
  }

  // 3) Format with OpenAI (either from cached scrape or fresh scrape)
  const openaiKey = process.env.OPENAI_API_KEY;
  if (!openaiKey) {
    return NextResponse.json(
      { error: "OpenAI API key not configured. Add OPENAI_API_KEY to .env.local." },
      { status: 500 }
    );
  }

  const openai = new OpenAI({ apiKey: openaiKey });
  const truncatedContent = scrapedContent.slice(0, 120_000);

  let formattedData: FormattedFirmData;
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: OPENAI_EXTRACT_SYSTEM },
        {
          role: "user",
          content: `Extract the JSON from this website content:\n\n${truncatedContent}`,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.2,
    });

    const raw = completion.choices[0]?.message?.content;
    if (!raw) {
      return NextResponse.json(
        { error: "OpenAI returned no content" },
        { status: 502 }
      );
    }

    const parsed = JSON.parse(raw) as FormattedFirmData;
    formattedData = {
      FIRM_NAME: String(parsed.FIRM_NAME ?? ""),
      PRACTICE_AREAS: String(parsed.PRACTICE_AREAS ?? ""),
      SCRAPED_WEBSITE_DATA: String(parsed.SCRAPED_WEBSITE_DATA ?? ""),
      services: Array.isArray(parsed.services)
        ? parsed.services
        : typeof parsed.services === "string"
          ? parsed.services
          : [],
      locations: Array.isArray(parsed.locations)
        ? parsed.locations
        : typeof parsed.locations === "string"
          ? parsed.locations
          : "",
      Typical_clients: Array.isArray(parsed.Typical_clients)
        ? parsed.Typical_clients
        : typeof parsed.Typical_clients === "string"
          ? parsed.Typical_clients
          : [],
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "OpenAI request failed";
    return NextResponse.json(
      { error: "Failed to format content", details: message },
      { status: 502 }
    );
  }

  // Update row with formatted_data
  try {
    const supabase = createServerSupabaseClient();
    const { error } = await supabase
      .from("demos")
      .update({ formatted_data: formattedData })
      .eq("id", demoId);

    if (error) {
      console.error("Supabase update error:", error);
      return NextResponse.json(
        { error: "Demo saved but failed to store formatted data", details: error.message, demoId, formattedData },
        { status: 500 }
      );
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Database update failed";
    return NextResponse.json(
      { error: "Demo saved but failed to store formatted data", details: message, demoId, formattedData },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    demoId,
    url: targetUrl,
    language,
    formattedData,
  });
}
