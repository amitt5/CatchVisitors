import { NextRequest, NextResponse } from "next/server";

const SCRAPE_DO_BASE = "https://api.scrape.do";

export async function POST(request: NextRequest) {
  const token = process.env.SCRAPE_DO_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "Scrape.do token not configured. Add SCRAPE_DO_TOKEN to .env.local." },
      { status: 500 }
    );
  }

  let body: { url?: string };
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

  // Ensure URL has a protocol for validation
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

  const params = new URLSearchParams({
    token,
    url: targetUrl, // Scrape.do accepts url as separate param; encoding is applied by URLSearchParams
  });
  // Use render=true for JS-rendered pages (e.g. React/Next sites)
  params.set("render", "true");
  const apiUrl = `${SCRAPE_DO_BASE}/?${params.toString()}`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: { Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" },
      signal: AbortSignal.timeout(90_000),
    });

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json(
        {
          error: `Scrape.do request failed (${response.status})`,
          details: text.slice(0, 500),
        },
        { status: response.status >= 500 ? 502 : 400 }
      );
    }

    const scrapedContent = await response.text();
    return NextResponse.json({
      success: true,
      url: targetUrl,
      scrapedContent,
      length: scrapedContent.length,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Scraping failed";
    return NextResponse.json(
      { error: "Scraping failed", details: message },
      { status: 502 }
    );
  }
}
