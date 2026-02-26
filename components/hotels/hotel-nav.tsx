"use client";

import { useEffect, useState } from "react";

interface HotelNavProps {
  onOpenVoiceBot: () => void;
}

export function HotelNav({ onOpenVoiceBot }: HotelNavProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#1C1A17]/95 backdrop-blur-sm shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="text-white font-serif text-xl tracking-wide">
          Hotel Haven Amsterdam
        </span>

        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Home", href: "#" },
            { label: "Rooms", href: "#rooms" },
            { label: "Amenities", href: "#amenities" },
            { label: "FAQ", href: "#faq" },
            { label: "Contact", href: "#contact" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-white/80 hover:text-white text-sm tracking-wide transition-colors"
            >
              {label}
            </a>
          ))}
        </div>

        <button
          onClick={onOpenVoiceBot}
          className="bg-[#C8A96E] hover:bg-[#b8996a] text-white text-sm font-medium px-5 py-2 transition-colors"
        >
          Book Now
        </button>
      </div>
    </nav>
  );
}
