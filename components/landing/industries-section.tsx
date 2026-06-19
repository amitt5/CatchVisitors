import Link from "next/link";
import { Hotel, Stethoscope, Factory, Briefcase, ArrowRight } from "lucide-react";

const industries = [
  {
    icon: Hotel,
    name: "Hospitality",
    pitch: "Room bookings, concierge questions, multilingual guests.",
    href: "/hotels",
  },
  {
    icon: Stethoscope,
    name: "Healthcare & Clinics",
    pitch: "Appointment booking, intake questions, after-hours coverage.",
    href: "/chiro",
  },
  {
    icon: Factory,
    name: "Industrial & B2B",
    pitch: "Product lookup, spec sheets, routing to the right rep.",
    href: "/navank",
  },
  {
    icon: Briefcase,
    name: "Professional Services",
    pitch: "Consultation booking, lead qualification, instant answers.",
    href: "/strategence",
  },
];

export function IndustriesSection() {
  return (
    <section id="industries" className="py-16 bg-white border-t border-b border-[#02524b]/10">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-xs font-medium text-[#02524b]/50 uppercase tracking-widest text-center mb-10">
          Already live across industries
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {industries.map((industry) => (
            <Link
              key={industry.name}
              href={industry.href}
              className="group p-6 bg-white border border-[#02524b]/10 rounded-2xl transition-all duration-300 hover:border-[#b5d627] hover:-translate-y-1 hover:shadow-md"
            >
              <div className="w-10 h-10 rounded-lg bg-[#f0f8f3] flex items-center justify-center mb-5">
                <industry.icon className="w-5 h-5 text-[#02524b]" strokeWidth={1.5} />
              </div>
              <h3
                className="text-lg font-normal mb-2 text-[#02524b]"
                style={{ fontFamily: 'var(--font-serif, Georgia, serif)' }}
              >
                {industry.name}
              </h3>
              <p className="text-sm text-[#02524b]/70 leading-relaxed mb-4">
                {industry.pitch}
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#02524b] group-hover:gap-2.5 transition-all">
                View live demo
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
