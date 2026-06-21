import { Header } from "@/components/landing/header";
import { HeroSection } from "@/components/landing/hero-section";
import { IndustriesSection } from "@/components/landing/industries-section";
import { FeatureHighlightsSection } from "@/components/landing/feature-highlights-section";
import { BenefitsSection } from "@/components/landing/benefits-section";
import { DemoSection } from "@/components/landing/demo-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { IntegrationsSection } from "@/components/landing/integrations-section";
import { FAQSection } from "@/components/landing/faq-section";
import { FinalCTASection } from "@/components/landing/final-cta-section";
import { Footer } from "@/components/landing/footer";
import { BookDemoModal } from "@/components/landing/book-demo-modal";

export default function CatchVisitorsLanding() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <IndustriesSection />
        <FeatureHighlightsSection />
        <BenefitsSection />
        <DemoSection />
        <HowItWorksSection />
        <IntegrationsSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
      <BookDemoModal />
    </div>
  );
}
