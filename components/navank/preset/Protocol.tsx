"use client"

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { PresetConfig } from './types'

const ease = [0.25, 0.46, 0.45, 0.94] as const

const STEPS = [
  {
    number: '01',
    label: 'Source',
    headline: 'Global OEM Partnerships',
    body: 'We partner directly with world-class manufacturers across Asia and Europe — sourcing optical fiber components, cable compounds, and specialty materials at the raw material level, not through intermediaries.',
    detail:
      'Direct partnerships in China, Taiwan, South Korea, Germany, Italy, and the Netherlands. ISO-certified, audited suppliers exclusively.',
    motif: 'geometric' as const,
  },
  {
    number: '02',
    label: 'Certify',
    headline: 'Quality Assurance & Compliance',
    body: 'Every material batch undergoes rigorous technical validation. We verify mechanical properties, thermal ratings, chemical composition, and compliance with IEC, RoHS, and REACH before shipment.',
    detail:
      'Third-party lab testing, COA verification, MSDS documentation, and full batch traceability for every consignment we move.',
    motif: 'grid' as const,
  },
  {
    number: '03',
    label: 'Deliver',
    headline: 'Freight & JIT Warehouse Dispatch',
    body: 'In-house freight forwarding and just-in-time warehouse logistics ensure your materials arrive exactly when your production line needs them. No excess inventory. No delays.',
    detail:
      'FCL/LCL sea freight, air cargo, and customs clearance handled in-house. Warehouse hubs in New Delhi and the Netherlands.',
    motif: 'waveform' as const,
  },
]

/* ── SVG Motifs ── */
function GeometricMotif({ accent }: { accent: string }) {
  return (
    <div className="absolute right-0 top-0 w-1/2 h-full flex items-center justify-end pr-16 pointer-events-none">
      <svg
        viewBox="0 0 400 400"
        style={{ width: '380px', height: '380px', opacity: 0.055 }}
        fill="none"
        stroke={accent}
        strokeWidth="0.6"
      >
        {[1, 0.85, 0.7, 0.55, 0.4, 0.25, 0.12].map((scale, i) => (
          <polygon
            key={i}
            points="200,30 370,110 370,290 200,370 30,290 30,110"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: '200px 200px',
              opacity: 1 - i * 0.1,
            }}
          />
        ))}
        <circle cx="200" cy="200" r="6" fill={accent} opacity="0.6" />
        <circle cx="200" cy="200" r="40" strokeDasharray="3 6" />
        <circle cx="200" cy="200" r="90" strokeDasharray="1 8" />
      </svg>
    </div>
  )
}

function GridMotif({ accent }: { accent: string }) {
  return (
    <div className="absolute right-0 top-0 w-1/2 h-full flex items-center justify-end pr-16 pointer-events-none">
      <svg
        viewBox="0 0 400 400"
        style={{ width: '380px', height: '380px', opacity: 0.055 }}
        fill="none"
        stroke={accent}
        strokeWidth="0.5"
      >
        {Array.from({ length: 11 }).map((_, i) => (
          <line key={`h${i}`} x1="20" y1={20 + i * 36} x2="380" y2={20 + i * 36} />
        ))}
        {Array.from({ length: 11 }).map((_, i) => (
          <line key={`v${i}`} x1={20 + i * 36} y1="20" x2={20 + i * 36} y2="380" />
        ))}
        <line x1="200" y1="20" x2="200" y2="380" strokeWidth="1.2" />
        <line x1="20" y1="200" x2="380" y2="200" strokeWidth="1.2" />
        {[56, 92, 128, 200, 272, 308, 344].map((x, i) => (
          <circle key={i} cx={x} cy="200" r="3" fill={accent} />
        ))}
        <rect x="140" y="140" width="120" height="120" strokeWidth="0.8" />
      </svg>
    </div>
  )
}

function WaveformMotif({ accent }: { accent: string }) {
  const pts = Array.from({ length: 80 })
    .map((_, i) => {
      const x = (i / 79) * 360 + 20
      const t = i / 79
      const amp = 70 * Math.exp(-Math.pow((t - 0.5) * 4, 2))
      const y = 200 + amp * Math.sin(i * 0.55)
      return `${x},${y}`
    })
    .join(' ')

  return (
    <div className="absolute right-0 top-0 w-1/2 h-full flex items-center justify-end pr-16 pointer-events-none">
      <svg
        viewBox="0 0 400 400"
        style={{ width: '380px', height: '380px', opacity: 0.055 }}
        fill="none"
        stroke={accent}
      >
        <line x1="20" y1="200" x2="380" y2="200" strokeWidth="0.4" strokeDasharray="4 8" />
        <polyline points={pts} strokeWidth="1.5" />
        {[60, 120, 200, 280, 340].map((x, i) => (
          <circle key={i} cx={x} cy="200" r="2.5" fill={accent} opacity="0.7" />
        ))}
      </svg>
    </div>
  )
}

/* ── Single Protocol Card ── */
function ProtocolCard({
  step,
  index,
  config,
  bg,
}: {
  step: (typeof STEPS)[0]
  index: number
  config: PresetConfig
  bg: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div
      ref={ref}
      className="sticky top-0 flex items-center overflow-hidden"
      style={{
        minHeight: '100vh',
        background: bg,
        zIndex: 10 + index,
        borderTop: index > 0 ? `1px solid ${config.borderMuted}` : 'none',
      }}
    >
      {step.motif === 'geometric' && <GeometricMotif accent={config.accent} />}
      {step.motif === 'grid' && <GridMotif accent={config.accent} />}
      {step.motif === 'waveform' && <WaveformMotif accent={config.accent} />}

      <div
        className="w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
        style={{ maxWidth: '88rem', margin: '0 auto', padding: '6rem 2rem 6rem 4rem' }}
      >
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.95, ease }}
        >
          <div className="flex items-baseline gap-6 mb-10">
            <span
              className="font-bold leading-none"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(4.5rem, 9vw, 7rem)',
                color: config.accent,
                opacity: 0.3,
              }}
            >
              {step.number}
            </span>
            <span
              className="text-[10px] tracking-[0.45em] uppercase"
              style={{ fontFamily: 'var(--font-mono)', color: config.accent }}
            >
              {step.label}
            </span>
          </div>

          <h2
            className="font-bold leading-tight mb-6"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
              color: config.textPrimary,
            }}
          >
            {step.headline}
          </h2>

          <p
            className="text-lg leading-relaxed"
            style={{
              fontFamily: 'var(--font-heading)',
              color: config.textSecondary,
              maxWidth: '520px',
            }}
          >
            {step.body}
          </p>
        </motion.div>

        {/* Right — detail card */}
        <motion.div
          initial={{ opacity: 0, x: 48 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.95, delay: 0.15, ease }}
        >
          <div
            className="p-8"
            style={{
              borderRadius: config.radius,
              border: `1px solid ${config.borderMuted}`,
              background: config.accentMuted,
              boxShadow: config.glowColor ? `0 0 32px ${config.glowColor}` : 'none',
            }}
          >
            <div
              className="flex items-center gap-2 mb-6"
              style={{
                borderBottom: `1px solid ${config.borderMuted}`,
                paddingBottom: '16px',
              }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: config.accent, opacity: 0.6 }}
              />
              <span
                className="text-[10px] tracking-[0.35em] uppercase"
                style={{ fontFamily: 'var(--font-mono)', color: config.accent }}
              >
                Technical Notes
              </span>
            </div>
            <p
              className="text-sm leading-[1.9]"
              style={{ fontFamily: 'var(--font-mono)', color: config.textSecondary }}
            >
              {step.detail}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

/* ── Section ── */
export function Protocol({ config }: { config: PresetConfig }) {
  const headRef = useRef(null)
  const isInView = useInView(headRef, { once: true, margin: '-80px' })

  const stepBgs = [config.pageBg, config.sectionAltBg, config.pageBg]

  return (
    <section id="logistics" style={{ background: config.pageBg }}>
      {/* Section header */}
      <div
        ref={headRef}
        style={{ maxWidth: '88rem', margin: '0 auto', padding: '7rem 4rem 5rem' }}
      >
        <motion.span
          className="block text-[10px] tracking-[0.45em] uppercase mb-5"
          style={{ fontFamily: 'var(--font-mono)', color: config.accent }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          How We Work
        </motion.span>
        <motion.h2
          className="font-bold leading-tight"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.4rem, 5vw, 4rem)',
            color: config.textPrimary,
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease }}
        >
          The Navank{' '}
          <em
            style={{
              fontFamily: 'var(--font-drama)',
              fontStyle: 'italic',
              color: config.accent,
            }}
          >
            Protocol.
          </em>
        </motion.h2>
      </div>

      {/* Sticky stack */}
      {STEPS.map((step, i) => (
        <ProtocolCard
          key={step.number}
          step={step}
          index={i}
          config={config}
          bg={stepBgs[i]}
        />
      ))}
    </section>
  )
}
