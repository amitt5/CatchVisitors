import Link from "next/link";
import { Mic } from "lucide-react";

const columns = [
  {
    title: "Product",
    links: [
      { href: "#how-it-works", label: "How It Works" },
      { href: "#features", label: "Features" },
      { href: "#try-it", label: "Live Demo" },
    ],
  },
  {
    title: "Industries",
    links: [
      { href: "/hotels", label: "Hospitality" },
      { href: "/chiro", label: "Healthcare & Clinics" },
      { href: "/navank", label: "Industrial & B2B" },
      { href: "/strategence", label: "Professional Services" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "#faq", label: "FAQ" },
      { href: "mailto:hello@catchvisitors.com", label: "Contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-[#02524b] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        {/* Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-[#b5d627] flex items-center justify-center">
                <Mic className="w-3.5 h-3.5 text-[#02524b]" strokeWidth={2.5} />
              </div>
              <span
                className="text-xl font-normal"
                style={{ fontFamily: 'var(--font-serif, Georgia, serif)' }}
              >
                CatchVisitors
              </span>
            </Link>
            <p className="text-sm text-white/60 max-w-xs leading-relaxed">
              An AI voice & chat agent that answers, qualifies, and books on your website — 24/7, in 50+ languages.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-[#b5d627] mb-4 uppercase tracking-wider">
                {col.title}
              </h4>
              <nav className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/15 text-sm text-white/50">
          <p>&copy; {new Date().getFullYear()} CatchVisitors. All rights reserved.</p>
          <a href="mailto:hello@catchvisitors.com" className="hover:text-white transition-colors">
            hello@catchvisitors.com
          </a>
        </div>
      </div>
    </footer>
  );
}
