import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { MeetingsHero } from "@/components/product/meetings-hero";
import { FeatureRow } from "@/components/product/feature-row";
import { SchedulerCard } from "@/components/product/scheduler-card";
import { ChatCard, InlineBooker } from "@/components/product/chat-card";
import { EmailCard } from "@/components/product/email-card";
import { UseCasesSection } from "@/components/product/use-cases-section";
import { AskIslaPill } from "@/components/product/ask-isla-pill";

export default function ProductMeetingsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <MeetingsHero />

      <FeatureRow
        title="Turn website forms and buttons into quick pipeline."
        description="Isla knows when qualified buyers are on your website. With this insight, she can invite them to schedule a meeting once a form or CTA button is submitted and accelerate speed-to-lead."
        visual={
          <div className="relative h-[300px] md:h-[320px]">
            <AskIslaPill className="absolute -top-3 -right-3 z-10" />
            <div className="absolute top-0 left-0 bg-[#544CD1] text-white text-xs font-semibold px-4 py-2 rounded-full shadow-md">
              Contact sales
            </div>
            <SchedulerCard
              greeting="Let's book some time!"
              subtext="Ready to connect with our sales team? Select a 1-hour time slot with your dedicated sales rep."
              className="absolute top-12 left-0 w-full"
            />
          </div>
        }
      />

      <FeatureRow
        reverse
        title="Book meetings in the moment during live chat."
        description="When Isla has a qualified buyer hooked into a conversation, she can serve the meeting booker in context and get the next meeting scheduled before they leave the website."
        visual={
          <ChatCard
            messages={[
              { from: "isla", text: "Welcome back, Jen! 👋 Any questions I can answer for you today?" },
              { from: "visitor", text: "How do I get my AI agent to support multiple languages?" },
              {
                from: "isla",
                text: "Great question! Isla supports 50+ languages out of the box 🌍 Let's schedule time with your account executive, Kyle, to talk through all the details.",
              },
            ]}
            booker={<InlineBooker rep="Kyle Smith" title="Account Executive" />}
          />
        }
      />

      <FeatureRow
        title="Convert buyers directly in the email inbox."
        description="As Isla emails your inbound leads, whether it's to nurture them with content or follow up, she always includes a meeting link to drive buyers toward conversion."
        visual={
          <EmailCard
            subject="Webinar registration confirmed!"
            recipient="Jen"
            recipientEmail="jen@northwindclinics.com"
            action="Schedule a meeting"
          >
            <p>
              Hi Jen! Thanks for registering for our upcoming webinar. I thought you might
              also be interested in our new ebook:{" "}
              <span className="text-[#544CD1] underline">Scaling Inbound with AI Agents</span>.
              If you have any questions, our team is standing by ready to connect.
            </p>
          </EmailCard>
        }
      />

      <UseCasesSection
        heading="Isla packs sales rep calendars with high-quality meetings."
        description="Skip the asynchronous scheduling cycles. Instead, Isla qualifies buyers, routes them to their assigned sales rep, and books time instantly. Plus, she deflects unqualified buyers to keep your sales teams focused."
        cases={[
          {
            title: "High-intent activity",
            description:
              "Isla sees when a target account is showing high-intent behavior, then instantly presents the option to book time.",
            steps: ["Target account visits pricing page", "Isla proactively greets the buyer & presents the meeting booker"],
            preview: (
              <div className="bg-white rounded-xl p-4 shadow-md">
                <div className="text-xs font-semibold text-gray-900">
                  Exploring pricing? Let's schedule time with a dedicated account executive.
                </div>
              </div>
            ),
          },
          {
            title: "Buyer deflection",
            description:
              "When a buyer submits a webform, Isla determines if they're qualified and deflects those who don't meet your buying criteria.",
            steps: ["Non-ICP buyer submits webform", "Isla scores visitor data & disqualifies buyer"],
            preview: (
              <div className="bg-white rounded-xl p-4 shadow-md">
                <div className="text-xs font-semibold text-gray-900">
                  Thanks, someone from our team will be in touch.
                </div>
              </div>
            ),
          },
          {
            title: "Content download",
            description:
              "Isla will immediately follow up with buyers who request content and include a meeting link in an effort to keep them engaged.",
            steps: ["Buyer requests content on the website", "Isla follows up over email with the requested content and a meeting link"],
            preview: (
              <div className="bg-white rounded-xl p-4 shadow-md">
                <div className="text-xs font-semibold text-gray-900">
                  Here's the ebook you requested. If you want to learn more, let's book time!
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
