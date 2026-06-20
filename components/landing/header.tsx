"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Mic, ChevronDown } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const PRODUCT_LINKS = [
  { href: "/product/email", title: "Isla Email", description: "Engage inbound leads in the inbox" },
  { href: "/product/meetings", title: "Isla Meetings", description: "Instantly schedule sales meetings" },
  { href: "/product/offers", title: "Isla Offers", description: "Serve personalized marketing content" },
  { href: "/product/slack", title: "Isla for Slack", description: "Collaborate with Isla directly in Slack" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinksBeforeProduct = [
    { href: "#industries", label: "Industries" },
    { href: "#how-it-works", label: "How It Works" },
  ];

  const navLinksAfterProduct = [
    { href: "#faq", label: "FAQ" },
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
          <div className="w-7 h-7 rounded-lg bg-[#02524b] flex items-center justify-center">
            <Mic className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
          </div>
          <span
            className="text-xl font-normal text-[#02524b]"
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
                className="text-sm text-[#02524b]/70 hover:text-[#02524b] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </SignedIn>
          <SignedOut>
            {navLinksBeforeProduct.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-[#02524b]/70 hover:text-[#02524b] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div
              className="relative"
              onMouseEnter={() => setProductOpen(true)}
              onMouseLeave={() => setProductOpen(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1 text-sm text-[#02524b]/70 hover:text-[#02524b] transition-colors"
              >
                Product
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {productOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-72">
                  <div className="bg-white rounded-2xl shadow-xl border border-black/[0.06] p-2">
                    {PRODUCT_LINKS.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block rounded-xl px-4 py-3 hover:bg-[#02524b]/5 transition-colors"
                      >
                        <div className="text-sm font-semibold text-[#02524b]">{item.title}</div>
                        <div className="text-xs text-[#02524b]/60 mt-0.5">{item.description}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {navLinksAfterProduct.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-[#02524b]/70 hover:text-[#02524b] transition-colors"
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
              className="text-sm text-[#02524b]/70 hover:text-[#02524b] transition-colors"
            >
              Login
            </Link>
            <Button
              asChild
              className="bg-[#b5d627] hover:bg-[#a3c322] text-[#02524b] rounded-full text-sm font-semibold py-2 px-5 h-auto"
            >
              <a href="#try-it">Try Demo</a>
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden p-2 text-[#02524b]"
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
                  className="text-sm text-[#02524b]/70 hover:text-[#02524b] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </SignedIn>
            <SignedOut>
              {navLinksBeforeProduct.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[#02524b]/70 hover:text-[#02524b] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div>
                <div className="text-sm font-semibold text-[#02524b] mb-2">Product</div>
                <div className="flex flex-col gap-2 pl-2">
                  {PRODUCT_LINKS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-sm text-[#02524b]/70 hover:text-[#02524b] transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
              {navLinksAfterProduct.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[#02524b]/70 hover:text-[#02524b] transition-colors"
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
                className="rounded-full w-full border-[#02524b]/20 text-[#02524b]"
              >
                <Link href="/sign-in">Login</Link>
              </Button>
              <Button
                asChild
                className="bg-[#b5d627] hover:bg-[#a3c322] text-[#02524b] font-semibold rounded-full w-full"
              >
                <a href="#try-it" onClick={() => setMobileMenuOpen(false)}>Try Demo</a>
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
