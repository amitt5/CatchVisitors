import { Header } from "@/components/landing/header";
import { HeroSection } from "@/components/landing/hero-section";
import { LogoStrip } from "@/components/landing/logo-strip";
import { DemoSection } from "@/components/landing/demo-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { BenefitsSection } from "@/components/landing/benefits-section";
import { ComparisonSection } from "@/components/landing/comparison-section";
import { ROISection } from "@/components/landing/roi-section";
import { FAQSection } from "@/components/landing/faq-section";
import { FinalCTASection } from "@/components/landing/final-cta-section";
import { Footer } from "@/components/landing/footer";

export default function CatchVisitorsLanding() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />
      <main>
        <HeroSection />
        <LogoStrip />
        <DemoSection />
        <HowItWorksSection />
        <BenefitsSection />
        <ComparisonSection />
        <ROISection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}
