import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { PricingTiers, AllPlansInclude } from "@/components/product/pricing-tiers";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section
        id="pricing-top"
        className="pt-36 md:pt-44 pb-12 px-6 text-center scroll-mt-24"
        style={{ background: "linear-gradient(180deg, #f6f1ff 0%, #ffffff 100%)" }}
      >
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#02524b] mb-5">
          Pricing
        </h1>
        <p className="text-[#02524b]/70 text-base md:text-lg max-w-2xl mx-auto mb-8">
          Hire Isla the AI Agent to scale inbound pipeline generation. We'll build a plan
          that's perfectly customized for you and your pipeline needs.
        </p>
        <button className="bg-[#02524B] text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#013F3A] transition-colors">
          Schedule a demo
        </button>
      </section>

      <PricingTiers />
      <AllPlansInclude />

      <Footer />
    </div>
  );
}
