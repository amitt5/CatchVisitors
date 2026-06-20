const LOGOS = [
  "Northwind Clinics",
  "Vantage Realty",
  "Acme Logistics",
  "Borealis Health",
  "Lumio",
  "Brightwave Co",
];

export function TrustLogosSection({ heading }: { heading: string }) {
  return (
    <section className="px-6 py-16">
      <p className="text-center text-sm font-medium text-[#02524b]/60 mb-8">{heading}</p>
      <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
        {LOGOS.map((logo) => (
          <span key={logo} className="text-lg font-semibold text-[#02524b]/30">
            {logo}
          </span>
        ))}
      </div>
    </section>
  );
}
