"use client"

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const ease = [0.25, 0.46, 0.45, 0.94] as const

export function Philosophy() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const isInView = useInView(contentRef, { once: true, margin: '-120px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: '#09090E', padding: '10rem 2rem' }}
    >
      {/* Parallax noise texture */}
      <motion.div
        style={{ y: parallaxY }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '512px 512px',
            opacity: 0.035,
          }}
        />
      </motion.div>

      {/* Champagne radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)',
        }}
      />

      <div
        ref={contentRef}
        style={{ maxWidth: '88rem', margin: '0 auto', position: 'relative' }}
      >
        {/* Label */}
        <motion.span
          className="block text-[10px] tracking-[0.45em] uppercase mb-20"
          style={{ fontFamily: 'var(--font-jetbrains)', color: '#C9A84C' }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7 }}
        >
          Our Philosophy
        </motion.span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-28 items-start">
          {/* ── Left: "The others" ── */}
          <motion.div
            initial={{ opacity: 0, x: -48 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease }}
          >
            <p
              className="text-[10px] tracking-[0.35em] uppercase mb-8"
              style={{
                fontFamily: 'var(--font-jetbrains)',
                color: 'rgba(250,248,245,0.25)',
              }}
            >
              Most cable suppliers focus on:
            </p>

            <div className="flex flex-col gap-6">
              {[
                'Volume discounts and catalogue sales.',
                'Standardised product listings.',
                'Transactional, order-only relationships.',
              ].map((text, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.7, ease }}
                  className="flex items-start gap-4"
                >
                  <div
                    className="mt-3 w-4 h-px shrink-0"
                    style={{ background: 'rgba(250,248,245,0.12)' }}
                  />
                  <p
                    className="font-light leading-snug"
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                      color: 'rgba(250,248,245,0.2)',
                    }}
                  >
                    {text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: "We focus on" ── */}
          <motion.div
            initial={{ opacity: 0, x: 48 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.25, ease }}
          >
            <p
              className="text-[10px] tracking-[0.35em] uppercase mb-8"
              style={{
                fontFamily: 'var(--font-jetbrains)',
                color: 'rgba(201,168,76,0.7)',
              }}
            >
              We focus on:
            </p>

            <p
              className="leading-[1.25]"
              style={{
                fontFamily: 'var(--font-inter)',
                fontWeight: 300,
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                color: '#FAF8F5',
              }}
            >
              The{' '}
              <em
                style={{
                  fontFamily: 'var(--font-playfair)',
                  fontStyle: 'italic',
                  color: '#C9A84C',
                }}
              >
                material science
              </em>{' '}
              behind every metre of cable you manufacture.
            </p>

            {/* Accent line */}
            <motion.div
              className="mt-12 flex items-start gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.55, duration: 0.7, ease }}
            >
              <div
                className="mt-2 w-6 h-px shrink-0"
                style={{ background: '#C9A84C' }}
              />
              <p
                className="text-sm leading-relaxed"
                style={{
                  fontFamily: 'var(--font-inter)',
                  color: 'rgba(250,248,245,0.4)',
                }}
              >
                When a compound fails at 90°C instead of 105°C, the cable fails.
                We partner at the formulation level — not just the catalogue level.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
