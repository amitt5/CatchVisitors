"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Mic } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: "#how-it-works", label: "How It Works" },
    { href: "#features", label: "Features" },
    { href: "#pricing", label: "Pricing" },
    { href: "#testimonials", label: "Testimonials" },
  ];

  const authNavLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/calls", label: "Calls" },
    { href: "/agent", label: "Agent" },
    { href: "/settings", label: "Settings" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 transition-all">
      <div
        className={`max-w-[1200px] mx-auto h-16 px-4 rounded-full flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 backdrop-blur-[20px] border border-black/[0.06] shadow-sm mt-2'
            : 'bg-transparent'
        }`}
      >
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

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <SignedIn>
            {authNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </SignedIn>
          <SignedOut>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </SignedOut>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <SignedOut>
            <Link
              href="/sign-in"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Sign In
            </Link>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-gray-200 text-sm py-2 px-5 h-auto hover:border-gray-900"
            >
              <a href="#try-it">Try Demo</a>
            </Button>
            <Button
              asChild
              className="bg-gray-900 hover:bg-gray-800 text-white rounded-full text-sm py-2 px-5 h-auto"
            >
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden p-2 text-gray-900"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-2xl p-4 mx-6 shadow-lg">
          <nav className="flex flex-col gap-4">
            <SignedIn>
              {authNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </SignedIn>
            <SignedOut>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </SignedOut>
            <SignedOut>
              <Button
                asChild
                variant="outline"
                className="rounded-full w-full"
              >
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button
                asChild
                className="bg-gray-900 text-white rounded-full w-full"
              >
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </SignedOut>
            <SignedIn>
              <div className="flex items-center justify-center pt-2">
                <UserButton />
              </div>
            </SignedIn>
          </nav>
        </div>
      )}
    </header>
  );
}
