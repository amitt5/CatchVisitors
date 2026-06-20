import { NextResponse } from "next/server";
import { Resend } from "resend";

// Where booking notifications are delivered (the "business owner").
const RECIPIENT = "amitgyl@gmail.com";
// Must be a verified domain in your Resend account.
const FROM = "Isla <isla@insightsim.ai>";

export async function POST(request: Request) {
  try {
    const { day, time } = await request.json();

    if (!day || !time) {
      return NextResponse.json(
        { error: "Missing day or time" },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("❌ RESEND_API_KEY is not set");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: FROM,
      to: RECIPIENT,
      subject: `New demo booking — ${day} at ${time}`,
      html: `
        <div style="font-family: -apple-system, Segoe UI, Roboto, sans-serif; max-width: 480px; margin: 0 auto;">
          <h2 style="color: #544CD1; margin-bottom: 4px;">New demo booked via Ask Isla</h2>
          <p style="color: #555; margin-top: 0;">A visitor scheduled a demo through the website widget.</p>
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
        </div>
      `,
    });

    if (error) {
      console.error("❌ Resend error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 502 });
    }

    console.log("✅ Booking email sent:", data?.id);
    return NextResponse.json({ ok: true, id: data?.id });
  } catch (err: any) {
    console.error("❌ book-meeting route error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
