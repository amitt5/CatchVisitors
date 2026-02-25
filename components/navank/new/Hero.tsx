"use client"

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'

const ease = [0.25, 0.46, 0.45, 0.94] as const

const stagger = (i: number) => ({
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.14, duration: 0.9, ease },
  },
})

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden" style={{ height: '100dvh', minHeight: '100vh' }}>
      {/* Background — dark marble */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1920&q=80"
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>

      {/* Layered gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(125deg, rgba(13,13,18,0.97) 0%, rgba(13,13,18,0.9) 35%, rgba(13,13,18,0.65) 65%, rgba(13,13,18,0.45) 100%)',
        }}
      />

      {/* Subtle gold vignette, bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[40%] pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(201,168,76,0.04) 0%, transparent 100%)',
        }}
      />

      {/* Content — bottom left */}
      <div className="absolute bottom-14 left-8 md:left-16 max-w-4xl">
        {/* Eyebrow */}
        <motion.div
          variants={stagger(0)}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-4 mb-6"
        >
          <div className="w-8 h-px bg-[#C9A84C]" />
          <span
            className="text-[#C9A84C] text-[10px] tracking-[0.45em] uppercase"
            style={{ fontFamily: 'var(--font-jetbrains)' }}
          >
            Est. 1998 · New Delhi · Netherlands
          </span>
        </motion.div>

        {/* Headline line 1 */}
        <motion.h1
          variants={stagger(1)}
          initial="hidden"
          animate="visible"
          className="font-bold tracking-tight leading-[0.95] mb-2 text-[#FAF8F5]"
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 'clamp(3.2rem, 8vw, 7.5rem)',
          }}
        >
          Global supply meets
        </motion.h1>

        {/* Headline line 2 — Playfair italic drama */}
        <motion.h1
          variants={stagger(2)}
          initial="hidden"
          animate="visible"
          className="italic leading-[0.95] mb-10"
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: 'clamp(3.8rem, 9.5vw, 8.5rem)',
            color: '#C9A84C',
          }}
        >
          Precision.
        </motion.h1>

        {/* Sub-copy */}
        <motion.p
          variants={stagger(3)}
          initial="hidden"
          animate="visible"
          className="text-lg leading-relaxed mb-10 max-w-lg"
          style={{
            fontFamily: 'var(--font-inter)',
            color: 'rgba(250,248,245,0.55)',
          }}
        >
          Premium raw materials for OFC, power, and data cable manufacturers —
          compounds, fiber components, and specialty materials delivered with
          25-year supply chain expertise.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={stagger(4)}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap items-center gap-5"
        >
          <MagneticButton>
            Request a Quote <ArrowRight size={15} className="ml-1" />
          </MagneticButton>

          <a
            href="#products"
            className="text-sm tracking-wide transition-all duration-200"
            style={{
              fontFamily: 'var(--font-inter)',
              color: 'rgba(250,248,245,0.45)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'rgba(250,248,245,0.85)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(250,248,245,0.45)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Explore materials →
          </a>
        </motion.div>
      </div>

      {/* Scroll cue — right side */}
      <motion.div
        className="absolute bottom-10 right-10 md:right-16 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.9 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown
            size={18}
            style={{ color: 'rgba(201,168,76,0.5)' }}
          />
        </motion.div>
        <span
          className="text-[9px] tracking-[0.4em] uppercase"
          style={{
            fontFamily: 'var(--font-jetbrains)',
            color: 'rgba(250,248,245,0.2)',
            writingMode: 'vertical-rl',
          }}
        >
          Scroll
        </span>
      </motion.div>

      {/* Stats strip — bottom right */}
      <motion.div
        className="absolute bottom-14 right-10 md:right-16 hidden lg:flex items-end gap-10"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.9, ease }}
      >
        {[
          { v: '25+', l: 'Years' },
          { v: '$14M', l: 'Revenue' },
          { v: '22%', l: 'YoY Growth' },
        ].map((s) => (
          <div key={s.l} className="text-right">
            <div
              className="font-bold leading-none"
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '1.6rem',
                color: '#C9A84C',
              }}
            >
              {s.v}
            </div>
            <div
              className="text-[10px] tracking-[0.3em] uppercase mt-1"
              style={{
                fontFamily: 'var(--font-jetbrains)',
                color: 'rgba(250,248,245,0.3)',
              }}
            >
              {s.l}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  )
}

function MagneticButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      className="group relative overflow-hidden rounded-full flex items-center"
      style={{
        background: '#C9A84C',
        color: '#0D0D12',
        padding: '14px 32px',
        fontFamily: 'var(--font-inter)',
        fontWeight: 700,
        fontSize: '0.85rem',
        letterSpacing: '0.06em',
        transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.03)'
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(201,168,76,0.3)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <span
        className="absolute inset-0"
        style={{
          background: '#FAF8F5',
          transform: 'translateY(102%)',
          transition: 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
        ref={(el) => {
          if (!el) return
          const btn = el.parentElement!
          btn.addEventListener('mouseenter', () => (el.style.transform = 'translateY(0)'))
          btn.addEventListener('mouseleave', () => (el.style.transform = 'translateY(102%)'))
        }}
      />
      <span className="relative flex items-center">{children}</span>
    </button>
  )
}
