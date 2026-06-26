import type { CSSProperties } from "react"

/** License-safe avatar helpers — initials + deterministic gradient (no bundled photos). */

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return "?"
  if (parts.length === 1) {
    const only = parts[0]
    return only ? only.slice(0, 2).toUpperCase() : "?"
  }
  const first = parts[0]?.[0]
  const last = parts[parts.length - 1]?.[0]
  if (!first || !last) return "?"
  return `${first}${last}`.toUpperCase()
}

function hashSeed(seed: string): number {
  let hash = 0
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash << 5) - hash + seed.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

/** OKLCH hue 0–360 from a stable string seed */
export function getAvatarHue(seed: string): number {
  return hashSeed(seed) % 360
}

export function getAvatarGradientStyle(seed: string): CSSProperties {
  const hue = getAvatarHue(seed)
  const hue2 = (hue + 42) % 360
  return {
    background: `linear-gradient(135deg, oklch(0.72 0.12 ${hue}), oklch(0.58 0.14 ${hue2}))`,
  }
}
