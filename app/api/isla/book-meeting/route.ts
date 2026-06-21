import { NextResponse } from "next/server";
import { Resend } from "resend";

// Owner/sales inbox that also gets notified (bcc on the buyer's confirmation).
const OWNER = "amitgyl@gmail.com";
// Must be a verified domain in your Resend account.
const FROM = "Isla <isla@insightsim.ai>";

// Derive a rough company name from an email domain (acme.com -> Acme).
function companyFromEmail(email: string): string {
  const domain = email.split("@")[1] || "";
  const name = domain.split(".")[0] || "";
  return name ? name.charAt(0).toUpperCase() + name.slice(1) : "Unknown";
}

async function pingSlack(email: string, company: string, day: string, time: string) {
  const url = process.env.SLACK_WEBHOOK_URL;
  if (!url) {
    console.log("ℹ️ SLACK_WEBHOOK_URL not set — skipping Slack ping");
    return;
  }
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: `:calendar: *New demo booked via Isla*\n*Buyer:* ${email} (${company})\n*When:* ${day} at ${time}\n*Intent:* Inbound — wants to convert more web traffic\n_Synced to HubSpot · ready for your team_`,
      }),
    });
    console.log("✅ Slack ping sent");
  } catch (e) {
    console.error("❌ Slack ping failed:", e);
  }
}

export async function POST(request: Request) {
  try {
    const { day, time, email } = await request.json();

    if (!day || !time) {
      return NextResponse.json({ error: "Missing day or time" }, { status: 400 });
    }

    const company = email ? companyFromEmail(email) : "";

    // Slack ping fires regardless of email outcome.
    await pingSlack(email || "unknown", company, day, time);

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("❌ RESEND_API_KEY is not set");
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
    }

    const resend = new Resend(apiKey);

    // Confirmation goes to the buyer; owner is bcc'd so sales sees it too.
    const to = email ? [email] : [OWNER];
    const bcc = email ? [OWNER] : undefined;

    const { data, error } = await resend.emails.send({
      from: FROM,
      to,
      bcc,
      subject: `Your demo is booked — ${day} at ${time}`,
      html: `
        <div style="font-family: -apple-system, Segoe UI, Roboto, sans-serif; max-width: 480px; margin: 0 auto;">
          <h2 style="color: #02524B; margin-bottom: 4px;">You're all set! 🎉</h2>
          <p style="color: #555; margin-top: 0;">Thanks for booking a demo with the Isla team. Here are your details:</p>
          <table style="border-collapse: collapse; margin-top: 12px;">
            <tr>
              <td style="padding: 6px 16px 6px 0; color: #888;">Day</td>
              <td style="padding: 6px 0; font-weight: 600; color: #1a1a1a;">${day}</td>
            </tr>
            <tr>
              <td style="padding: 6px 16px 6px 0; color: #888;">Time</td>
              <td style="padding: 6px 0; font-weight: 600; color: #1a1a1a;">${time}</td>
            </tr>
          </table>
          <p style="color: #555; margin-top: 16px;">We'll send a calendar invite shortly. Looking forward to speaking with you!</p>
        </div>
      `,
    });

    if (error) {
      console.error("❌ Resend error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 502 });
    }

    console.log("✅ Booking confirmation sent:", data?.id);
    return NextResponse.json({ ok: true, id: data?.id });
  } catch (err: any) {
    console.error("❌ book-meeting route error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
