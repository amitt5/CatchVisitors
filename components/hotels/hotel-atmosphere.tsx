export function HotelAtmosphere() {
  return (
    <section className="relative h-[60vh] overflow-hidden">
      <img
        src="/videos/hotel-room/canal_suite.png"
        alt="Hotel atmosphere"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
        {/* Play button */}
        <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center mb-6 hover:bg-white/20 transition-colors cursor-pointer">
          <svg
            className="w-6 h-6 text-white ml-1"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[#C8A96E] mb-3">
          Experience Amsterdam&apos;s Finest
        </p>
        <h2 className="text-4xl md:text-5xl font-serif max-w-2xl leading-tight">
          Where Every Stay Becomes a Memory
        </h2>
      </div>
    </section>
  );
}
