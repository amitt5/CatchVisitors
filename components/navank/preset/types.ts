export type PresetConfig = {
  // Palette
  pageBg: string          // main page background
  sectionAltBg: string    // alternate section background
  footerBg: string        // footer background (darker)
  accent: string          // CTA, highlights, labels (hex)
  accentMuted: string     // accent at very low opacity for washes
  textPrimary: string     // main readable text (hex)
  textSecondary: string   // body text, ~50% opacity (rgba)
  textMuted: string       // labels / footers, ~20% opacity (rgba)
  borderColor: string     // card / section borders (rgba or hex)
  borderMuted: string     // very subtle borders (rgba)
  cardBg: string          // card surface (may be gradient string)
  navScrolledBg: string   // navbar backdrop when scrolled (rgba)
  // Button
  btnTextColor: string    // text color on filled CTA buttons
  btnOverlay: string      // hover-wipe overlay color on CTA buttons
  // Hero content
  heroImage: string       // Unsplash photo-ID suffix (photo-XXXX)
  heroLine1: string       // sans-serif headline line
  heroLine2: string       // italic serif accent line
  // Visual style
  radius: string          // '2rem' for rounded, '0px' for brutalist
  isDark: boolean         // true for dark-background presets
  glowColor?: string      // neon box-shadow colour (Preset D only)
}
