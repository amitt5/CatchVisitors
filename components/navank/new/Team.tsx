"use client"

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.25, 0.46, 0.45, 0.94] as const

const TEAM = [
  {
    name: 'Navin Kumar Singhal',
    title: 'Chief Mentor / Founder',
    bio: 'M.Tech from IIT Delhi (1976). 35+ years in factory management, project development, production & marketing. Expertise in Fiber Optic, VLSI, and Nanotechnology.',
    image: 'https://www.navank.in/wp-content/uploads/2022/11/Mr.-Navin-Kumar-Singhal.jpg',
  },
  {
    name: 'Naval Singhal',
    title: 'Chief Business Officer / Director',
    bio: 'MBA from IIT Delhi (2007). Previously at IBM and Accenture. 15+ years driving NAVANK\'s expansion across multiple countries. Vision: $100M by 2030.',
    image: 'https://www.navank.in/wp-content/uploads/2022/11/Wire-magazine-pic-NAVANK.jpg',
  },
  {
    name: 'Anil Bagade',
    title: 'Cable & Compound Specialist',
    bio: '14+ years in the cable & compound industry with deep expertise in LV, HV, EHV and instrumentation cables with XLPE, PE, PVC, and LSZH compounds.',
    image: 'https://www.navank.in/wp-content/uploads/2022/11/Anil-Pic.jpg',
  },
  {
    name: 'Abhinav Goyal',
    title: 'Deputy Manager, Sales & Operations',
    bio: 'B.Tech from Kurukshetra University (2009). With NAVANK since 2016, instrumental in multi-fold business growth through sales & marketing.',
    image: 'https://www.navank.in/wp-content/uploads/2022/11/Abhinav-Pic-for-website.jpg',
  },
  {
    name: 'Garima Singhal',
    title: 'Logistics Executive',
    bio: '10+ years managing international shipments and logistics operations. Handles $10M worth of shipments annually across sea freight and air cargo.',
    image: 'https://www.navank.in/wp-content/uploads/2022/11/Garima-Profile-pic.jpg',
  },
]

function TeamCard({ member, index }: { member: typeof TEAM[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease }}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      {/* Photo */}
      <div
        style={{
          height: '320px',
          borderRadius: '2rem',
          overflow: 'hidden',
          marginBottom: '1.5rem',
        }}
      >
        <img
          src={member.image}
          alt={member.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
          }}
          loading="lazy"
          onError={(e) => {
            const img = e.currentTarget
            img.style.background = 'linear-gradient(145deg, #1a1a24 0%, #111119 100%)'
            img.src = ''
          }}
        />
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'rgba(201,168,76,0.15)', marginBottom: '1.25rem' }} />

      {/* Text */}
      <h3
        style={{
          fontFamily: 'var(--font-inter)',
          fontWeight: 700,
          fontSize: '1rem',
          color: '#C9A84C',
          marginBottom: '0.35rem',
        }}
      >
        {member.name}
      </h3>
      <p
        style={{
          fontFamily: 'var(--font-jetbrains)',
          fontSize: '0.65rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'rgba(250,248,245,0.3)',
          marginBottom: '0.75rem',
        }}
      >
        {member.title}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '0.8rem',
          color: 'rgba(250,248,245,0.35)',
          lineHeight: '1.65',
        }}
      >
        {member.bio}
      </p>
    </motion.div>
  )
}

export function Team() {
  const headRef = useRef(null)
  const isInView = useInView(headRef, { once: true, margin: '-80px' })

  return (
    <section style={{ background: '#0D0D12', padding: '8rem 2rem' }}>
      <div style={{ maxWidth: '88rem', margin: '0 auto' }}>
        {/* Heading */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
          style={{ marginBottom: '4rem' }}
        >
          <span
            style={{
              display: 'block',
              fontFamily: 'var(--font-jetbrains)',
              fontSize: '0.625rem',
              letterSpacing: '0.45em',
              textTransform: 'uppercase',
              color: '#C9A84C',
              marginBottom: '1rem',
            }}
          >
            The People Behind Navank
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-inter)',
              fontWeight: 700,
              fontSize: 'clamp(2.4rem, 5vw, 4rem)',
              color: '#FAF8F5',
              lineHeight: '1.1',
            }}
          >
            Our{' '}
            <em style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic', color: '#C9A84C' }}>
              Team.
            </em>
          </h2>
        </motion.div>

        {/* Team grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '2.5rem',
          }}
        >
          {TEAM.map((member, i) => (
            <TeamCard key={member.name} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
