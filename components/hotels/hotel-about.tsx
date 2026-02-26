export function HotelAbout() {
  return (
    <section id="about" className="bg-[#FAFAF5] py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Left: text */}
        <div>
          <span className="text-[#C8A96E] text-xs font-semibold tracking-[0.2em] uppercase">
            About Us
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-serif text-[#1C1A17] leading-tight">
            A Boutique Amsterdam Experience
          </h2>
          <p className="mt-5 text-[#6B6560] leading-relaxed">
            Nestled along the Singel canal, Hotel Haven Amsterdam blends
            historic Dutch architecture with contemporary luxury. Every detail
            — from our hand-picked furnishings to our locally sourced breakfast
            — is designed to make you feel at home in one of Europe's most
            enchanting cities.
          </p>
          <a
            href="#rooms"
            className="inline-block mt-6 text-sm font-medium text-[#C8A96E] border-b border-[#C8A96E] pb-0.5 hover:opacity-75 transition-opacity"
          >
            Explore Rooms →
          </a>
        </div>

        {/* Right: stats */}
        <div className="grid grid-cols-3 gap-8">
          {[
            { value: "4.9★", label: "Guest Rating", sub: "Based on 2,800+ reviews" },
            { value: "12+", label: "Years of Excellence", sub: "Serving guests since 2013" },
            { value: "50K+", label: "Happy Guests", sub: "From over 80 countries" },
          ].map(({ value, label, sub }) => (
            <div key={label} className="flex flex-col">
              <span className="text-3xl md:text-4xl font-serif text-[#1C1A17]">
                {value}
              </span>
              <span className="mt-2 text-sm font-semibold text-[#1C1A17]">
                {label}
              </span>
              <span className="mt-1 text-xs text-[#6B6560] leading-snug">
                {sub}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
