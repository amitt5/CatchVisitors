import type { FormattedFirmData } from "@/app/api/scrape/route";

/**
 * Builds the VAPI assistant system prompt from OpenAI-formatted firm data.
 * Use this when configuring the VAPI assistant for a demo.
 */
export function buildVapiSystemPrompt(data: FormattedFirmData): string {
  const services =
    Array.isArray(data.services) ? data.services.join(", ") : data.services || "—";
  const locations =
    Array.isArray(data.locations) ? data.locations.join(", ") : data.locations || "—";
  const typicalClients =
    Array.isArray(data.Typical_clients)
      ? data.Typical_clients.join(", ")
      : data.Typical_clients || "—";

  return `You are a friendly AI assistant for ${data.FIRM_NAME}, a law firm specializing in ${data.PRACTICE_AREAS}.

Your job is to:
1. Answer visitor questions about the firm's services
2. Qualify potential clients by understanding their situation
3. Offer to schedule a consultation if they seem like a good fit

Firm Details:
${data.SCRAPED_WEBSITE_DATA}

Key Information:
- Services: ${services}
- Location: ${locations}
- Typical clients: ${typicalClients}

Tone: Professional but warm, patient, don't rush to book meetings`;
}
