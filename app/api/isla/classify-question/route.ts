import { NextResponse } from "next/server";
import OpenAI from "openai";
import {
  SCRIPTED_QUESTIONS,
  getQuestionById,
} from "@/lib/isla/scripted-questions";

// Maps a visitor's free-text question to one of the known Isla topics, then
// returns the canned answer + the screen to present. Not a general agent —
// strictly bounded to SCRIPTED_QUESTIONS (or "none" → caller shows a fallback).

const TOPIC_LIST = SCRIPTED_QUESTIONS.map(
  (q) => `- ${q.id}: ${q.question}`
).join("\n");

const SYSTEM_PROMPT = `You are a routing classifier for "Isla", an AI SDR (sales) agent on a marketing website.
A visitor types a question. Decide which ONE of the known topics best answers it.

Known topics (id: canonical question):
${TOPIC_LIST}

Rules:
- Match on meaning, not exact wording. The visitor may phrase things casually.
- Anything about price, cost, plans, or budget => "pricing".
- Anything about CRM, HubSpot, Salesforce, syncing/logging leads, or pushing data to a system => "crm".
- Questions about response time / speed of reaching new leads => "email-followup".
- A general "what is Isla / what can you do / how does this work" => "overview".
- If the question is unrelated to Isla or none of the topics reasonably apply, use "none".
- Respond with ONLY a JSON object: {"id": "<one topic id or 'none'>"}.`;

const VALID_IDS = new Set(SCRIPTED_QUESTIONS.map((q) => q.id));

export async function POST(request: Request) {
  try {
    const { question } = await request.json();

    if (!question || typeof question !== "string" || !question.trim()) {
      return NextResponse.json({ error: "Missing question" }, { status: 400 });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      console.error("❌ OPENROUTER_API_KEY is not set");
      return NextResponse.json(
        { error: "Classifier not configured" },
        { status: 500 }
      );
    }

    // OpenRouter is OpenAI-compatible; use a fast Gemini model (proven in this repo).
    const openai = new OpenAI({
      apiKey,
      baseURL: "https://openrouter.ai/api/v1",
    });

    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.5-flash-lite",
      temperature: 0,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: question.trim() },
      ],
    });

    const raw = completion.choices[0]?.message?.content ?? "{}";
    let parsedId: string | null = null;
    try {
      // Strip any markdown code fences before parsing.
      const cleaned = raw.replace(/```json|```/g, "").trim();
      parsedId = JSON.parse(cleaned).id ?? null;
    } catch {
      parsedId = null;
    }

    if (!parsedId || !VALID_IDS.has(parsedId)) {
      console.log(`🔎 Isla classify "${question}" → none`);
      return NextResponse.json({ match: null });
    }

    const match = getQuestionById(parsedId)!;
    console.log(`🔎 Isla classify "${question}" → ${match.id}`);
    return NextResponse.json({
      match: {
        id: match.id,
        answer: match.answer,
        route: match.route,
        sectionId: match.sectionId,
        offerMeeting: match.offerMeeting ?? false,
      },
    });
  } catch (err: any) {
    console.error("❌ classify-question route error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
