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
      "We build your custom AI agent in 48-72 hours. Just add the embed code to your website and you're live. No technical skills required.",
  },
  {
    question: "What if the AI gives wrong information?",
    answer:
      'We train it on your website and business info during setup. If it encounters something it doesn\'t know, it gracefully books a consultation instead of guessing. You review and approve the knowledge base before going live.',
  },
  {
    question: "Do I need technical skills?",
    answer:
      "No. We provide a simple embed code snippet. Just paste it into your website (or ask your web person to). It works on any site—WordPress, Wix, custom builds, anywhere.",
  },
  {
    question: "What if visitors don't use it?",
    answer:
      "Even if only 3-5% engage, that's 15-25 conversations per 500 visitors. With voice, conversion is natural—people prefer talking. And remember: we guarantee 3X more bookings or your money back.",
  },
  {
    question: "Can I update the information?",
    answer:
      "Yes. Updates to business hours, services, pricing, etc. are included. You get dashboard access to manage it yourself or request changes from our team.",
  },
  {
    question: "What about privacy and compliance?",
    answer:
      "Fully compliant. All conversations are encrypted and stored securely. GDPR and CCPA compliant. Includes clear disclaimers for professional services. We handle all the legal requirements.",
  },
  {
    question: "What's the pricing?",
    answer:
      "$500 setup (we build your AI agent, train it on your website, integrate with your calendar). Then $399/month for unlimited calls. 30-day free trial. 3X bookings guarantee or your money back.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4 block">
            FAQ
          </span>
          <h2
            className="text-4xl md:text-5xl font-normal leading-tight tracking-tight"
            style={{ fontFamily: 'var(--font-serif, Georgia, serif)' }}
          >
            Questions? Answered.
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white rounded-xl border border-gray-200 shadow-sm px-6 data-[state=open]:shadow-md transition-all"
            >
              <AccordionTrigger className="text-left font-medium text-gray-900 hover:text-gray-700 hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-5 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
