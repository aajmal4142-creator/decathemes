export interface ThemeDefinition {
  id: string
  name: string
  description: string
  tags: string[]
  vibes: string[]
  previewColor: string
  previewGradient: string
}

export const themes: ThemeDefinition[] = [
  {
    id: "minimal",
    name: "Minimal",
    description:
      "Linear/Vercel-style precision. Tight spacing, neutral grays, subtle borders.",
    tags: ["saas", "startup", "dashboard"],
    vibes: ["precise", "quiet", "modern", "developer"],
    previewColor: "#171717",
    previewGradient: "linear-gradient(135deg, #fafafa 0%, #e5e5e5 50%, #171717 100%)",
  },
  {
    id: "glass",
    name: "Glass",
    description:
      "Frosted translucent surfaces with blur, soft glows, and gradient backgrounds.",
    tags: ["landing", "modern", "fintech"],
    vibes: ["ethereal", "layered", "luminous", "airy"],
    previewColor: "#6366f1",
    previewGradient: "linear-gradient(135deg, #c4b5fd 0%, #818cf8 40%, #e0e7ff 100%)",
  },
  {
    id: "neon",
    name: "Neon",
    description: "Cyberpunk dark aesthetic with neon cyan and magenta glow accents.",
    tags: ["gaming", "crypto", "night"],
    vibes: ["electric", "futuristic", "nocturnal", "synthwave"],
    previewColor: "#00f5ff",
    previewGradient: "linear-gradient(135deg, #0a0a1a 0%, #00f5ff 50%, #ff00aa 100%)",
  },
  {
    id: "luxury",
    name: "Luxury",
    description:
      "Elegant black and gold. High contrast, thin serif headings, premium spacing.",
    tags: ["fashion", "hospitality", "premium"],
    vibes: ["opulent", "exclusive", "timeless", "refined"],
    previewColor: "#c9a227",
    previewGradient: "linear-gradient(135deg, #1a1a1a 0%, #c9a227 50%, #f5f0e1 100%)",
  },
  {
    id: "corporate",
    name: "Corporate",
    description:
      "Trustworthy SaaS blue. Clean white cards, generous spacing, professional.",
    tags: ["enterprise", "b2b", "saas"],
    vibes: ["trustworthy", "polished", "reliable", "structured"],
    previewColor: "#2563eb",
    previewGradient: "linear-gradient(135deg, #eff6ff 0%, #2563eb 50%, #1e3a5f 100%)",
  },
  {
    id: "editorial",
    name: "Editorial",
    description:
      "Magazine feel with serif headings, warm paper tones, and ink-colored text.",
    tags: ["blog", "publishing", "media"],
    vibes: ["literary", "warm", "refined", "storytelling"],
    previewColor: "#44403c",
    previewGradient: "linear-gradient(135deg, #faf7f2 0%, #d6cfc4 50%, #44403c 100%)",
  },
  {
    id: "playful",
    name: "Playful",
    description: "Rounded and friendly with pastel candy colors and bouncy shadows.",
    tags: ["consumer", "kids", "social"],
    vibes: ["bubbly", "cheerful", "candy", "friendly"],
    previewColor: "#ec4899",
    previewGradient: "linear-gradient(135deg, #fce7f3 0%, #ec4899 40%, #a5f3fc 100%)",
  },
  {
    id: "brutalist",
    name: "Brutalist",
    description:
      "Raw, loud, and unapologetic. Hard borders, offset shadows, zero radius.",
    tags: ["portfolio", "agency", "creative"],
    vibes: ["bold", "raw", "confrontational", "graphic"],
    previewColor: "#000000",
    previewGradient: "linear-gradient(135deg, #fef08a 0%, #000000 50%, #ffffff 100%)",
  },
  {
    id: "retro",
    name: "Retro",
    description:
      "80s/90s vintage with warm oranges, chunky borders, and retro display type.",
    tags: ["nostalgia", "entertainment", "music"],
    vibes: ["vintage", "chunky", "warm", "nostalgic"],
    previewColor: "#ea580c",
    previewGradient: "linear-gradient(135deg, #fed7aa 0%, #ea580c 40%, #0d9488 100%)",
  },
  {
    id: "organic",
    name: "Organic",
    description:
      "Nature-inspired sage, olive, and clay palette with soft natural shadows.",
    tags: ["wellness", "eco", "food"],
    vibes: ["grounded", "calm", "natural", "earthy"],
    previewColor: "#4d7c0f",
    previewGradient: "linear-gradient(135deg, #ecfccb 0%, #4d7c0f 50%, #a16207 100%)",
  },
]

export const defaultThemeId = "minimal"

export function getThemeById(id: string): ThemeDefinition | undefined {
  return themes.find((theme) => theme.id === id)
}

export function isValidThemeId(id: string): boolean {
  return themes.some((theme) => theme.id === id)
}

export const themeIds = themes.map((theme) => theme.id)
