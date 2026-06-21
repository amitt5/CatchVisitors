import { WebsiteOfferMock } from "@/components/product/website-offer-mock";
import { AskIslaPill } from "@/components/product/ask-isla-pill";

export function OffersHero() {
  return (
    <section className="pt-32 md:pt-40 px-6">
      <div className="max-w-6xl mx-auto">
        <div
          className="relative rounded-3xl overflow-hidden px-8 md:px-14 py-14 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
          style={{ background: "linear-gradient(135deg, #02524B 0%, #2E9F6E 100%)" }}
        >
          <AskIslaPill className="absolute top-6 right-6" />

          <WebsiteOfferMock />

          <div className="text-white">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight leading-[1.1] mb-5">
              Nurture and convert buyers with personalized AI offers.
            </h1>
            <p className="text-white/80 text-base md:text-lg leading-relaxed mb-8">
              Don't let your valuable marketing content go to waste. Isla the AI Agent
              understands each buyer and dynamically serves the best content to capture
              their interest. Nurturing leads has never been easier.
            </p>
            <button className="bg-white text-[#02524b] text-sm font-semibold px-5 py-3 rounded-full">
              Schedule a demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
