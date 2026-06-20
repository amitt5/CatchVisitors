const TEAMMATE_EXCHANGES = [
  {
    name: "Sarah Smith",
    question: "Is anyone meeting with Figma at 10 AM?",
    reply: "Figma is interested in enterprise solutions. Buyer intent spiked after a recent product page visit.",
  },
  {
    name: "Tyler Robinson",
    question: "How many emails did you send this morning?",
    reply: "This week, I sent 23 emails that resulted in 11 booked meetings. Of those meetings, 4 are with target accounts.",
  },
  {
    name: "Olivia Garcia",
    question: "I need to touch base with Asana — any tips on how to handle?",
    reply: "The Asana account is mostly engaged in our corporate plan. Relevant content to share would be our pricing page.",
  },
  {
    name: "Daniel Jones",
    question: "Did Northwind pick up our latest content?",
    reply: "Northwind is struggling with CRM integration, specifically expense management and platform visibility.",
  },
];

export function TeammateCardsSection() {
  return (
    <section className="px-6 py-20">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#02524b] mb-4">
          Let's treat AI agents like teammates, not tools.
        </h2>
        <p className="text-[#02524b]/70 text-base leading-relaxed max-w-2xl mx-auto">
          In the era of agentic marketing, AI SDR agents are here to stay. Now your teams
          can have two-way conversations with Isla directly in Slack, their most
          important work channel, to unlock their full productivity and potential.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {TEAMMATE_EXCHANGES.map((t) => (
          <div key={t.name} className="bg-white rounded-xl border border-black/[0.06] shadow-sm p-4">
            <div className="flex items-center gap-2 mb-2.5">
              <div className="w-6 h-6 rounded-md bg-gray-200 shrink-0" />
              <span className="text-xs font-semibold text-gray-900">{t.name}</span>
            </div>
            <p className="text-xs text-gray-700 mb-3">{t.question}</p>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-md bg-[#02524b] text-white flex items-center justify-center text-[9px] font-semibold shrink-0">
                IS
              </div>
              <span className="text-xs font-semibold text-gray-900">Isla the AI Agent</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">{t.reply}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
