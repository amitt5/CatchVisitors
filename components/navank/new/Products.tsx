"use client"

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.25, 0.46, 0.45, 0.94] as const

const OFC_PRODUCTS = [
  {
    id: 'water-blocking-tape',
    name: 'Water Blocking Tape',
    description: 'Prevents longitudinal water penetration in power, fibre and copper telecom cables. Non-conductive, semi-conductive and PET laminated versions.',
    specs: ['Non-conductive', 'Semi-conductive', 'PET laminated', 'JUMBO version'],
    image: 'https://www.navank.in/wp-content/uploads/2022/11/Water-Blocking-Tape-500x400.jpg',
  },
  {
    id: 'water-swellable-yarn',
    name: 'Water Swellable Yarn',
    description: 'Quick water absorption, high expansivity, high tensile strength. Used in waterproof FOC & communication cables.',
    specs: ['Quick absorption', 'High tensile strength', 'Heat resistant', 'Chemical stable'],
    image: 'https://www.navank.in/wp-content/uploads/2022/11/images-1-1-500x400.jpg',
  },
  {
    id: 'eccs-tape',
    name: 'ECCS Tape',
    description: 'Copolymer coated steel tape from high quality cold rolled steel with EAA copolymer film. Armours fiber optical cable against rodents & external forces.',
    specs: ['Cold rolled steel', 'EAA copolymer', 'Rodent protection', 'JUMBO version'],
    image: 'https://www.navank.in/wp-content/uploads/2022/11/images-6-1-500x400.jpg',
  },
  {
    id: 'cjb-eccs-tape',
    name: 'CJB-ECCS Tape',
    description: 'Controlled jacket bond tape for telecommunication cables. Bonds to LDPE, MDPE and HDPE sheathing.',
    specs: ['Tempered to T3', 'Telecom cables', 'Bonds LDPE/MDPE/HDPE', 'JUMBO version'],
    image: 'https://www.navank.in/wp-content/uploads/2022/11/images-8-1-500x400.jpg',
  },
  {
    id: 'pbt-compounds',
    name: 'PBT Compounds',
    description: 'Most popular extrudable polymer for loose tubes in fiber-optic cables. Supports 2–24 optical fibers, excellent high-speed extrusion.',
    specs: ['2–24 fibers/tube', 'High-speed extrusion', 'Multiple colours', 'Meets bending test'],
    image: 'https://www.navank.in/wp-content/uploads/2022/11/images-11-1-500x400.jpg',
  },
  {
    id: 'lszh-compounds-ofc',
    name: 'LSZH Compounds (OFC)',
    description: 'Polyolefin insulation & sheathing with LSZH/HFFR/ZHFR properties for FOC, LAN, Solar, Automobile, Railway and Elevator cables.',
    specs: ['UL1581', 'TUV certified', 'IEC60332', 'ISO/TS16919'],
    image: 'https://www.navank.in/wp-content/uploads/2022/11/500X500-12-500x400.jpg',
  },
]

const POWER_PRODUCTS = [
  {
    id: 'xlpe-compound',
    name: 'XLPE Compound',
    description: 'Cross-linked polyethylene insulation for all types of power and special cables. Peroxide-type for HV/EHV; Silane-type for special cables.',
    specs: ['Peroxide-type HV/EHV', 'Silane moisture-cured', 'Sioplas lines', 'All power cables'],
    image: 'https://www.navank.in/wp-content/uploads/2022/11/XLPE-cable-500x400.jpg',
  },
  {
    id: 'semiconductive-compound',
    name: 'Semiconductive Compound',
    description: 'Cross-linkable black PE compound for semiconductive conductor shields or bonded/strippable insulation shields of power cables.',
    specs: ['Cross-linkable', 'Internal & external', 'Protects XLPE/EPR', 'Strippable shields'],
    image: 'https://www.navank.in/wp-content/uploads/2022/11/Semiconductor-Shielding-Compound-500x400.jpg',
  },
  {
    id: 'lszh-compound-power',
    name: 'LSZH Compound (Power)',
    description: 'Cable sheathing for power cables. Meets safety, flame retardant, mechanical strength, and reliability requirements.',
    specs: ['Flame retardant', 'Low smoke zero halogen', 'High mechanical strength', 'Reliable'],
    image: 'https://www.navank.in/wp-content/uploads/2022/11/LSZH-compound-500x400.jpg',
  },
  {
    id: 'pe-compound',
    name: 'PE Compound',
    description: 'Sheathing and insulation for power and special cables. Full range: HDPE, MDPE, LDPE & FR-HDPE for all cable types.',
    specs: ['HDPE', 'MDPE', 'LDPE', 'FR-HDPE'],
    image: 'https://www.navank.in/wp-content/uploads/2022/11/PE-compound-500x400.jpg',
  },
  {
    id: 'mica-tape',
    name: 'Mica Tape',
    description: 'Insulation for fire-resistant cables. Phlogopite mica, synthetic mica, and calcined muscovite tape with silicon resin impregnation.',
    specs: ['Fire resistant', 'High voltage', 'High temperature', 'Silicon resin'],
    image: 'https://www.navank.in/wp-content/uploads/2022/11/images-10-2-500x400.jpg',
  },
  {
    id: 'pvc-compound',
    name: 'PVC Compound',
    description: 'For low-voltage cables, telecommunication lines, and electrical wiring. Sheathing and insulation grades meeting all international standards.',
    specs: ['Sheathing grade', 'Insulation grade', 'All int\'l standards', 'Telecom lines'],
    image: 'https://www.navank.in/wp-content/uploads/2022/11/PVC-compound-500x400.jpg',
  },
]

function ProductCard({ product, index }: { product: typeof OFC_PRODUCTS[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.06, ease }}
      style={{
        background: 'linear-gradient(145deg, #0D0D12 0%, #111119 100%)',
        border: '1px solid #2A2A35',
        borderRadius: '2rem',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement
        el.style.borderColor = 'rgba(201,168,76,0.4)'
        el.style.boxShadow = '0 8px 40px rgba(201,168,76,0.08)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement
        el.style.borderColor = '#2A2A35'
        el.style.boxShadow = 'none'
      }}
    >
      {/* Image */}
      <div style={{ height: '200px', overflow: 'hidden' }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <h3
          style={{
            fontFamily: 'var(--font-inter)',
            fontWeight: 700,
            fontSize: '1rem',
            color: '#FAF8F5',
            lineHeight: '1.3',
          }}
        >
          {product.name}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '0.78rem',
            color: 'rgba(250,248,245,0.38)',
            lineHeight: '1.65',
            flex: 1,
          }}
        >
          {product.description}
        </p>
        {/* Spec chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.25rem' }}>
          {product.specs.map((spec) => (
            <span
              key={spec}
              style={{
                fontFamily: 'var(--font-jetbrains)',
                fontSize: '0.65rem',
                color: 'rgba(201,168,76,0.7)',
                border: '1px solid rgba(201,168,76,0.2)',
                borderRadius: '999px',
                padding: '2px 10px',
                letterSpacing: '0.03em',
              }}
            >
              {spec}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export function Products() {
  const headRef = useRef(null)
  const isInView = useInView(headRef, { once: true, margin: '-80px' })

  return (
    <section id="our-products" style={{ background: '#09090E', padding: '8rem 2rem' }}>
      <div style={{ maxWidth: '88rem', margin: '0 auto' }}>
        {/* Heading */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
          style={{ marginBottom: '5rem' }}
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
            What We Supply
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
              Products.
            </em>
          </h2>
        </motion.div>

        {/* OFC Section */}
        <div style={{ marginBottom: '4rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '2rem',
            }}
          >
            <div style={{ width: '2rem', height: '1px', background: '#C9A84C' }} />
            <span
              style={{
                fontFamily: 'var(--font-jetbrains)',
                fontSize: '0.625rem',
                letterSpacing: '0.4em',
                textTransform: 'uppercase',
                color: 'rgba(201,168,76,0.6)',
              }}
            >
              Optical Fiber Cable
            </span>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {OFC_PRODUCTS.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>

        {/* Power Cable Section */}
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '2rem',
            }}
          >
            <div style={{ width: '2rem', height: '1px', background: '#C9A84C' }} />
            <span
              style={{
                fontFamily: 'var(--font-jetbrains)',
                fontSize: '0.625rem',
                letterSpacing: '0.4em',
                textTransform: 'uppercase',
                color: 'rgba(201,168,76,0.6)',
              }}
            >
              Power Cable
            </span>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {POWER_PRODUCTS.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
