"use client"

import type { PresetConfig } from './types'
import { Navbar } from './Navbar'
import { Hero } from './Hero'
import { Features } from './Features'
import { Philosophy } from './Philosophy'
import { Protocol } from './Protocol'
import { GetStarted } from './GetStarted'
import { Footer } from './Footer'

export function PresetPage({ config }: { config: PresetConfig }) {
  return (
    <div
      style={{
        background: config.pageBg,
        fontFamily: 'var(--font-heading)',
        minHeight: '100vh',
      }}
    >
      {/* Film-grain noise overlay */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9998,
          pointerEvents: 'none',
          mixBlendMode: 'overlay',
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
          backgroundRepeat: 'repeat',
        }}
      />

      <Navbar config={config} />
      <Hero config={config} />
      <Features config={config} />
      <Philosophy config={config} />
      <Protocol config={config} />
      <GetStarted config={config} />
      <Footer config={config} />
    </div>
  )
}
