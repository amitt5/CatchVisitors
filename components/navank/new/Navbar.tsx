"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const LINKS = ['About', 'Products', 'Logistics', 'Contact']

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

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
          className="flex items-center gap-8 px-6 py-3 rounded-full transition-all duration-500"
          style={{
            background: scrolled ? 'rgba(13,13,18,0.88)' : 'transparent',
            backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
            border: scrolled ? '1px solid rgba(201,168,76,0.18)' : '1px solid transparent',
            boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.4)' : 'none',
          }}
        >
          {/* Logo */}
          <span
            className="text-[#FAF8F5] font-bold text-sm tracking-[0.25em] uppercase"
            style={{ fontFamily: 'var(--font-inter)' }}
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
                  fontFamily: 'var(--font-inter)',
                  color: scrolled ? 'rgba(250,248,245,0.7)' : 'rgba(250,248,245,0.6)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#FAF8F5'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = scrolled ? 'rgba(250,248,245,0.7)' : 'rgba(250,248,245,0.6)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                {link}
              </a>
            ))}
          </div>

          {/* CTA */}
          <button
            className="hidden md:block relative overflow-hidden rounded-full px-5 py-2 text-xs font-semibold border border-[#C9A84C] text-[#C9A84C] group"
            style={{
              fontFamily: 'var(--font-inter)',
              letterSpacing: '0.08em',
              transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <span
              className="absolute inset-0 bg-[#C9A84C]"
              style={{
                transform: 'translateY(100%)',
                transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            />
            <span className="relative group-hover:text-[#0D0D12] transition-colors duration-300">
              Request a Quote
            </span>
          </button>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-[#FAF8F5]"
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
            style={{ background: '#0D0D12' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {LINKS.map((link, i) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-[#FAF8F5] text-4xl font-light tracking-[0.2em] uppercase"
                style={{ fontFamily: 'var(--font-inter)' }}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                onClick={() => setMobileOpen(false)}
              >
                {link}
              </motion.a>
            ))}
            <motion.button
              className="border border-[#C9A84C] text-[#C9A84C] px-10 py-4 rounded-full text-sm tracking-[0.15em] uppercase"
              style={{ fontFamily: 'var(--font-inter)' }}
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
