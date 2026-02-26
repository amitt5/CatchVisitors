"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "What is included in the room rate?",
    a: "All room rates include complimentary high-speed Wi-Fi, access to our fitness center, and a welcome drink upon arrival. Breakfast is available as an optional add-on or included in select packages.",
  },
  {
    q: "What time is check-in and check-out?",
    a: "Standard check-in is from 3:00 PM and check-out is by 11:00 AM. Early check-in and late check-out can be arranged subject to availability — please contact us in advance.",
  },
  {
    q: "Do you offer airport transfers?",
    a: "Yes, we offer private transfers from Amsterdam Schiphol Airport. Please book at least 48 hours in advance via the hotel concierge or our AI assistant. The journey takes approximately 25–35 minutes.",
  },
  {
    q: "Is breakfast included?",
    a: "Breakfast is not included in our standard rates but can be added for €22 per person per day. Our breakfast buffet features fresh Dutch produce, pastries, eggs, and more — served daily from 7:00 AM to 10:30 AM.",
  },
  {
    q: "Can I bring pets?",
    a: "We love animals! Small pets (up to 10 kg) are welcome in our pet-friendly rooms for a small nightly supplement of €25. Please inform us at the time of booking so we can prepare accordingly.",
  },
];

export function HotelFAQ() {
  return (
    <section id="faq" className="bg-[#FAFAF5]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row">
        {/* Left dark panel */}
        <div className="relative md:w-2/5 min-h-[400px] bg-[#1C1A17] flex flex-col items-center justify-center p-12 overflow-hidden">
          <img
            src="/videos/hotel-room/rijks.jpg"
            alt="Hotel"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          <div className="relative z-10 text-center">
            <span className="text-[#C8A96E] text-xs font-semibold tracking-[0.2em] uppercase">
              FAQ
            </span>
            <h2 className="mt-4 text-5xl md:text-7xl font-serif text-white leading-none">
              FAQ
            </h2>
            <p className="mt-6 text-white/60 text-sm leading-relaxed max-w-xs">
              Everything you need to know right now about your stay at Hotel
              Haven Amsterdam.
            </p>
          </div>
        </div>

        {/* Right accordion */}
        <div className="md:w-3/5 py-16 px-8 md:px-12">
          <span className="text-[#C8A96E] text-xs font-semibold tracking-[0.2em] uppercase">
            Got Questions?
          </span>
          <h3 className="mt-3 text-3xl font-serif text-[#1C1A17] mb-8">
            Everything you need to know right now
          </h3>
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-[#1C1A17] font-medium text-left hover:no-underline hover:text-[#C8A96E] transition-colors">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-[#6B6560] leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
