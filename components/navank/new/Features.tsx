"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Package, Zap, TrendingUp } from 'lucide-react'

const ease = [0.25, 0.46, 0.45, 0.94] as const

/* ── Shuffler data ── */
const MATERIALS = [
  {
    label: 'Optical Fiber Components',
    detail: 'Water-blocking tapes, PBT compounds, ECCS & CJB-ECCS tapes for OFC manufacturing',
    code: 'OFC',
  },
  {
    label: 'Cable Compounds',
    detail: 'XLPE, LSZH, LSZH-OFC, PE, PVC, semiconductive — sourced from world-class OEM partners',
    code: 'CMP',
  },
  {
    label: 'PE & XLPE Materials',
    detail: 'Cross-linked polyethylene and polyethylene for MV/HV power cable insulation',
    code: 'PWR',
  },
  {
    label: 'LSZH Compounds',
    detail: 'Low smoke zero halogen formulations for safety-critical building and rail cable applications',
    code: 'LSZ',
  },
  {
    label: 'Water Blocking Tapes',
    detail: 'Swellable yarn, ECC tape, and CJB-ECCS configurations for moisture-resistant cable cores',
    code: 'WBT',
  },
]

/* ── Live feed data ── */
const LIVE_FEED = [
  'Shipment #NVK-2847 dispatched — Guangzhou port',
  'JIT delivery confirmed — Mumbai cable facility',
  'XLPE compound batch #4291 cleared Amsterdam customs',
  'Water-blocking tape QC approved — 40MT consignment',
  'Freight booking confirmed — New Delhi distribution hub',
  'LSZH compound en route to Rotterdam warehouse',
  'COA verification complete — ECCS tape batch #1872',
  'Air cargo dispatched — Seoul to Schiphol',
]

/* ── Stats data ── */
const STATS = [
  { value: '25+', label: 'Years Experience' },
  { value: '$14M', label: 'Annual Revenue' },
  { value: '22%', label: 'YoY Growth' },
  { value: '40+', label: 'OEM Partners' },
  { value: '12', label: 'Countries' },
  { value: '200+', label: 'Active SKUs' },
]

/* ─────────────────────────────────────────────
   Card 1 — Diagnostic Shuffler (OEM Sourcing)
───────────────────────────────────────────── */
function ShufflerCard() {
  const [active, setActive] = useState(0)
  const [key, setKey] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setKey((k) => k + 1)
      setActive((i) => (i + 1) % MATERIALS.length)
    }, 2800)
    return () => clearInterval(t)
  }, [])

  const m = MATERIALS[active]

  return (
    <div
      className="relative flex flex-col justify-between p-8 h-full"
      style={{
        background: 'linear-gradient(145deg, #0D0D12 0%, #111119 100%)',
        borderRadius: '2rem',
        border: '1px solid #2A2A35',
        minHeight: '420px',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Package size={13} style={{ color: '#C9A84C' }} />
          <span
            className="text-[10px] tracking-[0.35em] uppercase"
            style={{ fontFamily: 'var(--font-jetbrains)', color: '#C9A84C' }}
          >
            OEM Sourcing
          </span>
        </div>
        <span
          className="text-xs"
          style={{
            fontFamily: 'var(--font-jetbrains)',
            color: 'rgba(250,248,245,0.18)',
          }}
        >
          {String(active + 1).padStart(2, '0')}/{MATERIALS.length}
        </span>
      </div>

      {/* Animated content */}
      <div className="flex-1 flex flex-col justify-center py-8">
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          <div
            className="text-[10px] tracking-[0.3em] uppercase mb-4"
            style={{
              fontFamily: 'var(--font-jetbrains)',
              color: 'rgba(201,168,76,0.45)',
            }}
          >
            [{m.code}]
          </div>
          <h3
            className="font-bold leading-tight mb-4"
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 'clamp(1.5rem, 2.5vw, 1.9rem)',
              color: '#FAF8F5',
            }}
          >
            {m.label}
          </h3>
          <p
            className="text-sm leading-relaxed"
            style={{
              fontFamily: 'var(--font-inter)',
              color: 'rgba(250,248,245,0.38)',
            }}
          >
            {m.detail}
          </p>
        </motion.div>

        {/* Progress dots */}
        <div className="flex gap-1.5 mt-8">
          {MATERIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => { setActive(i); setKey((k) => k + 1) }}
              className="h-[2px] rounded-full transition-all duration-500"
              style={{
                width: i === active ? '28px' : '8px',
                background:
                  i === active
                    ? '#C9A84C'
                    : 'rgba(201,168,76,0.18)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <span
        className="text-[10px]"
        style={{
          fontFamily: 'var(--font-jetbrains)',
          color: 'rgba(250,248,245,0.15)',
        }}
      >
        Asia &amp; Europe · ISO-certified OEM partners only
      </span>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Card 2 — Telemetry Typewriter (Logistics)
───────────────────────────────────────────── */
function TypewriterCard() {
  const [items, setItems] = useState<{ id: number; msg: string }[]>([
    { id: 0, msg: LIVE_FEED[0] },
  ])
  const idxRef = useRef(1)

  useEffect(() => {
    const t = setInterval(() => {
      const msg = LIVE_FEED[idxRef.current % LIVE_FEED.length]
      idxRef.current++
      setItems((prev) => [...prev.slice(-4), { id: idxRef.current, msg }])
    }, 2100)
    return () => clearInterval(t)
  }, [])

  return (
    <div
      className="relative flex flex-col justify-between p-8 h-full"
      style={{
        background: 'linear-gradient(145deg, #0D0D12 0%, #111119 100%)',
        borderRadius: '2rem',
        border: '1px solid #2A2A35',
        minHeight: '420px',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap size={13} style={{ color: '#C9A84C' }} />
          <span
            className="text-[10px] tracking-[0.35em] uppercase"
            style={{ fontFamily: 'var(--font-jetbrains)', color: '#C9A84C' }}
          >
            Live Ops
          </span>
        </div>
        <div className="flex items-center gap-2">
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: '#C9A84C' }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
          <span
            className="text-[10px]"
            style={{
              fontFamily: 'var(--font-jetbrains)',
              color: 'rgba(250,248,245,0.25)',
            }}
          >
            Active
          </span>
        </div>
      </div>

      {/* Feed items */}
      <div className="flex-1 flex flex-col justify-end gap-3 py-6 overflow-hidden">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: i === items.length - 1 ? 1 : 0.4, x: 0 }}
            transition={{ duration: 0.4, ease }}
            className="flex items-start gap-3"
          >
            <div
              className="mt-1.5 w-1 h-1 rounded-full shrink-0"
              style={{ background: '#C9A84C', opacity: i === items.length - 1 ? 0.8 : 0.2 }}
            />
            <span
              className="text-sm leading-snug"
              style={{
                fontFamily: 'var(--font-inter)',
                color: i === items.length - 1
                  ? 'rgba(250,248,245,0.75)'
                  : 'rgba(250,248,245,0.22)',
              }}
            >
              {item.msg}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Divider + footer */}
      <div style={{ borderTop: '1px solid #2A2A35', paddingTop: '16px' }}>
        <span
          className="text-[10px]"
          style={{
            fontFamily: 'var(--font-jetbrains)',
            color: 'rgba(250,248,245,0.15)',
          }}
        >
          JIT delivery · Freight forwarding · In-house logistics
        </span>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Card 3 — Protocol Scheduler (Track Record)
───────────────────────────────────────────── */
function SchedulerCard() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div
      ref={ref}
      className="relative flex flex-col justify-between p-8 h-full"
      style={{
        background: 'linear-gradient(145deg, #0D0D12 0%, #111119 100%)',
        borderRadius: '2rem',
        border: '1px solid #2A2A35',
        minHeight: '420px',
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <TrendingUp size={13} style={{ color: '#C9A84C' }} />
        <span
          className="text-[10px] tracking-[0.35em] uppercase"
          style={{ fontFamily: 'var(--font-jetbrains)', color: '#C9A84C' }}
        >
          Track Record
        </span>
      </div>

      {/* Stats grid */}
      <div
        className="flex-1 grid grid-cols-2 gap-x-6 gap-y-8 py-8 content-center"
      >
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.08, duration: 0.6, ease }}
            className="flex flex-col"
          >
            <span
              className="font-bold leading-none"
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'clamp(1.7rem, 2.5vw, 2.1rem)',
                color: '#C9A84C',
              }}
            >
              {s.value}
            </span>
            <span
              className="text-[11px] mt-1.5"
              style={{
                fontFamily: 'var(--font-inter)',
                color: 'rgba(250,248,245,0.35)',
              }}
            >
              {s.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <span
        className="text-[10px]"
        style={{
          fontFamily: 'var(--font-jetbrains)',
          color: 'rgba(250,248,245,0.15)',
        }}
      >
        Est. 1998 · 25 years of cable industry expertise
      </span>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Section wrapper
───────────────────────────────────────────── */
export function Features() {
  const headRef = useRef(null)
  const isInView = useInView(headRef, { once: true, margin: '-80px' })

  return (
    <section id="products" style={{ background: '#0D0D12', padding: '8rem 2rem' }}>
      <div style={{ maxWidth: '88rem', margin: '0 auto' }}>
        {/* Section heading */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
          style={{ marginBottom: '4rem' }}
        >
          <span
            className="block mb-4 text-[10px] tracking-[0.45em] uppercase"
            style={{ fontFamily: 'var(--font-jetbrains)', color: '#C9A84C' }}
          >
            What We Do
          </span>
          <h2
            className="font-bold leading-tight"
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 'clamp(2.4rem, 5vw, 4rem)',
              color: '#FAF8F5',
            }}
          >
            Three pillars of{' '}
            <em
              style={{
                fontFamily: 'var(--font-playfair)',
                fontStyle: 'italic',
                color: '#C9A84C',
              }}
            >
              precision supply.
            </em>
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          <ShufflerCard />
          <TypewriterCard />
          <SchedulerCard />
        </div>
      </div>
    </section>
  )
}
