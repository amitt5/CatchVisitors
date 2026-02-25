"use client"

import { Plus_Jakarta_Sans, Cormorant_Garamond, IBM_Plex_Mono } from 'next/font/google'
import { PresetPage } from '@/components/navank/preset/PresetPage'
import type { PresetConfig } from '@/components/navank/preset/types'

const heading = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

const drama = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-drama',
  style: ['normal', 'italic'],
  weight: ['400', '500', '600'],
  display: 'swap',
})

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
  display: 'swap',
})

const configA: PresetConfig = {
  // Palette
  pageBg: '#F2F0E9',
  sectionAltBg: '#EAE8E0',
  footerBg: '#E0DDD5',
  accent: '#CC5833',
  accentMuted: 'rgba(204,88,51,0.06)',
  textPrimary: '#1A1A1A',
  textSecondary: 'rgba(26,26,26,0.55)',
  textMuted: 'rgba(26,26,26,0.28)',
  borderColor: 'rgba(26,26,26,0.12)',
  borderMuted: 'rgba(204,88,51,0.12)',
  cardBg: 'linear-gradient(145deg, #EDEBE3 0%, #E8E6DE 100%)',
  navScrolledBg: 'rgba(242,240,233,0.92)',
  // Button
  btnTextColor: '#FFFFFF',
  btnOverlay: 'rgba(26,26,26,0.88)',
  // Hero
  heroImage: 'photo-1448375240586-882707db888b',
  heroLine1: 'Quality is the',
  heroLine2: 'Foundation.',
  // Style
  radius: '2rem',
  isDark: false,
}

export default function NavankNewAPage() {
  return (
    <div className={`${heading.variable} ${drama.variable} ${mono.variable}`}>
      <PresetPage config={configA} />
    </div>
  )
}
