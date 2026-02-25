"use client"

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.25, 0.46, 0.45, 0.94] as const

const PARTNERS = [
  {
    name: 'Zhejiang Wanma',
    caption: 'Zhejiang Wanma Co. Ltd.',
    image: 'https://www.navank.in/wp-content/uploads/2022/11/2.jpg',
  },
  {
    name: 'Unitape',
    caption: 'Unitape (UK)',
    image: 'https://www.navank.in/wp-content/uploads/2022/11/3.jpg',
  },
  {
    name: 'Nantong Siber',
    caption: 'Nantong Siber',
    image: 'https://www.navank.in/wp-content/uploads/2022/11/4.jpg',
  },
  {
    name: 'Chhaperia International',
    caption: 'Chhaperia International',
    image: 'https://www.navank.in/wp-content/uploads/2022/11/5.jpg',
  },
]

export function Partners() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section style={{ background: '#09090E', padding: '4rem 2rem' }}>
      <div style={{ maxWidth: '88rem', margin: '0 auto' }} ref={ref}>
        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            display: 'block',
            fontFamily: 'var(--font-jetbrains)',
            fontSize: '0.625rem',
            letterSpacing: '0.45em',
            textTransform: 'uppercase',
            color: '#C9A84C',
            marginBottom: '2.5rem',
            textAlign: 'center',
          }}
        >
          Our OEM Partners
        </motion.span>

        {/* Partner logos */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4rem',
          }}
        >
          {PARTNERS.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.08, ease }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}
            >
              <img
                src={partner.image}
                alt={partner.name}
                style={{
                  height: '48px',
                  maxWidth: '140px',
                  objectFit: 'contain',
                  filter: 'grayscale(1)',
                  opacity: 0.35,
                  transition: 'filter 0.3s ease, opacity 0.3s ease',
                }}
                loading="lazy"
                onMouseEnter={(e) => {
                  const img = e.currentTarget
                  img.style.filter = 'grayscale(0)'
                  img.style.opacity = '1'
                }}
                onMouseLeave={(e) => {
                  const img = e.currentTarget
                  img.style.filter = 'grayscale(1)'
                  img.style.opacity = '0.35'
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-jetbrains)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'rgba(250,248,245,0.2)',
                }}
              >
                {partner.caption}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
