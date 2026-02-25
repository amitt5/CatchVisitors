"use client"

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Mail } from 'lucide-react'

const ease = [0.25, 0.46, 0.45, 0.94] as const

export function GetStarted() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: '#0D0D12', padding: '10rem 2rem' }}
    >
      {/* Large champagne radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 55% at 50% 50%, rgba(201,168,76,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Decorative horizontal rule */}
      <div
        className="absolute top-0 left-1/2 pointer-events-none"
        style={{
          transform: 'translateX(-50%)',
          width: '1px',
          height: '80px',
          background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.3))',
        }}
      />

      <div
        ref={ref}
        className="relative text-center"
        style={{ maxWidth: '60rem', margin: '0 auto' }}
      >
        {/* Eyebrow */}
        <motion.span
          className="block text-[10px] tracking-[0.45em] uppercase mb-10"
          style={{ fontFamily: 'var(--font-jetbrains)', color: 'rgba(201,168,76,0.7)' }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          Ready to work together
        </motion.span>

        {/* Headline */}
        <motion.h2
          className="font-bold leading-[1.05] mb-8"
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 'clamp(3rem, 6.5vw, 5.5rem)',
            color: '#FAF8F5',
          }}
          initial={{ opacity: 0, y: 48 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease }}
        >
          Ready to strengthen
          <br />
          <em
            style={{
              fontFamily: 'var(--font-playfair)',
              fontStyle: 'italic',
              color: '#C9A84C',
            }}
          >
            your supply chain?
          </em>
        </motion.h2>

        {/* Sub-copy */}
        <motion.p
          className="text-lg mb-14"
          style={{
            fontFamily: 'var(--font-inter)',
            color: 'rgba(250,248,245,0.42)',
            lineHeight: '1.7',
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease }}
        >
          Serving cable manufacturers across India, Netherlands, and global markets.
          <br />
          From raw material specification to JIT warehouse delivery.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-5"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease }}
        >
          {/* Primary */}
          <CTAButton>
            Request a Quote <ArrowRight size={16} className="ml-2" />
          </CTAButton>

          {/* Secondary */}
          <div className="flex flex-col gap-2 text-left">
            <a
              href="mailto:naval@navank.nl"
              className="flex items-center gap-2 text-sm transition-all duration-200"
              style={{
                fontFamily: 'var(--font-inter)',
                color: 'rgba(250,248,245,0.4)',
                letterSpacing: '0.04em',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'rgba(250,248,245,0.8)'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(250,248,245,0.4)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <Mail size={14} />
              naval@navank.nl · Netherlands
            </a>
            <a
              href="mailto:abhinav@navank.onmicrosoft.com"
              className="flex items-center gap-2 text-sm transition-all duration-200"
              style={{
                fontFamily: 'var(--font-inter)',
                color: 'rgba(250,248,245,0.4)',
                letterSpacing: '0.04em',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'rgba(250,248,245,0.8)'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(250,248,245,0.4)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <Mail size={14} />
              abhinav@navank.onmicrosoft.com · India
            </a>
          </div>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-8 mt-20"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {['25+ Years', 'ISO-Certified Supply Chain', 'In-House Freight Forwarding', '$10M Annual Logistics'].map(
            (badge) => (
              <div key={badge} className="flex items-center gap-2">
                <div
                  className="w-1 h-1 rounded-full"
                  style={{ background: '#C9A84C', opacity: 0.5 }}
                />
                <span
                  className="text-[11px] tracking-[0.2em] uppercase"
                  style={{
                    fontFamily: 'var(--font-jetbrains)',
                    color: 'rgba(250,248,245,0.22)',
                  }}
                >
                  {badge}
                </span>
              </div>
            )
          )}
        </motion.div>
      </div>
    </section>
  )
}

function CTAButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      className="group relative overflow-hidden rounded-full flex items-center justify-center"
      style={{
        background: '#C9A84C',
        color: '#0D0D12',
        padding: '18px 40px',
        fontFamily: 'var(--font-inter)',
        fontWeight: 700,
        fontSize: '0.9rem',
        letterSpacing: '0.06em',
        transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.03)'
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(201,168,76,0.35)'
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
