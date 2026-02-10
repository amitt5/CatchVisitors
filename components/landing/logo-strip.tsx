export function LogoStrip() {
  const logos = [
    "Morrison & Hart",
    "Reeves Immigration",
    "Pinnacle Realty",
    "Clarke Consulting",
    "Westfield Mortgage",
    "Baker & Associates"
  ];

  return (
    <section className="py-16 text-center border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-9">
          Trusted by firms across professional services
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center opacity-35">
          {logos.map((logo) => (
            <span
              key={logo}
              className="text-base text-center whitespace-nowrap"
              style={{ fontFamily: 'var(--font-serif, Georgia, serif)' }}
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
