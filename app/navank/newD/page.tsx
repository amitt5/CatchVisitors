"use client"

import { Sora, Instrument_Serif, Fira_Code } from 'next/font/google'
import { PresetPage } from '@/components/navank/preset/PresetPage'
import type { PresetConfig } from '@/components/navank/preset/types'

const heading = Sora({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

const drama = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-drama',
  style: ['normal', 'italic'],
  weight: '400',
  display: 'swap',
})

const mono = Fira_Code({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
  display: 'swap',
})

const configD: PresetConfig = {
  // Palette
  pageBg: '#0A0A14',
  sectionAltBg: '#0C0C18',
  footerBg: '#07070F',
  accent: '#7B61FF',
  accentMuted: 'rgba(123,97,255,0.06)',
  textPrimary: '#F0EFF4',
  textSecondary: 'rgba(240,239,244,0.5)',
  textMuted: 'rgba(240,239,244,0.18)',
  borderColor: 'rgba(123,97,255,0.18)',
  borderMuted: 'rgba(123,97,255,0.1)',
  cardBg: 'rgba(123,97,255,0.04)',
  navScrolledBg: 'rgba(10,10,20,0.9)',
  // Button
  btnTextColor: '#F0EFF4',
  btnOverlay: '#1A1040',
  // Hero
  heroImage: 'photo-1518655048521-f130df041f66',
  heroLine1: 'Materials beyond',
  heroLine2: 'Convention.',
  // Style
  radius: '2rem',
  isDark: true,
  glowColor: 'rgba(123,97,255,0.12)',
}

export default function NavankNewDPage() {
  return (
    <div className={`${heading.variable} ${drama.variable} ${mono.variable}`}>
      <PresetPage config={configD} />
    </div>
  )
}
