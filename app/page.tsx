import { Header } from "@/components/landing/header";
import { HeroSection } from "@/components/landing/hero-section";
import { ProblemSection } from "@/components/landing/problem-section";
import { DemoSection } from "@/components/landing/demo-section";
import { BenefitsSection } from "@/components/landing/benefits-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { EdgeSection } from "@/components/landing/edge-section";
import { ROISection } from "@/components/landing/roi-section";
import { FAQSection } from "@/components/landing/faq-section";
import { FinalCTASection } from "@/components/landing/final-cta-section";
import { Footer } from "@/components/landing/footer";

export default function CatchVisitorsLanding() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ProblemSection />
        <DemoSection />
        <BenefitsSection />
        <HowItWorksSection />
        <EdgeSection />
        <ROISection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}
