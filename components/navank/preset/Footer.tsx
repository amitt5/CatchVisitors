"use client"

import { motion } from 'framer-motion'
import type { PresetConfig } from './types'

const NAV_COLS = [
  {
    heading: 'Products',
    links: [
      'Optical Fiber Components',
      'Cable Compounds',
      'Power Cable Materials',
      'Data Cable Materials',
    ],
  },
  {
    heading: 'Services',
    links: [
      'Freight Forwarding',
      'JIT Warehouse Delivery',
      'Quality Certification',
      'Supply Chain Consulting',
    ],
  },
  {
    heading: 'Company',
    links: ['About Navank', 'Our Team', 'News & Updates', 'Contact'],
  },
]

export function Footer({ config }: { config: PresetConfig }) {
  const year = new Date().getFullYear()
  const topRadius = config.radius === '0px' ? '0px' : '4rem 4rem 0 0'

  return (
    <footer
      id="contact"
      style={{
        background: config.footerBg,
        borderRadius: topRadius,
        padding: '6rem 2rem 3rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top decorative line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '10%',
          right: '10%',
          height: '1px',
          background: `linear-gradient(to right, transparent, ${config.accent}35, transparent)`,
        }}
      />

      {/* Glow for Preset D */}
      {config.glowColor && (
        <div
          className="absolute top-0 left-1/2 pointer-events-none"
          style={{
            transform: 'translateX(-50%)',
            width: '600px',
            height: '200px',
            background: `radial-gradient(ellipse at top, ${config.glowColor} 0%, transparent 70%)`,
          }}
        />
      )}

      <div style={{ maxWidth: '88rem', margin: '0 auto' }}>
        {/* Main grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12"
          style={{
            paddingBottom: '5rem',
            marginBottom: '3rem',
            borderBottom: `1px solid ${config.borderColor}`,
          }}
        >
          {/* Brand block */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <span
                className="font-bold text-xl tracking-[0.2em] uppercase"
                style={{ fontFamily: 'var(--font-heading)', color: config.textPrimary }}
              >
                Navank
              </span>
            </div>

            <p
              className="text-sm leading-relaxed mb-10"
              style={{
                fontFamily: 'var(--font-heading)',
                color: config.textMuted,
                maxWidth: '300px',
              }}
            >
              <em
                style={{
                  fontFamily: 'var(--font-drama)',
                  fontStyle: 'italic',
                  color: config.accent,
                  opacity: 0.7,
                }}
              >
                Passion for Cables.
              </em>{' '}
              Precision raw material supply for the global cable industry since 1998.
            </p>

            {/* Offices */}
            <div className="flex flex-col gap-7">
              <div>
                <span
                  className="block text-[10px] tracking-[0.35em] uppercase mb-2"
                  style={{ fontFamily: 'var(--font-mono)', color: config.accent }}
                >
                  India Office
                </span>
                <address
                  className="not-italic text-xs leading-[1.8]"
                  style={{ fontFamily: 'var(--font-heading)', color: config.textMuted }}
                >
                  276, Niligiri Apartment
                  <br />
                  Alaknanda, New Delhi — 110019
                </address>
              </div>

              <div>
                <span
                  className="block text-[10px] tracking-[0.35em] uppercase mb-2"
                  style={{ fontFamily: 'var(--font-mono)', color: config.accent }}
                >
                  Netherlands Office
                </span>
                <address
                  className="not-italic text-xs leading-[1.8]"
                  style={{ fontFamily: 'var(--font-heading)', color: config.textMuted }}
                >
                  Pelikaanhof 134
                  <br />
                  2493 VH Leidschendam
                </address>
              </div>
            </div>
          </div>

          {/* Nav columns */}
          {NAV_COLS.map((col) => (
            <div key={col.heading}>
              <h4
                className="text-[10px] tracking-[0.35em] uppercase mb-6"
                style={{ fontFamily: 'var(--font-mono)', color: config.textMuted }}
              >
                {col.heading}
              </h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm transition-all duration-200 inline-block"
                      style={{
                        fontFamily: 'var(--font-heading)',
                        color: config.textMuted,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = config.textPrimary
                        e.currentTarget.style.transform = 'translateY(-1px)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = config.textMuted
                        e.currentTarget.style.transform = 'translateY(0)'
                      }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">
          {/* Status */}
          <div className="flex items-center gap-2.5">
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: '#22c55e' }}
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span
              className="text-[10px] tracking-[0.3em] uppercase"
              style={{ fontFamily: 'var(--font-mono)', color: config.textMuted }}
            >
              System Operational
            </span>
          </div>

          {/* Copyright */}
          <span
            className="text-[11px]"
            style={{ fontFamily: 'var(--font-mono)', color: config.textMuted }}
          >
            © {year} Navank. All rights reserved.
          </span>

          {/* Legal links */}
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Use', 'Cookie Policy'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-[11px] transition-colors duration-200"
                style={{ fontFamily: 'var(--font-heading)', color: config.textMuted }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = config.textSecondary)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = config.textMuted)
                }
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
