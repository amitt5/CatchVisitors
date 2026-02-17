'use client';

import { Space_Mono, DM_Sans, Syne } from 'next/font/google';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-mono'
});

const dmSans = DM_Sans({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-body'
});

const syne = Syne({
  weight: ['700', '800'],
  subsets: ['latin'],
  variable: '--font-display'
});

export default function NavankPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div
      className={`min-h-screen bg-[#0a0a0f] text-white ${spaceMono.variable} ${dmSans.variable} ${syne.variable}`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E")`
      }}
    >
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/10'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a
              href="#"
              className="font-[family-name:var(--font-display)] text-2xl tracking-tight hover:text-[#4a6fa5] transition-colors"
            >
              NAVANK
            </a>

            {/* Nav Links */}
            <div className="flex items-center gap-8">
              <a
                href="#products"
                className="font-[family-name:var(--font-body)] text-sm hover:text-[#4a6fa5] transition-colors"
              >
                Products
              </a>
              <a
                href="#about"
                className="font-[family-name:var(--font-body)] text-sm hover:text-[#4a6fa5] transition-colors"
              >
                About
              </a>
              <a
                href="#team"
                className="font-[family-name:var(--font-body)] text-sm hover:text-[#4a6fa5] transition-colors"
              >
                Team
              </a>
              <a
                href="#contact"
                className="font-[family-name:var(--font-body)] text-sm hover:text-[#4a6fa5] transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 pt-40">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="font-[family-name:var(--font-display)] text-7xl md:text-8xl mb-8 tracking-tight leading-none">
              Passion For Cables
            </h1>
            <p className="font-[family-name:var(--font-body)] text-xl md:text-2xl mb-8 text-gray-300 leading-relaxed">
              One of India&apos;s largest raw material suppliers for optical fiber, data and power cable industries. Trusted by manufacturers across Asia, Europe and the US.
            </p>
          </div>

          <div className="relative h-full min-h-[600px] hidden md:flex items-center justify-center p-10 overflow-hidden">
            <svg
              className="w-full h-full max-h-[520px]"
              viewBox="0 0 500 700"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Animated Lines - More connections for denser network */}
              <line x1="80" y1="80" x2="200" y2="120" stroke="#4a6fa5" strokeWidth="2" opacity="0.5" filter="url(#glow)">
                <animate attributeName="opacity" values="0.5;0.8;0.5" dur="3s" repeatCount="indefinite" />
              </line>
              <line x1="200" y1="120" x2="380" y2="100" stroke="#4a6fa5" strokeWidth="2" opacity="0.5" filter="url(#glow)">
                <animate attributeName="opacity" values="0.5;0.8;0.5" dur="3.5s" repeatCount="indefinite" begin="0.5s" />
              </line>
              <line x1="80" y1="80" x2="150" y2="180" stroke="#4a6fa5" strokeWidth="2" opacity="0.5" filter="url(#glow)">
                <animate attributeName="opacity" values="0.5;0.8;0.5" dur="4s" repeatCount="indefinite" begin="1s" />
              </line>
              <line x1="200" y1="120" x2="250" y2="220" stroke="#4a6fa5" strokeWidth="2" opacity="0.5" filter="url(#glow)">
                <animate attributeName="opacity" values="0.5;0.8;0.5" dur="3.2s" repeatCount="indefinite" begin="0.3s" />
              </line>
              <line x1="380" y1="100" x2="420" y2="200" stroke="#4a6fa5" strokeWidth="2" opacity="0.5" filter="url(#glow)">
                <animate attributeName="opacity" values="0.5;0.8;0.5" dur="3.8s" repeatCount="indefinite" begin="0.7s" />
              </line>
              <line x1="150" y1="180" x2="250" y2="220" stroke="#4a6fa5" strokeWidth="2" opacity="0.5" filter="url(#glow)">
                <animate attributeName="opacity" values="0.5;0.8;0.5" dur="3.3s" repeatCount="indefinite" begin="0.9s" />
              </line>
              <line x1="250" y1="220" x2="340" y2="260" stroke="#4a6fa5" strokeWidth="2" opacity="0.5" filter="url(#glow)">
                <animate attributeName="opacity" values="0.5;0.8;0.5" dur="4.2s" repeatCount="indefinite" begin="1.2s" />
              </line>
              <line x1="340" y1="260" x2="420" y2="200" stroke="#4a6fa5" strokeWidth="2" opacity="0.5" filter="url(#glow)">
                <animate attributeName="opacity" values="0.5;0.8;0.5" dur="3.6s" repeatCount="indefinite" begin="0.4s" />
              </line>
              <line x1="150" y1="180" x2="120" y2="320" stroke="#4a6fa5" strokeWidth="2" opacity="0.5" filter="url(#glow)">
                <animate attributeName="opacity" values="0.5;0.8;0.5" dur="3.9s" repeatCount="indefinite" begin="1.5s" />
              </line>
              <line x1="250" y1="220" x2="180" y2="350" stroke="#4a6fa5" strokeWidth="2" opacity="0.5" filter="url(#glow)">
                <animate attributeName="opacity" values="0.5;0.8;0.5" dur="3.4s" repeatCount="indefinite" begin="0.6s" />
              </line>
              <line x1="340" y1="260" x2="300" y2="380" stroke="#4a6fa5" strokeWidth="2" opacity="0.5" filter="url(#glow)">
                <animate attributeName="opacity" values="0.5;0.8;0.5" dur="4.1s" repeatCount="indefinite" begin="1.8s" />
              </line>
              <line x1="420" y1="200" x2="380" y2="340" stroke="#4a6fa5" strokeWidth="2" opacity="0.5" filter="url(#glow)">
                <animate attributeName="opacity" values="0.5;0.8;0.5" dur="3.7s" repeatCount="indefinite" begin="0.8s" />
              </line>
              <line x1="120" y1="320" x2="180" y2="350" stroke="#4a6fa5" strokeWidth="2" opacity="0.5" filter="url(#glow)">
                <animate attributeName="opacity" values="0.5;0.8;0.5" dur="3.1s" repeatCount="indefinite" begin="1.3s" />
              </line>
              <line x1="180" y1="350" x2="300" y2="380" stroke="#4a6fa5" strokeWidth="2" opacity="0.5" filter="url(#glow)">
                <animate attributeName="opacity" values="0.5;0.8;0.5" dur="4.3s" repeatCount="indefinite" begin="0.2s" />
              </line>
              <line x1="300" y1="380" x2="380" y2="340" stroke="#4a6fa5" strokeWidth="2" opacity="0.5" filter="url(#glow)">
                <animate attributeName="opacity" values="0.5;0.8;0.5" dur="3.8s" repeatCount="indefinite" begin="1.1s" />
              </line>
              <line x1="120" y1="320" x2="100" y2="480" stroke="#4a6fa5" strokeWidth="2" opacity="0.5" filter="url(#glow)">
                <animate attributeName="opacity" values="0.5;0.8;0.5" dur="3.5s" repeatCount="indefinite" begin="0.9s" />
              </line>
              <line x1="180" y1="350" x2="220" y2="500" stroke="#4a6fa5" strokeWidth="2" opacity="0.5" filter="url(#glow)">
                <animate attributeName="opacity" values="0.5;0.8;0.5" dur="4s" repeatCount="indefinite" begin="1.6s" />
              </line>
              <line x1="300" y1="380" x2="280" y2="520" stroke="#4a6fa5" strokeWidth="2" opacity="0.5" filter="url(#glow)">
                <animate attributeName="opacity" values="0.5;0.8;0.5" dur="3.3s" repeatCount="indefinite" begin="0.5s" />
              </line>
              <line x1="380" y1="340" x2="360" y2="480" stroke="#4a6fa5" strokeWidth="2" opacity="0.5" filter="url(#glow)">
                <animate attributeName="opacity" values="0.5;0.8;0.5" dur="3.9s" repeatCount="indefinite" begin="1.4s" />
              </line>
              <line x1="100" y1="480" x2="220" y2="500" stroke="#4a6fa5" strokeWidth="2" opacity="0.5" filter="url(#glow)">
                <animate attributeName="opacity" values="0.5;0.8;0.5" dur="3.6s" repeatCount="indefinite" begin="0.7s" />
              </line>
              <line x1="220" y1="500" x2="280" y2="520" stroke="#4a6fa5" strokeWidth="2" opacity="0.5" filter="url(#glow)">
                <animate attributeName="opacity" values="0.5;0.8;0.5" dur="4.2s" repeatCount="indefinite" begin="1.9s" />
              </line>
              <line x1="280" y1="520" x2="360" y2="480" stroke="#4a6fa5" strokeWidth="2" opacity="0.5" filter="url(#glow)">
                <animate attributeName="opacity" values="0.5;0.8;0.5" dur="3.4s" repeatCount="indefinite" begin="0.3s" />
              </line>
              <line x1="100" y1="480" x2="180" y2="600" stroke="#4a6fa5" strokeWidth="2" opacity="0.5" filter="url(#glow)">
                <animate attributeName="opacity" values="0.5;0.8;0.5" dur="3.7s" repeatCount="indefinite" begin="1.2s" />
              </line>
              <line x1="220" y1="500" x2="250" y2="600" stroke="#4a6fa5" strokeWidth="2" opacity="0.5" filter="url(#glow)">
                <animate attributeName="opacity" values="0.5;0.8;0.5" dur="4.1s" repeatCount="indefinite" begin="0.6s" />
              </line>
              <line x1="280" y1="520" x2="320" y2="620" stroke="#4a6fa5" strokeWidth="2" opacity="0.5" filter="url(#glow)">
                <animate attributeName="opacity" values="0.5;0.8;0.5" dur="3.2s" repeatCount="indefinite" begin="1.7s" />
              </line>
              <line x1="360" y1="480" x2="380" y2="600" stroke="#4a6fa5" strokeWidth="2" opacity="0.5" filter="url(#glow)">
                <animate attributeName="opacity" values="0.5;0.8;0.5" dur="3.8s" repeatCount="indefinite" begin="0.4s" />
              </line>
              <line x1="180" y1="600" x2="250" y2="600" stroke="#4a6fa5" strokeWidth="2" opacity="0.5" filter="url(#glow)">
                <animate attributeName="opacity" values="0.5;0.8;0.5" dur="4.4s" repeatCount="indefinite" begin="1s" />
              </line>
              <line x1="250" y1="600" x2="320" y2="620" stroke="#4a6fa5" strokeWidth="2" opacity="0.5" filter="url(#glow)">
                <animate attributeName="opacity" values="0.5;0.8;0.5" dur="3.5s" repeatCount="indefinite" begin="1.5s" />
              </line>
              <line x1="320" y1="620" x2="380" y2="600" stroke="#4a6fa5" strokeWidth="2" opacity="0.5" filter="url(#glow)">
                <animate attributeName="opacity" values="0.5;0.8;0.5" dur="3.9s" repeatCount="indefinite" begin="0.8s" />
              </line>

              {/* Additional cross connections for complexity */}
              <line x1="80" y1="80" x2="380" y2="100" stroke="#4a6fa5" strokeWidth="1.5" opacity="0.4" filter="url(#glow)">
                <animate attributeName="opacity" values="0.4;0.6;0.4" dur="5s" repeatCount="indefinite" begin="0.5s" />
              </line>
              <line x1="150" y1="180" x2="420" y2="200" stroke="#4a6fa5" strokeWidth="1.5" opacity="0.4" filter="url(#glow)">
                <animate attributeName="opacity" values="0.4;0.6;0.4" dur="5.2s" repeatCount="indefinite" begin="1s" />
              </line>
              <line x1="120" y1="320" x2="380" y2="340" stroke="#4a6fa5" strokeWidth="1.5" opacity="0.4" filter="url(#glow)">
                <animate attributeName="opacity" values="0.4;0.6;0.4" dur="4.8s" repeatCount="indefinite" begin="1.5s" />
              </line>
              <line x1="100" y1="480" x2="360" y2="480" stroke="#4a6fa5" strokeWidth="1.5" opacity="0.4" filter="url(#glow)">
                <animate attributeName="opacity" values="0.4;0.6;0.4" dur="5.5s" repeatCount="indefinite" begin="0.3s" />
              </line>

              {/* Nodes - 18 total */}
              <circle cx="80" cy="80" r="6" fill="#4a6fa5" opacity="0.6">
                <animate attributeName="opacity" values="0.6;0.9;0.6" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="200" cy="120" r="7" fill="#4a6fa5" opacity="0.6">
                <animate attributeName="opacity" values="0.6;0.9;0.6" dur="3.5s" repeatCount="indefinite" begin="0.5s" />
              </circle>
              <circle cx="380" cy="100" r="6" fill="#4a6fa5" opacity="0.6">
                <animate attributeName="opacity" values="0.6;0.9;0.6" dur="4s" repeatCount="indefinite" begin="1s" />
              </circle>
              <circle cx="150" cy="180" r="6" fill="#4a6fa5" opacity="0.6">
                <animate attributeName="opacity" values="0.6;0.9;0.6" dur="3.2s" repeatCount="indefinite" begin="0.3s" />
              </circle>
              <circle cx="250" cy="220" r="7" fill="#4a6fa5" opacity="0.6">
                <animate attributeName="opacity" values="0.6;0.9;0.6" dur="3.8s" repeatCount="indefinite" begin="0.7s" />
              </circle>
              <circle cx="340" cy="260" r="6" fill="#4a6fa5" opacity="0.6">
                <animate attributeName="opacity" values="0.6;0.9;0.6" dur="3.3s" repeatCount="indefinite" begin="0.9s" />
              </circle>
              <circle cx="420" cy="200" r="6" fill="#4a6fa5" opacity="0.6">
                <animate attributeName="opacity" values="0.6;0.9;0.6" dur="3.6s" repeatCount="indefinite" begin="0.4s" />
              </circle>
              <circle cx="120" cy="320" r="7" fill="#4a6fa5" opacity="0.6">
                <animate attributeName="opacity" values="0.6;0.9;0.6" dur="3.9s" repeatCount="indefinite" begin="1.5s" />
              </circle>
              <circle cx="180" cy="350" r="6" fill="#4a6fa5" opacity="0.6">
                <animate attributeName="opacity" values="0.6;0.9;0.6" dur="3.4s" repeatCount="indefinite" begin="0.6s" />
              </circle>
              <circle cx="300" cy="380" r="7" fill="#4a6fa5" opacity="0.6">
                <animate attributeName="opacity" values="0.6;0.9;0.6" dur="4.1s" repeatCount="indefinite" begin="1.8s" />
              </circle>
              <circle cx="380" cy="340" r="6" fill="#4a6fa5" opacity="0.6">
                <animate attributeName="opacity" values="0.6;0.9;0.6" dur="3.7s" repeatCount="indefinite" begin="0.8s" />
              </circle>
              <circle cx="100" cy="480" r="6" fill="#4a6fa5" opacity="0.6">
                <animate attributeName="opacity" values="0.6;0.9;0.6" dur="3.1s" repeatCount="indefinite" begin="1.3s" />
              </circle>
              <circle cx="220" cy="500" r="7" fill="#4a6fa5" opacity="0.6">
                <animate attributeName="opacity" values="0.6;0.9;0.6" dur="4.3s" repeatCount="indefinite" begin="0.2s" />
              </circle>
              <circle cx="280" cy="520" r="6" fill="#4a6fa5" opacity="0.6">
                <animate attributeName="opacity" values="0.6;0.9;0.6" dur="3.8s" repeatCount="indefinite" begin="1.1s" />
              </circle>
              <circle cx="360" cy="480" r="6" fill="#4a6fa5" opacity="0.6">
                <animate attributeName="opacity" values="0.6;0.9;0.6" dur="3.5s" repeatCount="indefinite" begin="0.9s" />
              </circle>
              <circle cx="180" cy="600" r="6" fill="#4a6fa5" opacity="0.6">
                <animate attributeName="opacity" values="0.6;0.9;0.6" dur="4s" repeatCount="indefinite" begin="1.6s" />
              </circle>
              <circle cx="250" cy="600" r="7" fill="#4a6fa5" opacity="0.6">
                <animate attributeName="opacity" values="0.6;0.9;0.6" dur="3.3s" repeatCount="indefinite" begin="0.5s" />
              </circle>
              <circle cx="320" cy="620" r="6" fill="#4a6fa5" opacity="0.6">
                <animate attributeName="opacity" values="0.6;0.9;0.6" dur="3.9s" repeatCount="indefinite" begin="1.4s" />
              </circle>
              <circle cx="380" cy="600" r="6" fill="#4a6fa5" opacity="0.6">
                <animate attributeName="opacity" values="0.6;0.9;0.6" dur="3.6s" repeatCount="indefinite" begin="0.7s" />
              </circle>
            </svg>
          </div>
        </div>
      </section>

      {/* About & Stats Section */}
      <section id="about" className="container mx-auto px-4 py-24">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-5xl mb-6 tracking-tight">About Us</h2>
            <p className="font-[family-name:var(--font-body)] text-lg mb-6 text-gray-300 leading-relaxed">
              NAVANK was founded in 1998 by Mr Navin Singhal (now Chief Mentor of the company). In 2009, Naval Singhal joined the company as Chief Business Officer and filled up the massive gap in the quality and competitive raw material to produce Optical Fiber Cable in India and hence expanded the wings with the vision of making India most competitive in the World.
            </p>
            <p className="font-[family-name:var(--font-body)] text-lg text-gray-300 leading-relaxed">
              Over 25 years down the road, NAVANK has become an integral part of Optical fiber, Data cable and Power cable market. Today, NAVANK is one of the largest raw material Supplier for OFC, Data and power cable industries in India and slowly expanding into US and Europe markets.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
              <div className="font-[family-name:var(--font-display)] text-4xl mb-3 text-[#4a6fa5]">$17M</div>
              <div className="font-[family-name:var(--font-mono)] text-xs tracking-wider uppercase text-gray-400">Revenue 2024</div>
            </div>
            <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
              <div className="font-[family-name:var(--font-display)] text-4xl mb-3 text-[#4a6fa5]">22%</div>
              <div className="font-[family-name:var(--font-mono)] text-xs tracking-wider uppercase text-gray-400">YoY Growth</div>
            </div>
            <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
              <div className="font-[family-name:var(--font-display)] text-4xl mb-3 text-[#4a6fa5]">25+</div>
              <div className="font-[family-name:var(--font-mono)] text-xs tracking-wider uppercase text-gray-400">Years Experience</div>
            </div>
            <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
              <div className="font-[family-name:var(--font-display)] text-4xl mb-3 text-[#4a6fa5]">2</div>
              <div className="font-[family-name:var(--font-mono)] text-xs tracking-wider uppercase text-gray-400">Global Offices</div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="container mx-auto px-4 py-24">
        <h2 className="font-[family-name:var(--font-display)] text-6xl mb-20 text-center tracking-tight">Our Products</h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
          {/* Optical Fiber Cable Category */}
          <div className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300 cursor-pointer group">
            <h3 className="font-[family-name:var(--font-display)] text-3xl mb-3 tracking-tight group-hover:text-[#4a6fa5] transition-colors">
              Optical Fiber Cable
            </h3>
            <p className="font-[family-name:var(--font-body)] text-sm text-gray-400 mb-6 leading-relaxed">
              Raw materials for manufacturing optical fiber cables
            </p>
            <div className="font-[family-name:var(--font-mono)] text-xs text-[#4a6fa5] tracking-wider uppercase">
              6 Products
            </div>
          </div>

          {/* Power Cable Category */}
          <div className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300 cursor-pointer group">
            <h3 className="font-[family-name:var(--font-display)] text-3xl mb-3 tracking-tight group-hover:text-[#4a6fa5] transition-colors">
              Power Cable
            </h3>
            <p className="font-[family-name:var(--font-body)] text-sm text-gray-400 mb-6 leading-relaxed">
              Raw materials for manufacturing power cables
            </p>
            <div className="font-[family-name:var(--font-mono)] text-xs text-[#4a6fa5] tracking-wider uppercase">
              6 Products
            </div>
          </div>

          {/* Data Cable Category */}
          <div className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300 cursor-pointer group">
            <h3 className="font-[family-name:var(--font-display)] text-3xl mb-3 tracking-tight group-hover:text-[#4a6fa5] transition-colors">
              Data Cable
            </h3>
            <p className="font-[family-name:var(--font-body)] text-sm text-gray-400 mb-6 leading-relaxed">
              LSZH compounds for CAT-5/6/7 LAN cables
            </p>
            <div className="font-[family-name:var(--font-mono)] text-xs text-[#4a6fa5] tracking-wider uppercase">
              Specialty Materials
            </div>
          </div>
        </div>

        <p className="font-[family-name:var(--font-body)] text-center text-sm text-gray-500 max-w-md mx-auto">
          Talk to our AI to explore products in detail
        </p>
      </section>

      {/* OLD PRODUCTS SECTION - KEEPING FOR REFERENCE BUT HIDDEN */}
      <section className="hidden">
        <div className="mb-24">
          <h3 className="font-[family-name:var(--font-display)] text-4xl mb-4 tracking-tight">Optical Fiber Cable</h3>
          <p className="font-[family-name:var(--font-body)] text-lg mb-12 text-gray-400">Raw materials for manufacturing optical fiber cables</p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300">
              <div className="aspect-square mb-6 bg-black/30 rounded overflow-hidden border border-white/5 relative">
                <Image src="https://www.navank.in/wp-content/uploads/2022/11/Water-Blocking-Tape-500x400.jpg" alt="Water Blocking Tape" fill className="object-cover" />
              </div>
              <h4 className="font-[family-name:var(--font-body)] text-xl mb-3 font-bold">Water Blocking Tape</h4>
              <p className="font-[family-name:var(--font-body)] text-sm mb-4 text-gray-400 leading-relaxed">
                Used in power, fibre and copper telecom cable to prevent longitudinal water penetration.
              </p>
              <ul className="space-y-2">
                <li className="font-[family-name:var(--font-mono)] text-xs text-[#4a6fa5]">→ Non-conductive version</li>
                <li className="font-[family-name:var(--font-mono)] text-xs text-[#4a6fa5]">→ Semi-conductive version</li>
                <li className="font-[family-name:var(--font-mono)] text-xs text-[#4a6fa5]">→ PET laminated version</li>
              </ul>
            </div>

            <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300">
              <div className="aspect-square mb-6 bg-black/30 rounded overflow-hidden border border-white/5 relative">
                <Image src="https://www.navank.in/wp-content/uploads/2022/11/images-1-1-500x400.jpg" alt="Water Swellable Yarn" fill className="object-cover" />
              </div>
              <h4 className="font-[family-name:var(--font-body)] text-xl mb-3 font-bold">Water Swellable Yarn</h4>
              <p className="font-[family-name:var(--font-body)] text-sm mb-4 text-gray-400 leading-relaxed">
                Quick water absorption, high tensile strength, used in waterproof FOC & communication cables.
              </p>
              <ul className="space-y-2">
                <li className="font-[family-name:var(--font-mono)] text-xs text-[#4a6fa5]">→ Quick water absorption</li>
                <li className="font-[family-name:var(--font-mono)] text-xs text-[#4a6fa5]">→ High expansivity</li>
                <li className="font-[family-name:var(--font-mono)] text-xs text-[#4a6fa5]">→ Good heat resistance</li>
              </ul>
            </div>

            <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300">
              <div className="aspect-square mb-6 bg-black/30 rounded overflow-hidden border border-white/5 relative">
                <Image src="https://www.navank.in/wp-content/uploads/2022/11/images-6-1-500x400.jpg" alt="ECCS Tape" fill className="object-cover" />
              </div>
              <h4 className="font-[family-name:var(--font-body)] text-xl mb-3 font-bold">ECCS Tape</h4>
              <p className="font-[family-name:var(--font-body)] text-sm mb-4 text-gray-400 leading-relaxed">
                Copolymer coated steel tape for armouring fiber optical cable to protect from rodents & external forces.
              </p>
              <ul className="space-y-2">
                <li className="font-[family-name:var(--font-mono)] text-xs text-[#4a6fa5]">→ High quality steel</li>
                <li className="font-[family-name:var(--font-mono)] text-xs text-[#4a6fa5]">→ EAA copolymer film</li>
                <li className="font-[family-name:var(--font-mono)] text-xs text-[#4a6fa5]">→ Rodent protection</li>
              </ul>
            </div>

            <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300">
              <div className="aspect-square mb-6 bg-black/30 rounded overflow-hidden border border-white/5 relative">
                <Image src="https://www.navank.in/wp-content/uploads/2022/11/images-8-1-500x400.jpg" alt="CJB ECCS Tape" fill className="object-cover" />
              </div>
              <h4 className="font-[family-name:var(--font-body)] text-xl mb-3 font-bold">CJB ECCS Tape</h4>
              <p className="font-[family-name:var(--font-body)] text-sm mb-4 text-gray-400 leading-relaxed">
                Chrome coated steel tape for telecommunication cables. Provides controlled jacket bond to LDPE, MDPE and HDPE.
              </p>
              <ul className="space-y-2">
                <li className="font-[family-name:var(--font-mono)] text-xs text-[#4a6fa5]">→ Tempered to T3</li>
                <li className="font-[family-name:var(--font-mono)] text-xs text-[#4a6fa5]">→ For telecom cables</li>
                <li className="font-[family-name:var(--font-mono)] text-xs text-[#4a6fa5]">→ JUMBO version available</li>
              </ul>
            </div>

            <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300">
              <div className="aspect-square mb-6 bg-black/30 rounded overflow-hidden border border-white/5 relative">
                <Image src="https://www.navank.in/wp-content/uploads/2022/11/images-11-1-500x400.jpg" alt="PBT Compounds" fill className="object-cover" />
              </div>
              <h4 className="font-[family-name:var(--font-body)] text-xl mb-3 font-bold">PBT Compounds for Loose Tube</h4>
              <p className="font-[family-name:var(--font-body)] text-sm mb-4 text-gray-400 leading-relaxed">
                Most popular extrudable polymer compound for loose tubes in fiber-optic cables. Supports 2-24 fibers per tube.
              </p>
              <ul className="space-y-2">
                <li className="font-[family-name:var(--font-mono)] text-xs text-[#4a6fa5]">→ 2-24 fibers per tube</li>
                <li className="font-[family-name:var(--font-mono)] text-xs text-[#4a6fa5]">→ High-speed extrusion</li>
                <li className="font-[family-name:var(--font-mono)] text-xs text-[#4a6fa5]">→ Multiple colours</li>
              </ul>
            </div>

            <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300">
              <div className="aspect-square mb-6 bg-black/30 rounded overflow-hidden border border-white/5 relative">
                <Image src="https://www.navank.in/wp-content/uploads/2022/11/500X500-12-500x400.jpg" alt="LSZH Compounds" fill className="object-cover" />
              </div>
              <h4 className="font-[family-name:var(--font-body)] text-xl mb-3 font-bold">LSZH Compounds</h4>
              <p className="font-[family-name:var(--font-body)] text-sm mb-4 text-gray-400 leading-relaxed">
                Polyolefin based compounds with LSZH, HFFR, ZHFR properties for FOC, LAN, Solar, and Railway cables.
              </p>
              <ul className="space-y-2">
                <li className="font-[family-name:var(--font-mono)] text-xs text-[#4a6fa5]">→ UL1581 certified</li>
                <li className="font-[family-name:var(--font-mono)] text-xs text-[#4a6fa5]">→ TUV certified</li>
                <li className="font-[family-name:var(--font-mono)] text-xs text-[#4a6fa5]">→ IEC60332 compliant</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Power Cable Category */}
        <div className="mb-24">
          <h3 className="font-[family-name:var(--font-display)] text-4xl mb-4 tracking-tight">Power Cable</h3>
          <p className="font-[family-name:var(--font-body)] text-lg mb-12 text-gray-400">Raw materials for manufacturing power cables</p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300">
              <div className="aspect-square mb-6 bg-black/30 rounded overflow-hidden border border-white/5 relative">
                <Image src="https://www.navank.in/wp-content/uploads/2022/11/XLPE-cable-500x400.jpg" alt="XLPE Compound" fill className="object-cover" />
              </div>
              <h4 className="font-[family-name:var(--font-body)] text-xl mb-3 font-bold">XLPE Compound</h4>
              <p className="font-[family-name:var(--font-body)] text-sm mb-4 text-gray-400 leading-relaxed">
                Cross-linked polyethylene insulation for all types of power and special cables.
              </p>
              <ul className="space-y-2">
                <li className="font-[family-name:var(--font-mono)] text-xs text-[#4a6fa5]">→ Peroxide-type for HV & EHV</li>
                <li className="font-[family-name:var(--font-mono)] text-xs text-[#4a6fa5]">→ Silane-type moisture-cured</li>
                <li className="font-[family-name:var(--font-mono)] text-xs text-[#4a6fa5]">→ For Sioplas lines</li>
              </ul>
            </div>

            <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300">
              <div className="aspect-square mb-6 bg-black/30 rounded overflow-hidden border border-white/5 relative">
                <Image src="https://www.navank.in/wp-content/uploads/2022/11/Semiconductor-Shielding-Compound-500x400.jpg" alt="Semiconductive Compound" fill className="object-cover" />
              </div>
              <h4 className="font-[family-name:var(--font-body)] text-xl mb-3 font-bold">Semiconductive Compound</h4>
              <p className="font-[family-name:var(--font-body)] text-sm mb-4 text-gray-400 leading-relaxed">
                Cross-linkable black polyethylene compound for conductor shields or insulation shields of power cables.
              </p>
              <ul className="space-y-2">
                <li className="font-[family-name:var(--font-mono)] text-xs text-[#4a6fa5]">→ Cross-linkable</li>
                <li className="font-[family-name:var(--font-mono)] text-xs text-[#4a6fa5]">→ Internal & external layers</li>
                <li className="font-[family-name:var(--font-mono)] text-xs text-[#4a6fa5]">→ Protects XLPE/EPR insulation</li>
              </ul>
            </div>

            <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300">
              <div className="aspect-square mb-6 bg-black/30 rounded overflow-hidden border border-white/5 relative">
                <Image src="https://www.navank.in/wp-content/uploads/2022/11/LSZH-compound-500x400.jpg" alt="LSZH Compound Power" fill className="object-cover" />
              </div>
              <h4 className="font-[family-name:var(--font-body)] text-xl mb-3 font-bold">LSZH Compound</h4>
              <p className="font-[family-name:var(--font-body)] text-sm mb-4 text-gray-400 leading-relaxed">
                Cable sheathing material for power cables. Meets safety, flame retardant, and mechanical strength requirements.
              </p>
              <ul className="space-y-2">
                <li className="font-[family-name:var(--font-mono)] text-xs text-[#4a6fa5]">→ Flame retardant</li>
                <li className="font-[family-name:var(--font-mono)] text-xs text-[#4a6fa5]">→ Low smoke zero halogen</li>
                <li className="font-[family-name:var(--font-mono)] text-xs text-[#4a6fa5]">→ High mechanical strength</li>
              </ul>
            </div>

            <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300">
              <div className="aspect-square mb-6 bg-black/30 rounded overflow-hidden border border-white/5 relative">
                <Image src="https://www.navank.in/wp-content/uploads/2022/11/PE-compound-500x400.jpg" alt="PE Compound" fill className="object-cover" />
              </div>
              <h4 className="font-[family-name:var(--font-body)] text-xl mb-3 font-bold">PE Compound</h4>
              <p className="font-[family-name:var(--font-body)] text-sm mb-4 text-gray-400 leading-relaxed">
                Used for sheathing and insulation of power cables. Full range: HDPE, MDPE, LDPE & FR-HDPE.
              </p>
              <ul className="space-y-2">
                <li className="font-[family-name:var(--font-mono)] text-xs text-[#4a6fa5]">→ HDPE, MDPE, LDPE</li>
                <li className="font-[family-name:var(--font-mono)] text-xs text-[#4a6fa5]">→ FR-HDPE</li>
                <li className="font-[family-name:var(--font-mono)] text-xs text-[#4a6fa5]">→ All types of cables</li>
              </ul>
            </div>

            <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300">
              <div className="aspect-square mb-6 bg-black/30 rounded overflow-hidden border border-white/5 relative">
                <Image src="https://www.navank.in/wp-content/uploads/2022/11/images-10-2-500x400.jpg" alt="Mica Tape" fill className="object-cover" />
              </div>
              <h4 className="font-[family-name:var(--font-body)] text-xl mb-3 font-bold">Mica Tape</h4>
              <p className="font-[family-name:var(--font-body)] text-sm mb-4 text-gray-400 leading-relaxed">
                Insulation material for fire-resistant cables. Made of phlogopite mica paper with silicon resin.
              </p>
              <ul className="space-y-2">
                <li className="font-[family-name:var(--font-mono)] text-xs text-[#4a6fa5]">→ Fire resistant</li>
                <li className="font-[family-name:var(--font-mono)] text-xs text-[#4a6fa5]">→ High voltage resistant</li>
                <li className="font-[family-name:var(--font-mono)] text-xs text-[#4a6fa5]">→ High temperature resistant</li>
              </ul>
            </div>

            <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300">
              <div className="aspect-square mb-6 bg-black/30 rounded overflow-hidden border border-white/5 relative">
                <Image src="https://www.navank.in/wp-content/uploads/2022/11/PVC-compound-500x400.jpg" alt="PVC Compound" fill className="object-cover" />
              </div>
              <h4 className="font-[family-name:var(--font-body)] text-xl mb-3 font-bold">PVC Compound</h4>
              <p className="font-[family-name:var(--font-body)] text-sm mb-4 text-gray-400 leading-relaxed">
                For low-voltage cables, telecommunication lines, and electrical wiring. Meets all international standards.
              </p>
              <ul className="space-y-2">
                <li className="font-[family-name:var(--font-mono)] text-xs text-[#4a6fa5]">→ Sheathing grade</li>
                <li className="font-[family-name:var(--font-mono)] text-xs text-[#4a6fa5]">→ Insulation grade</li>
                <li className="font-[family-name:var(--font-mono)] text-xs text-[#4a6fa5]">→ International standards</li>
              </ul>
            </div>
          </div>
        </div>

        {/* OLD Data Cable Category - keeping for reference */}
        <div className="mb-16">
          <h3 className="font-[family-name:var(--font-display)] text-4xl mb-4 tracking-tight">Data Cable & Freight Forwarding</h3>
          <p className="font-[family-name:var(--font-body)] text-lg mb-12 text-gray-400">LSZH compounds for CAT-5/6/7 LAN cables and comprehensive logistics services from manufacturer to customer</p>
          <div className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-[family-name:var(--font-body)] text-2xl mb-4 font-bold">Data Cable Materials</h4>
                <p className="font-[family-name:var(--font-body)] text-sm text-gray-400 leading-relaxed mb-4">
                  We supply LSZH compounds specifically designed for CAT-5, CAT-6, and CAT-7 LAN cables, meeting international standards for data transmission applications.
                </p>
              </div>
              <div>
                <h4 className="font-[family-name:var(--font-body)] text-2xl mb-4 font-bold">Freight Forwarding</h4>
                <p className="font-[family-name:var(--font-body)] text-sm text-gray-400 leading-relaxed mb-4">
                  End-to-end logistics from manufacturer to customer. Warehousing in India & USA. We handle $10M in shipments annually, providing seamless services so customers can focus on manufacturing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>{/* End hidden old products section */}

      {/* Team Section */}
      <section id="team" className="container mx-auto px-4 py-24">
        <h2 className="font-[family-name:var(--font-display)] text-6xl mb-20 text-center tracking-tight">Our Team</h2>
        <div className="grid md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center">
            <div className="w-48 h-48 mb-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden relative">
              <Image src="https://www.navank.in/wp-content/uploads/2022/11/Mr.-Navin-Kumar-Singhal.jpg" alt="Navin Kumar Singhal" fill className="object-cover" />
            </div>
            <h3 className="font-[family-name:var(--font-body)] text-xl mb-2 font-bold">Navin Kumar Singhal</h3>
            <div className="font-[family-name:var(--font-mono)] text-xs mb-4 text-[#4a6fa5] tracking-wider uppercase">Chief Mentor / Founder</div>
            <p className="font-[family-name:var(--font-body)] text-sm text-center text-gray-400 leading-relaxed">
              M.Tech. IIT Delhi, 35+ years in factory management and production. Expertise in Fiber Optic and Nanotechnology.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-48 h-48 mb-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden relative">
              <Image src="https://www.navank.in/wp-content/uploads/2022/11/Wire-magazine-pic-NAVANK.jpg" alt="Naval Singhal" fill className="object-cover" />
            </div>
            <h3 className="font-[family-name:var(--font-body)] text-xl mb-2 font-bold">Naval Singhal</h3>
            <div className="font-[family-name:var(--font-mono)] text-xs mb-4 text-[#4a6fa5] tracking-wider uppercase">Chief Business Officer</div>
            <p className="font-[family-name:var(--font-body)] text-sm text-center text-gray-400 leading-relaxed">
              MBA IIT Delhi, 15+ years experience. Previously IBM and Accenture. Vision: $100M company by 2030.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-48 h-48 mb-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden relative">
              <Image src="https://www.navank.in/wp-content/uploads/2022/11/Anil-Pic.jpg" alt="Anil Bagade" fill className="object-cover" />
            </div>
            <h3 className="font-[family-name:var(--font-body)] text-xl mb-2 font-bold">Anil Bagade</h3>
            <div className="font-[family-name:var(--font-mono)] text-xs mb-4 text-[#4a6fa5] tracking-wider uppercase">Technical Expert</div>
            <p className="font-[family-name:var(--font-body)] text-sm text-center text-gray-400 leading-relaxed">
              14+ years in cable & compound industry. Expertise in LV, HV, EHV cables with XLPE, PE, PVC compounds.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-48 h-48 mb-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden relative">
              <Image src="https://www.navank.in/wp-content/uploads/2022/11/Abhinav-Pic-for-website.jpg" alt="Abhinav Goyal" fill className="object-cover" />
            </div>
            <h3 className="font-[family-name:var(--font-body)] text-xl mb-2 font-bold">Abhinav Goyal</h3>
            <div className="font-[family-name:var(--font-mono)] text-xs mb-4 text-[#4a6fa5] tracking-wider uppercase">Deputy Manager, Sales</div>
            <p className="font-[family-name:var(--font-body)] text-sm text-center text-gray-400 leading-relaxed">
              B.Tech Kurukshetra University. With NAVANK since 2016. Multi-fold business growth through Sales and Marketing.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-48 h-48 mb-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden relative">
              <Image src="https://www.navank.in/wp-content/uploads/2022/11/Garima-Profile-pic.jpg" alt="Garima Singhal" fill className="object-cover" />
            </div>
            <h3 className="font-[family-name:var(--font-body)] text-xl mb-2 font-bold">Garima Singhal</h3>
            <div className="font-[family-name:var(--font-mono)] text-xs mb-4 text-[#4a6fa5] tracking-wider uppercase">Logistics Executive</div>
            <p className="font-[family-name:var(--font-body)] text-sm text-center text-gray-400 leading-relaxed">
              10+ years managing logistics and shipments. Handles $10M in shipments annually with timely customer updates.
            </p>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="container mx-auto px-4 py-24">
        <h2 className="font-[family-name:var(--font-display)] text-6xl mb-20 text-center tracking-tight">Our Partners</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300">
            <h3 className="font-[family-name:var(--font-body)] text-xl mb-3 font-bold text-center">Zhejiang Wanma Co. Ltd.</h3>
            <p className="font-[family-name:var(--font-body)] text-sm text-center text-gray-400 leading-relaxed">
              China — Largest cable compound manufacturer in Asia. OEM partner since 2015.
            </p>
          </div>

          <div className="flex flex-col items-center p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300">
            <h3 className="font-[family-name:var(--font-body)] text-xl mb-3 font-bold text-center">Unitape</h3>
            <p className="font-[family-name:var(--font-body)] text-sm text-center text-gray-400 leading-relaxed">
              UK — ECCS tape with CJB (Controlled Jacket Bond) innovation for telecommunication cables.
            </p>
          </div>

          <div className="flex flex-col items-center p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300">
            <h3 className="font-[family-name:var(--font-body)] text-xl mb-3 font-bold text-center">Nantong Siber</h3>
            <p className="font-[family-name:var(--font-body)] text-sm text-center text-gray-400 leading-relaxed">
              China — Water-blocking tapes & yarns. Trusted partner since 2013.
            </p>
          </div>

          <div className="flex flex-col items-center p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300">
            <h3 className="font-[family-name:var(--font-body)] text-xl mb-3 font-bold text-center">Chhaperia International</h3>
            <p className="font-[family-name:var(--font-body)] text-sm text-center text-gray-400 leading-relaxed">
              India — Mica tapes for fire-resistant cables. Partner since Q2 FY22.
            </p>
          </div>
        </div>
      </section>

      {/* News & Events Section */}
      <section className="container mx-auto px-4 py-24">
        <h2 className="font-[family-name:var(--font-display)] text-6xl mb-20 text-center tracking-tight">News & Events</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex gap-6 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300">
            <div className="w-48 h-32 flex-shrink-0 bg-black/30 rounded overflow-hidden border border-white/5 relative">
              <Image src="https://www.navank.in/wp-content/uploads/2023/05/WhatsApp-Image-2023-05-30-at-9.51.47-AM.jpeg" alt="Backend Tech Integration" fill className="object-cover" />
            </div>
            <div className="flex-1">
              <div className="font-[family-name:var(--font-mono)] text-xs mb-3 text-[#4a6fa5] tracking-wider uppercase">May 2023</div>
              <h3 className="font-[family-name:var(--font-body)] text-lg mb-3 font-bold">Backend Tech Integration & Two Warehouses in India</h3>
              <p className="font-[family-name:var(--font-body)] text-sm text-gray-400 leading-relaxed">
                NAVANK expands logistics infrastructure with two new warehouses in India enabling JIT deliveries and backend tech integration.
              </p>
            </div>
          </div>

          <div className="flex gap-6 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300">
            <div className="w-48 h-32 flex-shrink-0 bg-black/30 rounded overflow-hidden border border-white/5 relative">
              <Image src="https://www.navank.in/wp-content/uploads/2022/11/PFA-images-of-Wire-Dusseldorf-Germany-June-2022-for-event-section-7.jpg" alt="Wire Dusseldorf" fill className="object-cover" />
            </div>
            <div className="flex-1">
              <div className="font-[family-name:var(--font-mono)] text-xs mb-3 text-[#4a6fa5] tracking-wider uppercase">November 2022</div>
              <h3 className="font-[family-name:var(--font-body)] text-lg mb-3 font-bold">Creating Long-Standing Partnerships Through Innovation</h3>
              <p className="font-[family-name:var(--font-body)] text-sm text-gray-400 leading-relaxed">
                NAVANK works synergistically with OEM partners for designing and development of cutting-edge cable materials.
              </p>
            </div>
          </div>

          <div className="flex gap-6 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300">
            <div className="w-48 h-32 flex-shrink-0 bg-black/30 rounded overflow-hidden border border-white/5 relative">
              <Image src="https://www.navank.in/wp-content/uploads/2022/11/PFA-images-of-Wire-Dusseldorf-Germany-June-2022-for-event-section-5.jpg" alt="Growth Rate" fill className="object-cover" />
            </div>
            <div className="flex-1">
              <div className="font-[family-name:var(--font-mono)] text-xs mb-3 text-[#4a6fa5] tracking-wider uppercase">November 2022</div>
              <h3 className="font-[family-name:var(--font-body)] text-lg mb-3 font-bold">Growing at 100 Percent YoY for Last 5 Years</h3>
              <p className="font-[family-name:var(--font-body)] text-sm text-gray-400 leading-relaxed">
                Our sales forecast for 2025 is around USD 30 million. Sustained high growth driven by global expansion.
              </p>
            </div>
          </div>

          <div className="flex gap-6 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300">
            <div className="w-48 h-32 flex-shrink-0 bg-black/30 rounded overflow-hidden border border-white/5 relative">
              <Image src="https://www.navank.in/wp-content/uploads/2022/11/PFA-images-of-Cable-Wire-Fair-for-event-section1.jpg" alt="Wire Dusseldorf Germany" fill className="object-cover" />
            </div>
            <div className="flex-1">
              <div className="font-[family-name:var(--font-mono)] text-xs mb-3 text-[#4a6fa5] tracking-wider uppercase">June 2022</div>
              <h3 className="font-[family-name:var(--font-body)] text-lg mb-3 font-bold">Wire Dusseldorf, Germany</h3>
              <p className="font-[family-name:var(--font-body)] text-sm text-gray-400 leading-relaxed">
                NAVANK participated in Wire Dusseldorf Germany, showcasing latest innovations in cable materials to European market.
              </p>
            </div>
          </div>

          <div className="flex gap-6 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300">
            <div className="w-48 h-32 flex-shrink-0 bg-black/30 rounded overflow-hidden border border-white/5 relative">
              <Image src="https://www.navank.in/wp-content/uploads/2022/11/PFA-images-of-Cable-Wire-Fair-for-event-section..jpg" alt="Cable Fair Delhi" fill className="object-cover" />
            </div>
            <div className="flex-1">
              <div className="font-[family-name:var(--font-mono)] text-xs mb-3 text-[#4a6fa5] tracking-wider uppercase">March 2022</div>
              <h3 className="font-[family-name:var(--font-body)] text-lg mb-3 font-bold">Cable & Wire Fair, Pragati Maidan, New Delhi</h3>
              <p className="font-[family-name:var(--font-body)] text-sm text-gray-400 leading-relaxed">
                NAVANK participated in the 4th international Exhibition & conference on Cable & Wire industry in New Delhi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto px-4 py-24 pb-32">
        <h2 className="font-[family-name:var(--font-display)] text-6xl mb-20 text-center tracking-tight">Contact Us</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
            <h3 className="font-[family-name:var(--font-display)] text-3xl mb-6 tracking-tight">India Office</h3>
            <div className="space-y-3 font-[family-name:var(--font-body)] text-gray-300">
              <p className="font-bold">NAVANK Consultants</p>
              <p>276, Niligiri Apartment, Alaknanda</p>
              <p>New Delhi 110019</p>
              <p>India</p>
              <p className="pt-4 font-[family-name:var(--font-mono)] text-sm text-[#4a6fa5]">Phone: +91 8860364748</p>
              <p className="font-[family-name:var(--font-mono)] text-sm text-[#4a6fa5]">Email: abhinav@navank.onmicrosoft.com</p>
            </div>
          </div>
          <div className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
            <h3 className="font-[family-name:var(--font-display)] text-3xl mb-6 tracking-tight">Netherlands Office</h3>
            <div className="space-y-3 font-[family-name:var(--font-body)] text-gray-300">
              <p className="font-bold">NAVANK Cable B.V.</p>
              <p>Pelikaanhof 134</p>
              <p>Leidschendam 2264 JL</p>
              <p>Netherlands</p>
              <p className="pt-4 font-[family-name:var(--font-mono)] text-sm text-[#4a6fa5]">Phone: +31 619253386</p>
              <p className="font-[family-name:var(--font-mono)] text-sm text-[#4a6fa5]">Email: naval@navank.nl</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
