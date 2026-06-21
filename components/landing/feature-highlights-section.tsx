function ContextMockup() {
  return (
    <div className="bg-white border border-[#02524b]/10 rounded-2xl p-6 shadow-md">
      <div className="flex items-center gap-2 mb-5">
        <span className="px-2.5 py-1 bg-[#f0f8f3] border border-[#02524b]/10 rounded-full text-xs text-[#02524b]">
          Returning visitor
        </span>
        <span className="px-2.5 py-1 bg-[#f0f8f3] border border-[#02524b]/10 rounded-full text-xs text-[#02524b]">
          Viewed Pricing · 3×
        </span>
      </div>
      <div className="space-y-2.5">
        <div className="bg-[#f0f8f3] rounded-xl rounded-tl-sm p-3 text-sm text-[#02524b] max-w-[85%]">
          Welcome back! Looks like you've been checking out pricing — want me to walk you through the plans?
        </div>
        <div className="bg-[#02524b] text-white rounded-xl rounded-tr-sm p-3 text-sm max-w-[75%] ml-auto">
          Yeah, what's included in Growth?
        </div>
        <div className="bg-[#f0f8f3] rounded-xl rounded-tl-sm p-3 text-sm text-[#02524b] max-w-[85%]">
          Unlimited seats, HubSpot & Salesforce sync, and lead routing. Want me to connect you with an AE?
        </div>
      </div>
    </div>
  );
}

function CoverageMockup() {
  const languages = ["EN", "NL", "DE", "FR", "ES", "+45"];
  return (
    <div className="bg-white border border-[#02524b]/10 rounded-2xl p-6 shadow-md">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-sm text-[#02524b]">
          <span className="w-1.5 h-1.5 bg-[#b5d627] rounded-full animate-pulse" />
          Live · 2:47 AM
        </div>
        <span className="text-xs text-[#02524b]/50 uppercase tracking-wider">Visitor in Tokyo</span>
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        {languages.map((lang) => (
          <span
            key={lang}
            className={`px-3 py-1.5 rounded-full text-xs font-medium ${
              lang === "+45" ? "bg-[#f0f8f3] text-[#02524b]/50" : "bg-[#02524b] text-white"
            }`}
          >
            {lang}
          </span>
        ))}
      </div>
      <div className="bg-[#f0f8f3] rounded-xl p-3 text-sm text-[#02524b]">
        営業時間外でも、すぐにお答えします。何かお手伝いできますか？
      </div>
    </div>
  );
}

function BookingMockup() {
  return (
    <div className="bg-white border border-[#02524b]/10 rounded-2xl p-6 shadow-md">
      <div className="grid grid-cols-7 gap-1.5 mb-5">
        {Array.from({ length: 21 }).map((_, i) => (
          <div
            key={i}
            className={`aspect-square rounded-md flex items-center justify-center text-xs ${
              i === 15
                ? "bg-[#02524b] text-white font-medium"
                : "bg-[#f0f8f3] text-[#02524b]/40"
            }`}
          >
            {i + 1}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 bg-[#f0f8f3] border border-[#b5d627]/40 rounded-xl p-3">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#02524b] flex-shrink-0">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <div className="text-sm text-[#02524b]">
          Booked for <span className="font-medium">Thu, 2:00 PM</span> — confirmation sent
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    challenge: "Challenge #1: You can't tell who's on your site",
    title: "Recognize high-intent accounts",
    description: "It knows the page they're on, the account they belong to, and their CRM history — so it engages with real context instead of treating every visitor like a stranger.",
    mockup: ContextMockup,
  },
  {
    challenge: "Challenge #2: Inbound leads go cold",
    title: "Engage every visitor in real time",
    description: "Always-on coverage in 50+ languages. The moment a lead shows intent, the agent is there to answer, qualify, and keep the conversation moving — day or night.",
    mockup: CoverageMockup,
  },
  {
    challenge: "Challenge #3: Handoffs lose context",
    title: "Route to the right rep and book",
    description: "The agent qualifies, picks the right owner from your routing rules, books the meeting on their calendar, and syncs the full transcript to your CRM — all in one conversation.",
    mockup: BookingMockup,
  },
];

export function FeatureHighlightsSection() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 md:mb-28">
          <h2
            className="text-4xl md:text-5xl font-normal leading-tight tracking-tight mb-4 text-[#02524b]"
            style={{ fontFamily: 'var(--font-serif, Georgia, serif)' }}
          >
            More pipeline starts here
          </h2>
          <p className="text-lg text-[#02524b]/70 max-w-xl mx-auto leading-relaxed">
            Inboundly brings account context to every visitor and instant engagement to every high-intent conversation — turning anonymous traffic into qualified pipeline.
          </p>
        </div>

        <div className="space-y-20 md:space-y-28">
          {features.map((feature, index) => {
            const Mockup = feature.mockup;
            const reversed = index % 2 === 1;
            return (
              <div
                key={feature.title}
                className="grid md:grid-cols-2 gap-12 md:gap-16 items-center"
              >
                <div className={reversed ? "md:order-2" : ""}>
                  <div className="flex items-center gap-2.5 mb-4">
                    <span className="w-1 h-4 bg-[#f44b2a] rounded-full" />
                    <span className="text-sm font-semibold text-[#02524b] uppercase tracking-wide">
                      {feature.challenge}
                    </span>
                  </div>
                  <h3
                    className="text-3xl md:text-4xl font-normal mb-4 leading-tight tracking-tight text-[#02524b]"
                    style={{ fontFamily: 'var(--font-serif, Georgia, serif)' }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-lg text-[#02524b]/70 leading-relaxed max-w-md">
                    {feature.description}
                  </p>
                </div>
                <div className={reversed ? "md:order-1" : ""}>
                  <Mockup />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
