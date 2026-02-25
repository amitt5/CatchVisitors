"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import type { PresetConfig } from './types'

const LINKS = ['About', 'Products', 'Logistics', 'Contact']

export function Navbar({ config }: { config: PresetConfig }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pillRadius = config.radius === '0px' ? '0px' : '9999px'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        className="fixed top-6 left-1/2 z-50"
        style={{ translateX: '-50%' }}
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div
          className="flex items-center gap-8 px-6 py-3 transition-all duration-500"
          style={{
            borderRadius: pillRadius,
            background: scrolled ? config.navScrolledBg : 'transparent',
            backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
            border: scrolled
              ? `1px solid ${config.borderMuted}`
              : '1px solid transparent',
            boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.18)' : 'none',
          }}
        >
          {/* Logo */}
          <span
            className="font-bold text-sm tracking-[0.25em] uppercase"
            style={{
              fontFamily: 'var(--font-heading)',
              color: config.isDark ? '#FAF8F5' : config.textPrimary,
            }}
          >
            Navank
          </span>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm tracking-wide transition-all duration-300"
                style={{
                  fontFamily: 'var(--font-heading)',
                  color: config.isDark
                    ? 'rgba(250,248,245,0.6)'
                    : config.textSecondary,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = config.isDark
                    ? '#FAF8F5'
                    : config.textPrimary
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = config.isDark
                    ? 'rgba(250,248,245,0.6)'
                    : config.textSecondary
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                {link}
              </a>
            ))}
          </div>

          {/* CTA — outline button */}
          <button
            className="hidden md:block px-5 py-2 text-xs font-semibold transition-all duration-300"
            style={{
              fontFamily: 'var(--font-heading)',
              letterSpacing: '0.08em',
              borderRadius: pillRadius,
              border: `1px solid ${config.accent}`,
              color: config.accent,
              background: 'transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = config.accent
              e.currentTarget.style.color = config.btnTextColor
              e.currentTarget.style.transform = 'scale(1.03)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = config.accent
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            Request a Quote
          </button>

          {/* Mobile toggle */}
          <button
            className="md:hidden"
            style={{ color: config.isDark ? '#FAF8F5' : config.textPrimary }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10"
            style={{ background: config.pageBg }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {LINKS.map((link, i) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-4xl font-light tracking-[0.2em] uppercase"
                style={{
                  fontFamily: 'var(--font-heading)',
                  color: config.textPrimary,
                }}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                onClick={() => setMobileOpen(false)}
              >
                {link}
              </motion.a>
            ))}
            <motion.button
              style={{
                border: `1px solid ${config.accent}`,
                color: config.accent,
                padding: '1rem 2.5rem',
                borderRadius: pillRadius,
                fontFamily: 'var(--font-heading)',
                fontSize: '0.875rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Request a Quote
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
