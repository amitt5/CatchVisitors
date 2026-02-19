"use client";

import React, { useState } from "react";

const ORANGE = "#f05000";
const NAVY = "#0d1829";
const SAGE = "#b5c2bd";
const SAGE_BG = "#e8ecea";

const FerroLogo = ({ color = "black" }: { color?: string }) => (
  <div className="flex items-center gap-1.5" style={{ color }}>
    <svg width="20" height="20" viewBox="0 0 20 20" fill={color}>
      <path d="M2 1h16v3.5H6v3h9v3.5H6V19H2V1z" />
      <path d="M14 3l5 5-5 5V3z" fillOpacity="0.5" />
    </svg>
    <span className="text-lg font-black tracking-[0.15em] uppercase">FERRO</span>
  </div>
);

const NavArrows = ({ className = "" }: { className?: string }) => (
  <div className={`flex gap-2 ${className}`}>
    <button className="w-9 h-9 border flex items-center justify-center text-sm hover:bg-current/10 transition-colors" style={{ borderColor: "currentColor" }}>←</button>
    <button className="w-9 h-9 border flex items-center justify-center text-sm hover:bg-current/10 transition-colors" style={{ borderColor: "currentColor" }}>→</button>
  </div>
);

export default function SteelPage() {
  const [activeProductTab, setActiveProductTab] = useState("hot-rolled");
  const [activeCategory, setActiveCategory] = useState("energy");

  const categories = [
    { id: "energy", label: "Energy" },
    { id: "construction", label: "Construction" },
    { id: "automotive", label: "Automotive" },
    { id: "industrial", label: "Industrial Machinery" },
  ];

  const solutionItems: Record<string, { center: string; right: string[]; bottom: string }> = {
    energy: { center: "Solar Generation", right: ["Wind Power Generator", "Renewable Energy"], bottom: "H2 Ecosystem" },
    construction: { center: "Structural Beams", right: ["Bridge Components", "Metal Decking"], bottom: "Rebar Systems" },
    automotive: { center: "Advanced AHSS", right: ["Body-in-White", "Safety Cages"], bottom: "Chassis Parts" },
    industrial: { center: "Machine Frames", right: ["Mining Machinery", "Heavy Presses"], bottom: "Conveyor Lines" },
  };

  const productTabs = [
    { id: "electrical", label: "Electrical steel" },
    { id: "hot-rolled", label: "Hot Rolled Steel" },
    { id: "galvanized", label: "Galvanized Steel" },
    { id: "cold-rolled", label: "Cold Rolled Steel" },
    { id: "stainless", label: "Stainless Steel" },
  ];

  const tabProducts: Record<string, Array<{ name: string; featured?: boolean }>> = {
    "hot-rolled": [
      { name: "Steel for Cold\nRolled Steel" },
      { name: "Mild Steel" },
      { name: "High Strength\nSteel", featured: true },
      { name: "Post Heat\nTreatment Steel" },
    ],
    "electrical": [
      { name: "Silicon Steel" },
      { name: "Non-Grain\nOriented", featured: true },
      { name: "Grain\nOriented" },
      { name: "Motor\nLaminate" },
    ],
    "galvanized": [
      { name: "Hot-Dip\nGalvanized", featured: true },
      { name: "Electro-\nGalvanized" },
      { name: "Galvannealed" },
      { name: "Zinc-Aluminum\nAlloy" },
    ],
    "cold-rolled": [
      { name: "Full Hard" },
      { name: "Skin Passed", featured: true },
      { name: "Batch\nAnnealed" },
      { name: "Continuous\nAnnealed" },
    ],
    "stainless": [
      { name: "Type 304", featured: true },
      { name: "Type 316" },
      { name: "Type 430" },
      { name: "Duplex Steel" },
    ],
  };

  const sol = solutionItems[activeCategory];

  return (
    <div className="bg-white overflow-x-hidden" style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}>

      {/* ── NAVIGATION ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="px-10 py-3.5 flex items-center justify-between">
          <FerroLogo />
          <div className="flex items-center gap-9 text-[13px] font-medium text-gray-600">
            {["Products", "Solutions", "Sustainability", "Company", "News"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-gray-900 transition-colors">{item}</a>
            ))}
          </div>
          <a href="#contact" className="border border-gray-900 px-5 py-2 text-[13px] font-medium hover:bg-gray-900 hover:text-white transition-colors">
            Contact Us
          </a>
        </div>
      </nav>

      {/* ── STATS ── */}
      <section className="pt-[60px] bg-white">
        <div className="px-12 pt-14 pb-10">
          <div className="grid grid-cols-3">
            <div className="pr-10">
              <div className="text-[clamp(72px,8vw,120px)] font-black leading-none tracking-[-0.04em] text-gray-900">38</div>
              <div className="mt-4 text-[15px] text-gray-500 leading-relaxed">million tons<br />of steel products</div>
            </div>
            <div className="px-10 relative border-l border-gray-100">
              <div className="absolute -left-1 top-4 w-2 h-2 rounded-full" style={{ backgroundColor: ORANGE }} />
              <div className="text-[clamp(72px,8vw,120px)] font-black leading-none tracking-[-0.04em] text-gray-900">27</div>
              <div className="mt-4 text-[15px] text-gray-500 leading-relaxed">thousand people<br />work at the company</div>
            </div>
            <div className="pl-10 relative border-l border-gray-100">
              <div className="absolute -left-1 top-4 w-2 h-2 rounded-full" style={{ backgroundColor: ORANGE }} />
              <div className="text-[clamp(72px,8vw,120px)] font-black leading-none tracking-[-0.04em] text-gray-900">62</div>
              <div className="mt-4 text-[15px] text-gray-500 leading-relaxed">countries importing<br />FERRO products</div>
            </div>
          </div>
        </div>

        {/* Abstract industrial image */}
        <div className="relative h-72 overflow-hidden select-none">
          <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #0a1420 0%, #17253a 45%, #0a1a2a 100%)" }} />
          <div className="absolute inset-0 flex flex-col justify-center gap-2 py-4 overflow-hidden"
            style={{ transform: "perspective(600px) rotateX(6deg)", transformOrigin: "top center" }}>
            {[0, 1, 2, 3, 4].map((row) => (
              <div key={row} className="flex gap-2 px-4" style={{ marginLeft: `${row % 2 === 0 ? 0 : 28}px` }}>
                {Array.from({ length: 20 }).map((_, col) => {
                  const palette = ["#f05000", "#1a3a5c", "#f59e0b", "#374151", "#ff6a1a", "#0e3a6a"];
                  const c = palette[(row * 7 + col * 3) % palette.length];
                  return (
                    <div key={col} className="flex-shrink-0 rounded-[3px] border-[1.5px]"
                      style={{ width: 52, height: 44, borderColor: c, backgroundColor: c + "18" }}>
                      <div className="m-[4px] h-[calc(100%-8px)] border opacity-40" style={{ borderColor: c }} />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to bottom, rgba(255,255,255,0.08) 0%, transparent 30%, transparent 70%, rgba(10,20,30,0.7) 100%)"
          }} />
        </div>
      </section>

      {/* ── SOLUTIONS ── */}
      <section id="solutions" className="py-20 px-12" style={{ backgroundColor: SAGE }}>
        <h2 className="text-[clamp(32px,4vw,50px)] font-black text-center text-gray-900 mb-16 leading-tight tracking-tight">
          High level of offered<br />solutions and services
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-[180px_1fr_180px] items-center gap-8">
          {/* Category list */}
          <div className="space-y-5">
            {categories.map((cat) => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                className={`block text-left transition-all font-semibold ${activeCategory === cat.id
                  ? "text-gray-900 text-lg"
                  : "text-gray-500 text-base hover:text-gray-700"}`}>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Center card + bottom label */}
          <div className="flex flex-col items-center gap-5">
            <div className="relative w-52 h-52 flex flex-col items-center justify-center rounded-[2px]"
              style={{ backgroundColor: ORANGE }}>
              <div className="absolute top-3 right-3 opacity-70">
                <span className="text-white text-xs border border-white/40 px-1.5 py-0.5">↗</span>
              </div>
              <svg className="w-10 h-10 mb-3 opacity-80" viewBox="0 0 40 40" fill="none" stroke="white" strokeWidth="1.5">
                <circle cx="20" cy="20" r="7" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                  <line key={deg}
                    x1={20 + Math.cos(deg * Math.PI / 180) * 10}
                    y1={20 + Math.sin(deg * Math.PI / 180) * 10}
                    x2={20 + Math.cos(deg * Math.PI / 180) * 14}
                    y2={20 + Math.sin(deg * Math.PI / 180) * 14} />
                ))}
              </svg>
              <div className="text-white font-bold text-base text-center px-3 leading-tight">{sol.center}</div>
              <button className="mt-3 border border-white/50 text-white text-[11px] px-4 py-1.5 hover:bg-white hover:text-orange-600 transition-colors">
                Learn more
              </button>
            </div>
            <div className="text-[13px] font-medium text-gray-600">{sol.bottom}</div>
          </div>

          {/* Right labels */}
          <div className="space-y-6">
            {sol.right.map((item) => (
              <div key={item} className="text-[13px] font-medium text-gray-700 text-right">{item}</div>
            ))}
          </div>
        </div>
        <NavArrows className="mt-12 text-gray-600" />
      </section>

      {/* ── GREEN PLAN BANNER ── */}
      <div className="relative h-52 overflow-hidden flex items-center px-12" style={{ backgroundColor: "#0d2015" }}>
        <div className="relative z-10">
          <h2 className="text-[clamp(28px,4vw,44px)] font-black text-white leading-tight">
            Green Plan<br />for green planet
          </h2>
        </div>
        {/* Teal abstract shapes */}
        <div className="absolute right-0 top-0 bottom-0 w-2/5 overflow-hidden opacity-75"
          style={{ perspective: "400px" }}>
          <div className="absolute inset-0 flex flex-wrap content-start gap-1.5 p-6"
            style={{ transform: "rotateY(-12deg) rotateX(5deg)" }}>
            {Array.from({ length: 30 }).map((_, i) => (
              <div key={i} className="rounded-[3px]" style={{
                width: 38, height: 38,
                backgroundColor: ["#1a5c40", "#2d8c5e", "#16a86b", "#0d4430", "#3dba7e", "#0a3828"][i % 6],
                opacity: 0.55 + (i % 5) * 0.09,
              }} />
            ))}
          </div>
        </div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent 40%, #0d201500 100%)" }} />
      </div>

      {/* ── STEEL PRODUCTS ── */}
      <section id="products" className="py-16 px-12 bg-white">
        <h2 className="text-[clamp(32px,4vw,48px)] font-black text-center text-gray-900 mb-8 tracking-tight">Steel products</h2>
        {/* Tabs */}
        <div className="flex flex-wrap gap-2.5 mb-10">
          {productTabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveProductTab(tab.id)}
              className={`px-5 py-2 text-[13px] font-semibold rounded-full border transition-all ${activeProductTab === tab.id
                ? "bg-gray-900 text-white border-gray-900"
                : "border-gray-300 text-gray-500 hover:border-gray-600 hover:text-gray-700"}`}>
              {tab.label}
            </button>
          ))}
        </div>
        {/* Product cards */}
        <div className="grid grid-cols-4 gap-5">
          {(tabProducts[activeProductTab] ?? []).map((product, i) => (
            <div key={i} className={`border transition-all ${product.featured
              ? "border-gray-200 shadow-sm"
              : "border-gray-100 hover:border-gray-200"}`}>
              {product.featured && (
                <div className="relative h-32 overflow-hidden" style={{ background: "linear-gradient(135deg, #1a3050 0%, #2a4878 60%, #3a5a8a 100%)" }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="grid grid-cols-4 gap-1">
                      {Array.from({ length: 12 }).map((_, j) => (
                        <div key={j} className="w-5 h-5 rounded-sm" style={{
                          backgroundColor: ["#d4b896", "#b8987a", "#9a7d60", "#c0a882"][j % 4],
                          opacity: 0.65,
                        }} />
                      ))}
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 w-6 h-6 border border-white/30 flex items-center justify-center text-white/60 text-xs">↗</div>
                </div>
              )}
              <div className="p-5">
                <h3 className="text-[15px] font-bold text-gray-900 whitespace-pre-line leading-snug">{product.name}</h3>
                <div className="mt-3 text-[10px] text-gray-300 font-mono leading-relaxed">
                  FERRO-SPC-09231B<br />AS-SPC-041023B<br />EN SS030929290
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── INDUSTRIAL MACHINERY ── */}
      <section style={{ backgroundColor: SAGE_BG }}>
        <div className="px-12 pt-16 pb-0 grid grid-cols-2 items-start gap-10">
          <h2 className="text-[clamp(44px,5.5vw,76px)] font-black leading-none tracking-[-0.04em] text-gray-900">
            Industrial<br />Machinery
          </h2>
          <div className="pt-2">
            <div className="w-2 h-2 rounded-full mb-5 ml-auto" style={{ backgroundColor: ORANGE }} />
            <p className="text-[14px] text-gray-600 leading-relaxed max-w-xs ml-auto">
              High-performance steel products that can be used for the production of construction and mining machines, heavy-duty machinery, defense equipment and more.
            </p>
          </div>
        </div>
        {/* Dark abstract image */}
        <div className="relative mt-8 h-72 overflow-hidden">
          <div className="absolute inset-0" style={{ background: "linear-gradient(170deg, #080f1a 0%, #12202f 50%, #080f1a 100%)" }} />
          <div className="absolute inset-0 overflow-hidden flex flex-col gap-2 py-4"
            style={{ transform: "perspective(700px) rotateX(5deg)", transformOrigin: "top center" }}>
            {[0, 1, 2, 3, 4].map((row) => (
              <div key={row} className="flex gap-2 px-3" style={{ marginLeft: row % 2 === 0 ? 0 : 30 }}>
                {Array.from({ length: 22 }).map((_, col) => {
                  const pal = ["#f05000", "#1a3a5c", "#f59e0b", "#374151", "#ff6a1a"];
                  const c = pal[(row * 5 + col * 4) % pal.length];
                  return (
                    <div key={col} className="flex-shrink-0 rounded-[2px] border-2 relative"
                      style={{ width: 52, height: 44, borderColor: c, backgroundColor: c + "15" }}>
                      <div className="absolute inset-[3px] border opacity-30" style={{ borderColor: c }} />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to bottom, rgba(10,20,30,0.3) 0%, transparent 30%, transparent 70%, rgba(10,20,30,0.6) 100%)"
          }} />
          <div className="absolute bottom-5 left-12">
            <button className="flex items-center gap-3 border border-white/25 bg-white/10 backdrop-blur-sm text-white text-[13px] font-medium px-5 py-3 hover:bg-white/20 transition-colors">
              Digital Brochure <span className="text-base ml-1">↓</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── NEWS & STORY ── */}
      <section id="news">
        {/* Orange header */}
        <div className="py-14 px-12 relative" style={{ backgroundColor: ORANGE }}>
          <div className="flex items-start justify-between">
            <NavArrows className="text-gray-800 mt-1" />
            <div className="text-right">
              <h2 className="text-[clamp(36px,5vw,60px)] font-black text-gray-900 leading-none tracking-tight mb-3">News & Story</h2>
              <p className="text-[13px] text-gray-700 max-w-[260px] text-right leading-relaxed ml-auto">
                This is hot-rolled steel that has been cold-rolled to its specified final thickness at room temperature and may be supplied as fully processed (annealed) or full hard.
              </p>
            </div>
          </div>
        </div>
        {/* Articles */}
        <div className="grid grid-cols-2" style={{ backgroundColor: SAGE_BG }}>
          {[
            {
              tag: "REPORTS",
              title: "Sustainability Report on the Steel Industry Highlights Gaps and Strengths",
              date: "2025-10-10",
              hasImage: true,
            },
            {
              tag: "INDUSTRY",
              title: "Ask an Expert: Manufacturing in the 4th Industrial Revolution",
              date: "2025-10-10",
              hasImage: false,
            },
          ].map((article, i) => (
            <div key={i} className={`p-10 border-gray-200 ${i === 0 ? "border-r" : ""}`}>
              <div className="flex items-start gap-5 justify-between">
                <div className="flex-1">
                  <span className="text-[10px] font-bold tracking-[0.15em] text-gray-400 uppercase">{article.tag}</span>
                  <h3 className="text-[18px] font-bold text-gray-900 mt-2 leading-snug max-w-xs">{article.title}</h3>
                </div>
                {article.hasImage && (
                  <div className="flex-shrink-0 w-36 h-24 overflow-hidden rounded-[2px]"
                    style={{ background: "linear-gradient(160deg, #304060, #507090, #405070)" }}>
                    <div className="h-full flex items-end justify-around px-4 pb-2">
                      {[0, 1, 2].map((j) => (
                        <div key={j} className="relative flex flex-col items-center" style={{ height: "70%" }}>
                          <div className="w-px h-full bg-white/40" />
                          {[[-30, 0], [30, 0], [0, -90]].map(([r], k) => (
                            <div key={k} className="absolute top-0 w-6 h-px bg-white/50 origin-left"
                              style={{ transform: `rotate(${r}deg)` }} />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-8 flex items-center justify-between">
                <span className="text-[11px] text-gray-400">{article.date}</span>
                <button className="w-8 h-8 border border-gray-300 flex items-center justify-center text-gray-400 text-xs hover:border-gray-600 hover:text-gray-700 transition-colors">↘</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── EVOLUTION IN STEEL ── */}
      <section className="py-20 px-12" style={{ backgroundColor: NAVY }}>
        <div className="flex items-center justify-center gap-8 mb-14">
          <button className="w-9 h-9 border border-white/20 flex items-center justify-center text-white/40 hover:border-white/60 hover:text-white text-sm transition-colors">←</button>
          <h2 className="text-[clamp(32px,4.5vw,54px)] font-black text-white text-center leading-tight tracking-tight">
            An evolution<br />in steel
          </h2>
          <button className="w-9 h-9 border border-white/20 flex items-center justify-center text-white/40 hover:border-white/60 hover:text-white text-sm transition-colors">→</button>
        </div>
        <div className="grid grid-cols-3 gap-5">
          {[
            {
              title: "Hot-Rolled",
              desc: "Steel sheet is processed to its final thickness by rolling at high temperatures on a hot-rolling mill.",
              hasImg: true,
              icon: (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2">
                  <rect x="1" y="1" width="6" height="6" /><rect x="9" y="1" width="6" height="6" />
                  <rect x="1" y="9" width="6" height="6" /><rect x="9" y="9" width="6" height="6" />
                </svg>
              ),
            },
            {
              title: "Cold-Rolled",
              desc: "This is hot-rolled steel that has been cold-rolled to its specified final thickness at room temperature and may be supplied as fully processed (annealed) or full hard.",
              hasImg: false,
              icon: (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2">
                  <circle cx="8" cy="8" r="4" />
                  {[0, 90, 180, 270, 45, 135, 225, 315].map((d) => (
                    <line key={d}
                      x1={8 + Math.cos(d * Math.PI / 180) * 5} y1={8 + Math.sin(d * Math.PI / 180) * 5}
                      x2={8 + Math.cos(d * Math.PI / 180) * 7} y2={8 + Math.sin(d * Math.PI / 180) * 7} />
                  ))}
                </svg>
              ),
            },
            {
              title: "Galvannealed",
              desc: "Here an extra tight coating of galvanizing metal (zinc) is applied to a soft steel sheet, after which the sheet is passed through an oven. The coating is dull gray without spangle.",
              hasImg: false,
              icon: (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2">
                  <line x1="1" y1="3" x2="15" y2="3" /><line x1="1" y1="7" x2="15" y2="7" />
                  <line x1="1" y1="11" x2="15" y2="11" /><line x1="1" y1="15" x2="15" y2="15" />
                </svg>
              ),
            },
          ].map((item) => (
            <div key={item.title} className="border border-white/10 p-6">
              {item.hasImg && (
                <div className="h-28 mb-5 rounded-[2px] overflow-hidden"
                  style={{ background: "linear-gradient(135deg, #1a3050, #2a4878)" }}>
                  <div className="h-full flex items-center justify-center">
                    <div className="grid grid-cols-5 gap-1.5">
                      {Array.from({ length: 15 }).map((_, j) => (
                        <div key={j} className="rounded-[2px]" style={{
                          width: 15, height: 15,
                          backgroundColor: ["#3a6090", "#5080b0", "#7090c0", "#2a5080", "#4a70a0"][j % 5],
                          opacity: 0.65 + (j % 5) * 0.07,
                        }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {!item.hasImg && <div className="h-28 mb-5" />}
              <h3 className="text-xl font-bold text-white mb-2.5">{item.title}</h3>
              <p className="text-[13px] text-gray-400 leading-relaxed">{item.desc}</p>
              <div className="mt-6 w-8 h-8 border border-white/20 flex items-center justify-center">
                {item.icon}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FERRO QUALITY ── */}
      <section id="company" className="bg-white">
        {/* Application types */}
        <div className="px-12 pt-14 pb-0 grid grid-cols-3 gap-px border-b border-gray-100">
          {["Machine Structure", "Heavy Equipment", "Land-based weapons"].map((title, i) => (
            <div key={title} className={`pb-8 relative ${i < 2 ? "border-r border-gray-100 pr-10" : "pl-10"}`}>
              {i < 2 && <div className="absolute bottom-2 right-3 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ORANGE }} />}
              <h3 className="text-[22px] font-black text-gray-900">{title}</h3>
            </div>
          ))}
        </div>

        {/* FERRO Quality heading + certificate */}
        <div className="px-12 py-10 flex items-start justify-between border-b border-gray-100">
          <h2 className="text-[clamp(40px,6vw,72px)] font-black text-gray-900 leading-none tracking-[-0.04em]">
            The FERRO<br />Quality
          </h2>
          <button className="flex items-center gap-2.5 border border-gray-300 px-5 py-2.5 text-[13px] font-medium mt-3 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-colors">
            Certificate <span>↓</span>
          </button>
        </div>

        {/* Article + cable image */}
        <div className="grid grid-cols-2">
          <div className="px-12 py-10 border-r border-gray-100">
            <span className="text-[10px] font-bold tracking-[0.15em] text-gray-400 uppercase">Industry</span>
            <h3 className="text-[18px] font-bold text-gray-900 mt-2 mb-8 max-w-xs leading-snug">
              Ask an Expert: Manufacturing in the 4th Industrial Revolution
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-gray-400">2025-10-10</span>
              <button className="w-8 h-8 border border-gray-300 flex items-center justify-center text-gray-400 text-xs hover:border-gray-600 transition-colors">↘</button>
            </div>
          </div>
          {/* Helical cable texture */}
          <div className="h-56 overflow-hidden" style={{ background: "linear-gradient(160deg, #3a4a5a, #4a5a6a, #2a3a4a)" }}>
            <div className="h-full flex items-center justify-center opacity-60">
              <div className="flex gap-1 items-end" style={{ height: "80%" }}>
                {Array.from({ length: 22 }).map((_, i) => (
                  <div key={i} className="w-3 rounded-full"
                    style={{
                      height: `${70 + Math.sin(i * 0.9 + 1) * 28}%`,
                      background: "linear-gradient(to bottom, #7a8a9a, #4a5a6a, #7a8a9a)",
                    }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DASHBOARD ── */}
      <section className="py-16 px-12" style={{ backgroundColor: SAGE_BG }}>
        <div className="mb-8 text-center">
          <div className="text-[10px] font-bold tracking-[0.15em] text-gray-500 uppercase mb-2">Capacity / Overview</div>
          <h2 className="text-[clamp(28px,3.5vw,42px)] font-black text-gray-900 tracking-tight">
            Digital Production Platform
          </h2>
        </div>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 max-w-5xl mx-auto">
          <div className="flex">
            {/* Sidebar */}
            <div className="w-12 bg-gray-900 flex flex-col items-center py-5 gap-5 flex-shrink-0">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className={`w-5 h-5 rounded-sm ${i === 0 ? "bg-white/40" : "bg-white/10"}`} />
              ))}
            </div>
            {/* Content */}
            <div className="flex-1 p-5">
              <div className="grid grid-cols-3 gap-3">
                {/* Throughput */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[11px] font-semibold text-gray-500">Throughput</span>
                    <span className="text-[10px] text-gray-400">This week</span>
                  </div>
                  <div className="text-[22px] font-black text-gray-900 leading-tight">+4.2%</div>
                  <div className="text-[10px] text-gray-400 mb-3">production volume growth</div>
                  <div className="flex items-end gap-0.5 h-8">
                    {[42, 65, 48, 72, 56, 84, 68].map((h, i) => (
                      <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, backgroundColor: i === 5 ? ORANGE : "#e5e7eb" }} />
                    ))}
                  </div>
                </div>
                {/* On-time delivery */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between mb-3">
                    <span className="text-[11px] font-semibold text-gray-500">On-time delivery</span>
                    <span className="text-[10px] text-blue-500">View All</span>
                  </div>
                  {[
                    { label: "Urgent Steel Delivery to New York, USA (depo 1)", status: "Dispatch", color: "#f05000" },
                    { label: "International Freight Shipment", status: "Preparation", color: "#4a7090" },
                  ].map((item, i) => (
                    <div key={i} className={`py-1.5 ${i === 0 ? "border-b border-gray-200 mb-1.5" : ""}`}>
                      <p className="text-[11px] text-gray-800 leading-tight mb-1 line-clamp-1">{item.label}</p>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: item.color + "20", color: item.color }}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
                {/* Total Revenue */}
                <div className="rounded-lg p-4" style={{ backgroundColor: ORANGE }}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[11px] font-semibold text-white/80">Total revenue</span>
                    <span className="text-[9px] bg-white/20 text-white px-1.5 py-0.5 rounded">USD $</span>
                  </div>
                  <div className="text-[20px] font-black text-white leading-tight">$2,456,900</div>
                  <div className="flex items-center gap-1 mt-1 mb-3">
                    <span className="text-[9px] bg-white/20 text-white px-1.5 py-0.5 rounded">+2.5%</span>
                    <span className="text-[9px] text-white/70">revenue growth ratio</span>
                  </div>
                  <div className="flex items-end gap-0.5 h-7">
                    {[60, 80, 50, 90, 70, 100, 75, 85, 60, 95].map((h, i) => (
                      <div key={i} className="flex-1 bg-white/30 rounded-sm" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
                {/* Worker capacity */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between mb-3">
                    <span className="text-[11px] font-semibold text-gray-500">Worker capacity</span>
                    <span className="text-[10px] text-blue-500">View All</span>
                  </div>
                  {[{ name: "John S.", hours: 34, pct: 80 }, { name: "Maria J.", hours: 36.8, pct: 62 }].map((w) => (
                    <div key={w.name} className="flex items-center gap-2 mb-2.5">
                      <div className="w-6 h-6 rounded-full bg-gray-200 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <span className="text-[11px] font-medium text-gray-700">{w.name}</span>
                          <span className="text-[10px] text-gray-400">{w.hours}h</span>
                        </div>
                        <div className="mt-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${w.pct}%`, backgroundColor: ORANGE }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Quality */}
                <div className="bg-gray-50 rounded-lg p-4 col-span-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-[11px] font-semibold text-gray-500">Quality</span>
                    <span className="text-[10px] font-bold text-yellow-600">HIGH</span>
                  </div>
                  <div className="text-[10px] text-gray-400 mb-3">Low defect rate, %</div>
                  <div className="flex items-end gap-1 h-12">
                    {[0.35, 0.55, 0.25, 0.8, 0.67, 0.45, 0.9, 0.5, 0.72, 0.38, 0.61, 0.84].map((v, i) => (
                      <div key={i} className="flex-1 rounded-sm" style={{ height: `${v * 100}%`, backgroundColor: i < 5 ? "#e5e7eb" : NAVY }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SUSTAINABILITY ── */}

      {/* Net Zero */}
      <section id="sustainability" className="py-20 px-12 relative overflow-hidden" style={{ backgroundColor: "#9fb2ac" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 items-end gap-16">
          <div>
            <p className="text-[13px] text-gray-600 leading-relaxed mb-10 max-w-xs">
              FERRO is one of the first diversified steel makers in North America with net zero, science-based greenhouse gas targets for 2045, which includes Scopes 1, 2 & 3.
            </p>
            <h2 className="text-[clamp(44px,7vw,88px)] font-black text-gray-900 leading-none tracking-[-0.04em]">
              Net Zero<br />by 2045
            </h2>
          </div>
          {/* Modular tower */}
          <div className="flex justify-end items-end">
            <div className="flex flex-col-reverse gap-1 items-center">
              {Array.from({ length: 8 }).map((_, row) => (
                <div key={row} className="flex gap-1">
                  {Array.from({ length: row + 1 }).map((_, col) => (
                    <div key={col} className="rounded-[2px]" style={{
                      width: 22, height: 22,
                      backgroundColor: ["#1a5c40", "#2d8c5e", "#3dba7e", "#9ccf58", "#c8e060", "#0d4430"][(row + col) % 6],
                      opacity: 0.85,
                    }} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GHG Emissions */}
      <section className="grid grid-cols-2">
        <div className="p-14 flex flex-col" style={{ backgroundColor: ORANGE }}>
          <h2 className="text-[clamp(28px,3.5vw,42px)] font-black text-gray-900 leading-tight mb-4 tracking-tight">
            Greenhouse<br />gas emissions
          </h2>
          <p className="text-[13px] text-gray-700 max-w-xs leading-relaxed">
            FERRO&rsquo;s circular steel mill GHG intensity is 1/3 the global average of extractive, blast furnace steelmakers for Scopes 1, 2 &amp; 3.
          </p>
          <button className="mt-auto w-8 h-8 border border-gray-700/30 flex items-center justify-center text-gray-700 text-xs self-start mt-10 hover:bg-gray-900/10 transition-colors">↘</button>
        </div>
        <div className="p-14" style={{ backgroundColor: SAGE_BG }}>
          <div className="mb-7">
            <div className="text-[clamp(56px,7vw,88px)] font-black leading-none text-gray-900 tracking-[-0.04em]">0.77</div>
            <div className="text-[12px] text-gray-500 mt-2">FERRO average tons of CO₂e per ton of steel</div>
          </div>
          <div className="space-y-3">
            {[
              { label: "FERRO", value: 0.77, pct: 33 },
              { label: "Extractive", value: 2.33, pct: 93 },
              { label: "Global", value: 1.91, pct: 76 },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="w-8 text-[10px] text-gray-400 font-medium text-right flex-shrink-0">0.0</div>
                <div className="flex-1 h-9 bg-white rounded-full overflow-hidden relative flex items-center">
                  <div className="absolute left-2 right-2 flex gap-1 items-center">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div key={i} className="w-1 h-1 rounded-full bg-gray-200 flex-shrink-0" />
                    ))}
                  </div>
                  <div className="absolute right-0 h-full rounded-full flex items-center justify-end pr-4"
                    style={{ width: `${item.pct}%`, backgroundColor: NAVY, minWidth: 90 }}>
                    <span className="text-white text-[12px] font-bold whitespace-nowrap">{item.label} {item.value}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner + 38Mt */}
      <section className="grid grid-cols-2 border-t border-gray-100">
        <div className="p-12 bg-white">
          <h3 className="text-[clamp(24px,3vw,36px)] font-black text-gray-900 leading-tight">
            Your partner<br />in a better world
          </h3>
        </div>
        <div className="p-12 flex items-center border-l border-gray-100" style={{ backgroundColor: SAGE_BG }}>
          <span className="text-[clamp(40px,6vw,80px)] font-black text-gray-900 tracking-[-0.04em]">38Mt</span>
        </div>
      </section>

      {/* Recycling */}
      <section className="bg-white">
        <div className="px-12 py-16 grid grid-cols-2 items-center gap-8">
          <div>
            <h2 className="text-[clamp(40px,5vw,64px)] font-black text-gray-900 mb-5 tracking-[-0.03em]">Recycling</h2>
            <p className="text-[14px] text-gray-500 leading-relaxed max-w-xs">
              Steel can be infinitely recycled and reused without any quality loss. Ferro steel products are made from an average of 77.0% recycled content, with some products containing almost 100% recycled content.
            </p>
            <button className="mt-8 w-8 h-8 border border-gray-300 flex items-center justify-center text-gray-400 text-xs hover:border-gray-600 transition-colors">↘</button>
          </div>
          {/* 80% + orange oval */}
          <div className="relative h-64 flex items-center justify-center">
            <div className="absolute" style={{
              width: 220, height: 180,
              background: "radial-gradient(ellipse at 45% 42%, #f05000 0%, #d84000 55%, #b03000 100%)",
              borderRadius: "50%",
              transform: "scaleX(1.35) rotate(-5deg)",
              filter: "blur(2px)",
            }} />
            <div className="relative text-center">
              <div className="text-[80px] font-black text-gray-900 leading-none tracking-[-0.04em]">80%</div>
              <div className="text-[13px] text-gray-600 mt-1 font-medium">of dust recycled from EAF&rsquo;s</div>
            </div>
          </div>
        </div>
        {/* Factory floor image */}
        <div className="relative h-52 overflow-hidden">
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, #3a4a2a 0%, #5a6a3a 30%, #4a5a28 60%, #3a4820 100%)" }} />
          <div className="absolute inset-0 flex items-center justify-center opacity-50">
            <div className="flex gap-4 w-full px-10">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="flex-1 h-36 relative rounded-sm overflow-hidden" style={{
                  background: `linear-gradient(${i % 2 === 0 ? "45" : "-45"}deg, #f05000, #f09040, #f05000, #804020)`,
                  opacity: 0.55,
                }}>
                  <div className="absolute inset-[3px] border border-white/10" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer id="contact" className="bg-gray-900 text-white py-16 px-12">
        <div className="max-w-5xl mx-auto grid grid-cols-4 gap-12 mb-12">
          <div>
            <FerroLogo color="white" />
            <p className="mt-4 text-[13px] text-gray-400 leading-relaxed">
              One of the world&rsquo;s leading steel producers, committed to sustainable manufacturing.
            </p>
          </div>
          {[
            { title: "Products", links: ["Hot Rolled Steel", "Cold Rolled Steel", "Galvanized Steel", "Stainless Steel"] },
            { title: "Solutions", links: ["Energy", "Automotive", "Construction", "Industrial Machinery"] },
            { title: "Company", links: ["About FERRO", "Sustainability", "Careers", "News"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-[13px] font-bold mb-4 tracking-wide">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}><a href="#" className="text-[13px] text-gray-400 hover:text-white transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-5xl mx-auto border-t border-gray-800 pt-8 flex items-center justify-between">
          <span className="text-[12px] text-gray-500">© 2025 FERRO Steel Corporation. All rights reserved.</span>
          <span className="text-[12px] text-gray-500">Privacy Policy · Terms of Service</span>
        </div>
      </footer>

    </div>
  );
}
