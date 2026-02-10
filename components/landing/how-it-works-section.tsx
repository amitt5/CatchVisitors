export function HowItWorksSection() {
  const steps = [
    {
      number: "1",
      title: "We build it",
      description: "We analyze your website, services, and FAQs to create a custom voice assistant trained on your practice. Setup is free."
    },
    {
      number: "2",
      title: "You embed it",
      description: "Drop a single line of code on your site. The voice widget appears and starts engaging visitors immediately."
    },
    {
      number: "3",
      title: "Bookings flow in",
      description: "Visitors talk, get qualified, and land on your calendar. You get transcripts and lead data in your inbox and CRM."
    }
  ];

  return (
    <section
      id="how-it-works"
      className="py-24 md:py-32 bg-white border-t border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4 block">
            How It Works
          </span>
          <h2
            className="text-4xl md:text-5xl font-normal leading-tight tracking-tight"
            style={{ fontFamily: 'var(--font-serif, Georgia, serif)' }}
          >
            Live on your site in one afternoon
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative">
              <div
                className="w-14 h-14 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center mx-auto mb-6 text-2xl font-normal relative z-10"
                style={{ fontFamily: 'var(--font-serif, Georgia, serif)' }}
              >
                {step.number}
              </div>
              <h3
                className="text-xl md:text-2xl font-normal mb-2.5"
                style={{ fontFamily: 'var(--font-serif, Georgia, serif)' }}
              >
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
