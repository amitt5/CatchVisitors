import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How long does setup take?",
    answer:
      "48-72 hours after your 30-minute voice recording session. You'll be live by end of week.",
  },
  {
    question: "What if the AI gives wrong information?",
    answer:
      'You approve all answers during setup. It clearly states "this is not legal advice, for informational purposes only." If it doesn\'t know something, it says "That\'s a great question for a consultation—would you like to book one?"',
  },
  {
    question: "Do I need technical skills?",
    answer:
      "No. We handle everything. You do one 30-minute recording call, we do the rest. Then it just lives on your site.",
  },
  {
    question: "What if visitors don't use it?",
    answer:
      "Industry benchmarks: 3-7% of website visitors engage with voice assistants. That's 3-7 conversations per 100 visitors. Even ONE extra consultation per month pays for itself.",
  },
  {
    question: "Can I update the information?",
    answer:
      "Yes. You can request updates anytime, or we can give you dashboard access to edit answers yourself.",
  },
  {
    question: "What about privacy and compliance?",
    answer:
      "Fully compliant with legal industry standards. Conversations are encrypted. Clear disclaimers about not being legal advice. GDPR/privacy compliant.",
  },
  {
    question: "What's the pricing?",
    answer:
      "$500 one-time setup (voice cloning, knowledge base, website integration). Then $299/month. Covers up to 200 conversations/month. One employment case covers a full year.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-16 md:py-24 bg-secondary/50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            Common Questions
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white rounded-lg border border-border shadow-sm px-6 data-[state=open]:shadow-md transition-shadow"
            >
              <AccordionTrigger className="text-left font-semibold text-foreground hover:text-[#2563EB] hover:no-underline py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
