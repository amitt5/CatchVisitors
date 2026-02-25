"use client"

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Mail } from 'lucide-react'
import type { PresetConfig } from './types'

const ease = [0.25, 0.46, 0.45, 0.94] as const

export function GetStarted({ config }: { config: PresetConfig }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const btnRadius = config.radius === '0px' ? '0px' : '9999px'

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: config.pageBg, padding: '10rem 2rem' }}
    >
      {/* Accent radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 55% 55% at 50% 50%, ${config.accentMuted} 0%, transparent 70%)`,
        }}
      />

      {/* Decorative vertical rule */}
      <div
        className="absolute top-0 left-1/2 pointer-events-none"
        style={{
          transform: 'translateX(-50%)',
          width: '1px',
          height: '80px',
          background: `linear-gradient(to bottom, transparent, ${config.accent}50)`,
        }}
      />

      {/* Optional neon glow for Preset D */}
      {config.glowColor && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 40% 30% at 50% 50%, ${config.glowColor} 0%, transparent 60%)`,
          }}
        />
      )}

      <div
        ref={ref}
        className="relative text-center"
        style={{ maxWidth: '60rem', margin: '0 auto' }}
      >
        {/* Eyebrow */}
        <motion.span
          className="block text-[10px] tracking-[0.45em] uppercase mb-10"
          style={{ fontFamily: 'var(--font-mono)', color: config.accent }}
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
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(3rem, 6.5vw, 5.5rem)',
            color: config.textPrimary,
          }}
          initial={{ opacity: 0, y: 48 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease }}
        >
          Ready to strengthen
          <br />
          <em
            style={{
              fontFamily: 'var(--font-drama)',
              fontStyle: 'italic',
              color: config.accent,
            }}
          >
            your supply chain?
          </em>
        </motion.h2>

        {/* Sub-copy */}
        <motion.p
          className="text-lg mb-14"
          style={{
            fontFamily: 'var(--font-heading)',
            color: config.textSecondary,
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
          <CTAButton config={config} btnRadius={btnRadius}>
            Request a Quote <ArrowRight size={16} className="ml-2" />
          </CTAButton>

          <a
            href="mailto:info@navank.in"
            className="flex items-center gap-2 text-sm transition-all duration-200"
            style={{
              fontFamily: 'var(--font-heading)',
              color: config.textMuted,
              letterSpacing: '0.04em',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = config.textSecondary
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = config.textMuted
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <Mail size={14} />
            info@navank.in
          </a>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-8 mt-20"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {['25+ Years Experience', 'ISO-Certified Partners', 'In-House Logistics', 'Global Coverage'].map(
            (badge) => (
              <div key={badge} className="flex items-center gap-2">
                <div
                  className="w-1 h-1 rounded-full"
                  style={{ background: config.accent, opacity: 0.5 }}
                />
                <span
                  className="text-[11px] tracking-[0.2em] uppercase"
                  style={{ fontFamily: 'var(--font-mono)', color: config.textMuted }}
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

function CTAButton({
  children,
  config,
  btnRadius,
}: {
  children: React.ReactNode
  config: PresetConfig
  btnRadius: string
}) {
  return (
    <button
      className="group relative overflow-hidden flex items-center justify-center"
      style={{
        background: config.accent,
        color: config.btnTextColor,
        padding: '18px 40px',
        borderRadius: btnRadius,
        fontFamily: 'var(--font-heading)',
        fontWeight: 700,
        fontSize: '0.9rem',
        letterSpacing: '0.06em',
        transition:
          'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.03)'
        e.currentTarget.style.boxShadow = config.glowColor
          ? `0 12px 40px ${config.glowColor}`
          : `0 12px 40px ${config.accentMuted.replace(/0\.\d+\)$/, '0.35)')}`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <span
        className="absolute inset-0"
        style={{
          background: config.btnOverlay,
          transform: 'translateY(102%)',
          transition:
            'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
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
