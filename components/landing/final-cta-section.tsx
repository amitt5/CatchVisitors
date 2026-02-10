import { Button } from "@/components/ui/button";

export function FinalCTASection() {
  return (
    <section className="py-24 md:py-32 text-center relative overflow-hidden">
      <div
        className="absolute -top-24 left-1/10 w-[500px] h-[500px] rounded-full blur-[120px] opacity-35 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #fecaca, #fda4af, transparent 70%)' }}
      />
      <div
        className="absolute -bottom-20 right-1/10 w-96 h-96 rounded-full blur-[120px] opacity-35 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #ddd6fe, #c4b5fd, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <h2
          className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight tracking-tight mb-4"
          style={{ fontFamily: 'var(--font-serif, Georgia, serif)' }}
        >
          Stop losing visitors.<br />Start booking clients.
        </h2>
        <p className="text-lg text-gray-600 mb-10 max-w-md mx-auto leading-relaxed">
          Your competitors' websites have a contact form.<br />Yours will have a conversation.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-gray-900 hover:bg-gray-800 text-white rounded-full px-12 py-6 text-base font-medium shadow-lg transition-all duration-300 group"
        >
          <a href="#try-it" className="flex items-center gap-2">
            Try It With Your Website
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </Button>
      </div>
    </section>
  );
}
