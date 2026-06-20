import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { EmailHero } from "@/components/product/email-hero";
import { FeatureRow } from "@/components/product/feature-row";
import { EmailCard } from "@/components/product/email-card";
import { UseCasesSection } from "@/components/product/use-cases-section";
import { AskIslaPill } from "@/components/product/ask-isla-pill";

export default function ProductEmailPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <EmailHero />

      <FeatureRow
        id="email-followup"
        title="Instantly follow up with high-intent leads."
        description="Isla reduces response times from days to minutes by sending an immediate AI email the moment a high-intent lead requests to connect with your team."
        visual={
          <EmailCard
            subject="Sales request received!"
            recipient="Jen"
            recipientEmail="jen@northwindclinics.com"
            action="Schedule a meeting"
          >
            <p>
              Hi Jen! We received your request to speak with our sales team. Your dedicated
              sales rep, Kyle, is standing by. Please choose a date and time that's
              convenient for you using the link below.
            </p>
          </EmailCard>
        }
      />

      <FeatureRow
        id="email-nurture"
        reverse
        title="Nurture warm leads with curated content."
        description="Isla observes changing buyer signals in real time then makes intelligent decisions about when, where, and how to nurture buyers down the funnel."
        cta="Explore agentic nurture"
        visual={
          <div className="relative h-[280px] md:h-[320px]">
            <EmailCard
              subject="New report available now!"
              recipient="Jen"
              recipientEmail="jen@northwindclinics.com"
              className="absolute top-0 left-0 w-[88%] opacity-50 scale-95"
            >
              <p>We thought you might be interested in our new report.</p>
            </EmailCard>
            <EmailCard
              subject="How Vantage Realty cut response time with Isla"
              recipient="Jen"
              recipientEmail="jen@northwindclinics.com"
              className="absolute top-8 left-[6%] w-[88%] opacity-75 scale-[0.975]"
            >
              <p>See how Isla helped Vantage Realty respond to leads 10x faster.</p>
            </EmailCard>
            <EmailCard
              subject="Join us for an exclusive event on May 21st"
              recipient="Jen"
              recipientEmail="jen@northwindclinics.com"
              action="Register now"
              className="absolute top-16 left-[12%] w-[88%]"
            >
              <p>
                Hi Jen! Our next "Scaling Inbound" event is coming up in a few weeks, and
                we'd like to see you there. Join us as we tackle some delicious
                refreshments and explore the ways AI is changing the sales floor.
              </p>
            </EmailCard>
          </div>
        }
      />

      <FeatureRow
        id="email-reply"
        title="Reply to buyers with zero downtime."
        description="When buyers respond to Isla over email, she taps into her rich knowledge base to generate a contextual AI-generated reply that keeps the conversation moving forward."
        visual={
          <div className="relative h-[320px] md:h-[360px]">
            <AskIslaPill className="absolute -top-3 -right-3 z-10" />
            <EmailCard
              subject="Sales request received!"
              recipient="Jen"
              recipientEmail="jen@northwindclinics.com"
              className="absolute top-0 left-0 w-[90%] opacity-50 scale-95"
            >
              <p>Hi Jen! We received your request to speak with our sales team.</p>
            </EmailCard>
            <EmailCard
              subject="RE: Sales request received!"
              recipient="Jen"
              recipientEmail="jen@northwindclinics.com"
              className="absolute top-12 left-[5%] w-[90%] opacity-75 scale-[0.975]"
            >
              <p>
                Hi Isla! I booked time with the sales team, but I have some pressing
                questions about CRM integrations. Can you clarify whether you support a
                direct Salesforce sync, or just a CSV export?
              </p>
            </EmailCard>
            <EmailCard
              subject="RE: RE: Sales request received!"
              recipient="Jen"
              recipientEmail="jen@northwindclinics.com"
              className="absolute top-24 left-[10%] w-[90%]"
            >
              <p>
                Hi Jen! Good question. We support a direct two-way sync with Salesforce
                and HubSpot, plus CSV export if you ever need it. I'll be sure to relay
                these details to your rep, Kyle, so he knows it's a priority before your
                meeting.
              </p>
            </EmailCard>
          </div>
        }
      />

      <UseCasesSection
        heading="Isla sends personalized AI emails across the entire funnel, effortlessly."
        description="Isla manages your email campaigns for you. That means no more workflows, A/B testing, or performance analysis. She dynamically optimizes every email in real time, driving buyers toward conversion."
        cases={[
          {
            title: "Contact sales",
            description:
              "When a high-intent buyer is ready to move forward, Isla sends an instant email to get a meeting on the books.",
            steps: ["Buyer submits \"contact sales\" webform", "Isla scans visitor data & generates email"],
            preview: (
              <div className="bg-white rounded-xl p-4 shadow-md">
                <div className="text-xs font-semibold text-gray-900">
                  Sales request received! Let's get a meeting on the books.
                </div>
              </div>
            ),
          },
          {
            title: "Event follow-up",
            description:
              "After an event has passed, Isla will follow up with upper-funnel leads to keep them warm and engaged.",
            steps: ["Lead is captured at an event", "Isla scans visitor data & generates email"],
            preview: (
              <div className="bg-white rounded-xl p-4 shadow-md">
                <div className="text-xs font-semibold text-gray-900">
                  How was the event? Let's keep the conversation going.
                </div>
              </div>
            ),
          },
          {
            title: "High-intent",
            description:
              "When Isla sees high-intent website activity, she'll quickly send an email follow-up with the option to book time.",
            steps: ["Buyer browses pricing page", "Isla scans visitor data & generates email"],
            preview: (
              <div className="bg-white rounded-xl p-4 shadow-md">
                <div className="text-xs font-semibold text-gray-900">
                  Exploring pricing? Our sales team is standing by!
                </div>
              </div>
            ),
          },
        ]}
      />

      <Footer />
    </div>
  );
}
