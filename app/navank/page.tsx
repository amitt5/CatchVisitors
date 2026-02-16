'use client';

import { Space_Mono, DM_Sans, Syne } from 'next/font/google';
import { useEffect, useState } from 'react';

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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Founded in 1998, we have grown to become one of the leading suppliers in the industry. Our vision is to make our company reach new heights by 2030.
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Over two decades of experience in the cable industry.
            </p>
            <p className="font-[family-name:var(--font-body)] text-lg text-gray-300 leading-relaxed">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. We specialize in providing exceptional services and innovative solutions.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <div className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
              <div className="font-[family-name:var(--font-display)] text-5xl mb-3 text-[#4a6fa5]">$14M</div>
              <div className="font-[family-name:var(--font-mono)] text-sm tracking-wider uppercase text-gray-400">Revenue in 2022</div>
            </div>
            <div className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
              <div className="font-[family-name:var(--font-display)] text-5xl mb-3 text-[#4a6fa5]">22%</div>
              <div className="font-[family-name:var(--font-mono)] text-sm tracking-wider uppercase text-gray-400">Growth YoY since inception</div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="container mx-auto px-4 py-24">
        <h2 className="font-[family-name:var(--font-display)] text-6xl mb-20 text-center tracking-tight">Our Products</h2>

        {/* Optical Fiber Cable Category */}
        <div className="mb-24">
          <h3 className="font-[family-name:var(--font-display)] text-4xl mb-4 tracking-tight">Optical Fiber Cable</h3>
          <p className="font-[family-name:var(--font-body)] text-lg mb-12 text-gray-400">Raw materials for manufacturing optical fiber cables</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={`ofc-${i}`} className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300">
                <div className="aspect-square mb-6 bg-black/30 rounded flex items-center justify-center border border-white/5">
                  <div className="font-[family-name:var(--font-mono)] text-xs text-gray-500">
                    Product Image {i}
                  </div>
                </div>
                <h4 className="font-[family-name:var(--font-body)] text-xl mb-3 font-bold">Product Name {i}</h4>
                <p className="font-[family-name:var(--font-body)] text-sm mb-4 text-gray-400 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.
                </p>
                <ul className="space-y-2">
                  <li className="font-[family-name:var(--font-mono)] text-xs text-[#4a6fa5]">→ Specification 1</li>
                  <li className="font-[family-name:var(--font-mono)] text-xs text-[#4a6fa5]">→ Specification 2</li>
                  <li className="font-[family-name:var(--font-mono)] text-xs text-[#4a6fa5]">→ Specification 3</li>
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Power Cable Category */}
        <div className="mb-24">
          <h3 className="font-[family-name:var(--font-display)] text-4xl mb-4 tracking-tight">Power Cable</h3>
          <p className="font-[family-name:var(--font-body)] text-lg mb-12 text-gray-400">Raw materials for manufacturing power cables</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={`power-${i}`} className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300">
                <div className="aspect-square mb-6 bg-black/30 rounded flex items-center justify-center border border-white/5">
                  <div className="font-[family-name:var(--font-mono)] text-xs text-gray-500">
                    Product Image {i}
                  </div>
                </div>
                <h4 className="font-[family-name:var(--font-body)] text-xl mb-3 font-bold">Product Name {i}</h4>
                <p className="font-[family-name:var(--font-body)] text-sm mb-4 text-gray-400 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.
                </p>
                <ul className="space-y-2">
                  <li className="font-[family-name:var(--font-mono)] text-xs text-[#4a6fa5]">→ Specification 1</li>
                  <li className="font-[family-name:var(--font-mono)] text-xs text-[#4a6fa5]">→ Specification 2</li>
                  <li className="font-[family-name:var(--font-mono)] text-xs text-[#4a6fa5]">→ Specification 3</li>
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Data Cable Category */}
        <div className="mb-16">
          <h3 className="font-[family-name:var(--font-display)] text-4xl mb-4 tracking-tight">Data Cable</h3>
          <p className="font-[family-name:var(--font-body)] text-lg mb-12 text-gray-400">Raw materials for manufacturing data cables including CAT-5/6/7 LAN cables</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={`data-${i}`} className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300">
                <div className="aspect-square mb-6 bg-black/30 rounded flex items-center justify-center border border-white/5">
                  <div className="font-[family-name:var(--font-mono)] text-xs text-gray-500">
                    Product Image {i}
                  </div>
                </div>
                <h4 className="font-[family-name:var(--font-body)] text-xl mb-3 font-bold">Product Name {i}</h4>
                <p className="font-[family-name:var(--font-body)] text-sm mb-4 text-gray-400 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="container mx-auto px-4 py-24">
        <h2 className="font-[family-name:var(--font-display)] text-6xl mb-20 text-center tracking-tight">Our Team</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={`team-${i}`} className="flex flex-col items-center">
              <div className="w-48 h-48 mb-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg flex items-center justify-center">
                <div className="font-[family-name:var(--font-mono)] text-xs text-gray-500">Photo {i}</div>
              </div>
              <h3 className="font-[family-name:var(--font-body)] text-xl mb-2 font-bold">Team Member Name</h3>
              <div className="font-[family-name:var(--font-mono)] text-xs mb-4 text-[#4a6fa5] tracking-wider uppercase">Position Title</div>
              <p className="font-[family-name:var(--font-body)] text-sm text-center text-gray-400 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Educational background and expertise in the industry.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Partners Section */}
      <section className="container mx-auto px-4 py-24">
        <h2 className="font-[family-name:var(--font-display)] text-6xl mb-20 text-center tracking-tight">Our Partners</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={`partner-${i}`} className="flex flex-col items-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300">
              <div className="w-full aspect-video mb-6 bg-black/30 rounded flex items-center justify-center border border-white/5">
                <div className="font-[family-name:var(--font-mono)] text-xs text-gray-500">Partner Logo {i}</div>
              </div>
              <p className="font-[family-name:var(--font-body)] text-sm text-center text-gray-400">
                Partner Company Name - Lorem ipsum dolor sit amet
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* News & Events Section */}
      <section className="container mx-auto px-4 py-24">
        <h2 className="font-[family-name:var(--font-display)] text-6xl mb-20 text-center tracking-tight">News & Events</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={`news-${i}`} className="flex gap-6 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300">
              <div className="w-48 h-32 flex-shrink-0 bg-black/30 rounded flex items-center justify-center border border-white/5">
                <div className="font-[family-name:var(--font-mono)] text-xs text-gray-500">News Image {i}</div>
              </div>
              <div className="flex-1">
                <div className="font-[family-name:var(--font-mono)] text-xs mb-3 text-[#4a6fa5] tracking-wider uppercase">Month Year</div>
                <h3 className="font-[family-name:var(--font-body)] text-lg mb-3 font-bold">News Headline Lorem Ipsum</h3>
                <p className="font-[family-name:var(--font-body)] text-sm text-gray-400 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto px-4 py-24 pb-32">
        <h2 className="font-[family-name:var(--font-display)] text-6xl mb-20 text-center tracking-tight">Contact Us</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
            <h3 className="font-[family-name:var(--font-display)] text-3xl mb-6 tracking-tight">India Office</h3>
            <div className="space-y-3 font-[family-name:var(--font-body)] text-gray-300">
              <p>Company Name</p>
              <p>Street Address</p>
              <p>City, State, Postal Code</p>
              <p>Country</p>
              <p className="pt-4 font-[family-name:var(--font-mono)] text-sm text-[#4a6fa5]">Phone: +00 0000000000</p>
              <p className="font-[family-name:var(--font-mono)] text-sm text-[#4a6fa5]">Email: contact@example.com</p>
            </div>
          </div>
          <div className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
            <h3 className="font-[family-name:var(--font-display)] text-3xl mb-6 tracking-tight">Netherlands Office</h3>
            <div className="space-y-3 font-[family-name:var(--font-body)] text-gray-300">
              <p>Company Name</p>
              <p>Street Address</p>
              <p>City, Postal Code</p>
              <p>Country</p>
              <p className="pt-4 font-[family-name:var(--font-mono)] text-sm text-[#4a6fa5]">Phone: +00 0000000000</p>
              <p className="font-[family-name:var(--font-mono)] text-sm text-[#4a6fa5]">Email: contact@example.com</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
