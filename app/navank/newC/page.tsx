"use client"

import { Space_Grotesk, DM_Serif_Display, Space_Mono } from 'next/font/google'
import { PresetPage } from '@/components/navank/preset/PresetPage'
import type { PresetConfig } from '@/components/navank/preset/types'

const heading = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

const drama = DM_Serif_Display({
  subsets: ['latin'],
  variable: '--font-drama',
  style: ['normal', 'italic'],
  weight: '400',
  display: 'swap',
})

const mono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '700'],
  display: 'swap',
})

const configC: PresetConfig = {
  // Palette
  pageBg: '#F5F3EE',
  sectionAltBg: '#E8E4DD',
  footerBg: '#D8D4CD',
  accent: '#E63B2E',
  accentMuted: 'rgba(230,59,46,0.05)',
  textPrimary: '#111111',
  textSecondary: 'rgba(17,17,17,0.5)',
  textMuted: 'rgba(17,17,17,0.25)',
  borderColor: 'rgba(17,17,17,0.15)',
  borderMuted: 'rgba(230,59,46,0.1)',
  cardBg: '#EEEBE4',
  navScrolledBg: 'rgba(245,243,238,0.95)',
  // Button
  btnTextColor: '#FFFFFF',
  btnOverlay: 'rgba(17,17,17,0.92)',
  // Hero
  heroImage: 'photo-1486325212027-8081e485255e',
  heroLine1: 'Redefine the',
  heroLine2: 'Standard.',
  // Style — brutalist: zero radius everywhere
  radius: '0px',
  isDark: false,
}

export default function NavankNewCPage() {
  return (
    <div className={`${heading.variable} ${drama.variable} ${mono.variable}`}>
      <PresetPage config={configC} />
    </div>
  )
}
