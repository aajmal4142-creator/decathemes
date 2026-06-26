/** Display metadata for theme personality (fonts, radius, shapes) — not just colors. */
export const themePersonalityMeta: Record<
  string,
  { radius: string; headingFont: string; shapeNote: string }
> = {
  minimal: {
    radius: "6px",
    headingFont: "Inter",
    shapeNote: "Hairline borders, tight spacing",
  },
  brutalist: {
    radius: "0",
    headingFont: "Space Grotesk",
    shapeNote: "Hard edges, offset shadows",
  },
  glass: {
    radius: "18px",
    headingFont: "Inter",
    shapeNote: "Frosted surfaces, soft glow",
  },
  neon: {
    radius: "8px",
    headingFont: "Orbitron",
    shapeNote: "Neon glow, cyberpunk dark",
  },
  corporate: {
    radius: "8px",
    headingFont: "Inter",
    shapeNote: "Trustworthy SaaS spacing",
  },
  editorial: {
    radius: "4px",
    headingFont: "Fraunces",
    shapeNote: "Serif headlines, paper tones",
  },
  playful: {
    radius: "22px",
    headingFont: "Poppins",
    shapeNote: "Pill shapes, candy pastels",
  },
  luxury: {
    radius: "4px",
    headingFont: "Cormorant",
    shapeNote: "Thin serif, gold accents",
  },
  retro: {
    radius: "8px",
    headingFont: "Righteous",
    shapeNote: "Chunky borders, vintage type",
  },
  organic: {
    radius: "14px",
    headingFont: "Fraunces",
    shapeNote: "Soft curves, natural palette",
  },
}

export function getThemePersonality(themeId: string) {
  return (
    themePersonalityMeta[themeId] ?? {
      radius: "—",
      headingFont: "System",
      shapeNote: "Custom tokens",
    }
  )
}
