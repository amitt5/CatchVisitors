import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { SlackHero } from "@/components/product/slack-hero";
import { SlackUnveilBanner } from "@/components/product/slack-unveil-banner";
import { TrustLogosSection } from "@/components/product/trust-logos-section";
import { TeammateCardsSection } from "@/components/product/teammate-cards-section";
import { FeatureRow } from "@/components/product/feature-row";
import { SlackThreadMock } from "@/components/product/slack-thread-mock";

export default function ProductSlackPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <SlackHero />
      <SlackUnveilBanner />
      <TrustLogosSection heading="Trusted by hundreds of CatchVisitors customers" />
      <TeammateCardsSection />

      <section className="bg-[#f7f7fa] pt-20 px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#02524b] mb-4">
          Where human and agent teamwork happens.
        </h2>
        <p className="text-[#02524b]/70 text-base leading-relaxed max-w-2xl mx-auto">
          With Isla for Slack, you have a teammate who's ready and willing to help you
          win. She's available 24x7, she's all-knowing about your business, and she can
          surface rich insights, instantly.
        </p>
      </section>

      <div className="bg-[#f7f7fa]">
        <FeatureRow
          id="slack-sales"
          title="Sales teams, say hello to your partner in crime."
          description="Because Isla integrates with Slack, sales teams can accelerate the path to “closed-won.” Isla gives them immediate access to all the information they need to perfect their first call and stay ahead of every deal."
          visual={
            <SlackThreadMock
              channel="# isla-the-ai-agent"
              messages={[
                {
                  from: "Isla the AI Agent",
                  time: "11:23 AM",
                  text: (
                    <>
                      I just booked you a meeting with <strong>Jen Anders</strong> from
                      Northwind Clinics. Here's what you need to know.
                      <br />
                      <strong>Lead summary:</strong> Jen is the VP of Finance at Northwind
                      Clinics. She clicked through our "Make the switch" landing page,
                      then booked a demo. She's also registered for our upcoming
                      "Payments & Pivot" event.
                    </>
                  ),
                },
                { from: "Kyle Smith", time: "11:25 AM", text: "Got it. Thanks Isla!" },
                {
                  from: "Isla the AI Agent",
                  time: "11:26 AM",
                  text: "Jen is also a target account in our CRM, and she's currently browsing our pricing page. I'll keep you posted on any changes.",
                },
              ]}
            />
          }
        />

        <FeatureRow
          id="slack-marketers"
          reverse
          title="Marketers, rejoice! Managing an AI agent has never been easier."
          description="Free your marketing team of disorganized, siloed data. Now they have full visibility into Isla's performance and how she delivers real business results, right at their fingertips."
          visual={
            <SlackThreadMock
              channel="# isla-the-ai-agent"
              messages={[
                {
                  from: "Isla the AI Agent",
                  time: "9:02 AM",
                  text: (
                    <>
                      This month I engaged 237 accounts, had 624 conversations on our
                      website and email, and 147 emails that resulted in 25 meetings.
                      Here are the biggest opportunities sourced:
                      <br />
                      <span className="text-gray-500">
                        Northwind Clinics — $79K · Vantage Realty — $53K · Acme Logistics
                        — $32K · Borealis Health — $29K
                      </span>
                    </>
                  ),
                },
              ]}
            />
          }
        />
      </div>

      <Footer />
    </div>
  );
}
