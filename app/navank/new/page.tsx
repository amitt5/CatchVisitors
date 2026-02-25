"use client"

import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google'
import { Navbar } from '@/components/navank/new/Navbar'
import { Hero } from '@/components/navank/new/Hero'
import { Features } from '@/components/navank/new/Features'
import { Products } from '@/components/navank/new/Products'
import { Philosophy } from '@/components/navank/new/Philosophy'
import { Protocol } from '@/components/navank/new/Protocol'
import { Team } from '@/components/navank/new/Team'
import { Partners } from '@/components/navank/new/Partners'
import { GetStarted } from '@/components/navank/new/GetStarted'
import { Footer } from '@/components/navank/new/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  style: ['normal', 'italic'],
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export default function NavankNewPage() {
  return (
    <div
      className={`${inter.variable} ${playfair.variable} ${jetbrains.variable}`}
      style={{ background: '#0D0D12', fontFamily: 'var(--font-inter)', minHeight: '100vh' }}
    >
      {/* ─── Global film-grain noise overlay ─── */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9998,
          pointerEvents: 'none',
          mixBlendMode: 'overlay',
          opacity: 0.038,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
          backgroundRepeat: 'repeat',
        }}
      />

      <Navbar />
      <Hero />
      <Features />
      <Products />
      <Philosophy />
      <Protocol />
      <Team />
      <Partners />
      <GetStarted />
      <Footer />
    </div>
  )
}
