import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { OffersHero } from "@/components/product/offers-hero";
import { FeatureRow } from "@/components/product/feature-row";
import { ContentAuditMock } from "@/components/product/content-audit-mock";
import { EventChatMock } from "@/components/product/event-chat-mock";
import { OrgChartMock } from "@/components/product/org-chart-mock";
import { EmailCard } from "@/components/product/email-card";
import { UseCasesSection } from "@/components/product/use-cases-section";

export default function ProductOffersPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <OffersHero />

      <FeatureRow
        title="Serve unique, dynamic AI offers to every buyer."
        description="Buyers have different needs based on their buying journey. Knowing this, Isla the AI Agent will audit your entire content library and then surface the best content to maximize engagement."
        visual={<ContentAuditMock />}
      />

      <FeatureRow
        reverse
        title="Present AI offers at the right time and place."
        description="Isla nurtures buyers beyond the inbox — she can also present offers during a live conversation. Plus, you can serve offers on the website as banners, side pops, or overlays."
        visual={<EventChatMock />}
      />

      <FeatureRow
        title="Nurture the buying committee, not just the individual buyer."
        description="B2B buying involves many people, priorities, and opinions. With a holistic view of each account, Isla the AI Agent intelligently serves personalized content to each stakeholder to tailor their experience."
        visual={<OrgChartMock company="Northwind Clinics" />}
      />

      <UseCasesSection
        heading="Isla the AI Agent serves the best marketing offers to keep buyers engaged."
        description="Nurturing B2B buyers is hard; there's disconnected data, erratic funnel movement, and impersonal messaging. Isla knows exactly where, when, and how to surface content that resonates, and she does it at scale."
        cases={[
          {
            title: "Content nurture",
            description:
              "Isla understands where each buyer is in their journey and then serves the most relevant content to move them through the funnel.",
            steps: [
              "Isla captures an upper-funnel lead",
              "Isla emails thought-leadership content to warm up low-intent buyers",
            ],
            preview: (
              <EmailCard
                subject="New report available now!"
                recipient="Jen"
                recipientEmail="jen@northwindclinics.com"
                action="Let's book time!"
                className="shadow-md"
              >
                <p className="text-xs">
                  Hi Jen! We thought you might be interested in the new report that was
                  just published. If you'd like to chat about the details, our team is
                  ready to connect.
                </p>
              </EmailCard>
            ),
          },
          {
            title: "Event promotion",
            description:
              "Isla can promote upcoming sponsored events to help drive registration with the most suitable buyers.",
            steps: ["Target account arrives on the website", "Isla presents a custom event invite"],
            preview: (
              <div className="bg-[#1a1a1a] text-white rounded-xl p-4 shadow-md">
                <div className="text-xs font-semibold mb-1">You're invited!</div>
                <div className="text-[11px] text-white/70 mb-2">
                  Join us at "Scaling Inbound" as we explore better ways to manage pipeline.
                </div>
                <div className="bg-white text-[#1a1a1a] text-[11px] font-medium text-center py-1.5 rounded-md">
                  Register now
                </div>
              </div>
            ),
          },
          {
            title: "Exit intent",
            description:
              "Isla recognizes when a website visitor is about to depart and then quickly serves custom content to keep them engaged.",
            steps: [
              "Known lead visits the website",
              "Isla observes browsing behavior",
              "Isla serves custom content before they leave",
            ],
            preview: (
              <div className="bg-white rounded-xl p-4 shadow-md">
                <div className="text-xs font-semibold text-gray-900 mb-1">
                  Vantage Realty boosts efficiency with Isla
                </div>
                <div className="text-[11px] text-gray-500 mb-2">
                  Before you go, check out this case study on growth, expense management,
                  and planning.
                </div>
                <div className="bg-[#1a1a1a] text-white text-[11px] font-medium text-center py-1.5 rounded-md">
                  Read the story
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
