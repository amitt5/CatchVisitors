import Link from "next/link";
import { Mic } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gray-900 flex items-center justify-center">
              <Mic className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
            </div>
            <span
              className="text-xl font-normal"
              style={{ fontFamily: 'var(--font-serif, Georgia, serif)' }}
            >
              CatchVisitors
            </span>
          </Link>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600">
            <a href="#how-it-works" className="hover:text-gray-900 transition-colors">
              How It Works
            </a>
            <a href="#features" className="hover:text-gray-900 transition-colors">
              Features
            </a>
            <a href="#pricing" className="hover:text-gray-900 transition-colors">
              Pricing
            </a>
            <a href="#faq" className="hover:text-gray-900 transition-colors">
              FAQ
            </a>
            <a
              href="mailto:hello@catchvisitors.com"
              className="hover:text-gray-900 transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Copyright */}
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} CatchVisitors
          </p>
        </div>
      </div>
    </footer>
  );
}
