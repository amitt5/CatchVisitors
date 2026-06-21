import { BookDemoButton } from "@/components/landing/book-demo-button";

export function FinalCTASection() {
  return (
    <section className="py-24 md:py-32 text-center relative overflow-hidden bg-[#02524b]">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <h2
          className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight tracking-tight mb-4 text-white"
          style={{ fontFamily: 'var(--font-serif, Georgia, serif)' }}
        >
          Turn website intent<br />into qualified pipeline.
        </h2>
        <p className="text-lg text-white/70 mb-10 max-w-md mx-auto leading-relaxed">
          Your competitors' websites have a contact form.<br />Yours will qualify, route, and book in real time.
        </p>
        <BookDemoButton
          size="lg"
          className="bg-[#b5d627] hover:bg-[#a3c322] text-[#02524b] rounded-full px-12 py-6 text-base font-semibold shadow-lg transition-all duration-300 group"
        >
          Book a demo
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </BookDemoButton>
      </div>
    </section>
  );
}
