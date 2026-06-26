/**
 * Demo imagery — no stock photos are bundled in the ZIP.
 *
 * Default: CSS/SVG mesh placeholders (license-free).
 * Optional: Unsplash Source URLs buyers can swap in production.
 * @see THIRD-PARTY-NOTICES.md
 */

export type DemoImageKind = "product" | "blog" | "hero"

/** Deterministic mesh gradient class suffix from an id */
export function getMeshAccent(id: string): string {
  const palettes = [
    "from-chart-1/25 via-chart-2/15 to-muted",
    "from-chart-2/20 via-chart-3/10 to-background",
    "from-chart-3/25 via-chart-4/15 to-muted",
    "from-chart-4/20 via-chart-5/10 to-background",
    "from-primary/20 via-accent/10 to-muted",
    "from-secondary/30 via-muted to-background",
  ] as const
  let hash = 0
  for (let i = 0; i < id.length; i += 1)
    hash = (hash + id.charCodeAt(i)) % palettes.length
  return palettes[hash] ?? palettes[0]
}

/**
 * Optional Unsplash Source URL — NOT used by default in demos.
 * Buyers may set NEXT_PUBLIC_DEMO_UNSPLASH=1 and pass these to next/image.
 */
export function getOptionalUnsplashUrl(
  query: string,
  width = 800,
  height = 600
): string {
  const encoded = encodeURIComponent(query)
  return `https://source.unsplash.com/${width}x${height}/?${encoded}`
}

export const unsplashExamples = {
  linen: getOptionalUnsplashUrl("linen textile neutral"),
  ceramic: getOptionalUnsplashUrl("ceramic mug minimal"),
  desk: getOptionalUnsplashUrl("brass desk lamp"),
} as const
