export const TWEAKS_STORAGE_KEY = "decathemes-tweaks"

export type RadiusScale = "default" | "compact" | "round"
export type FontPreference = "default" | "sans" | "serif" | "mono"

export interface ThemeTweaks {
  radiusScale: RadiusScale
  fontPreference: FontPreference
}

export const defaultThemeTweaks: ThemeTweaks = {
  radiusScale: "default",
  fontPreference: "default",
}

const radiusMultipliers: Record<RadiusScale, number | null> = {
  default: null,
  compact: 0.72,
  round: 1.45,
}

export function getStoredTweaks(): ThemeTweaks {
  if (typeof window === "undefined") return defaultThemeTweaks

  try {
    const raw = localStorage.getItem(TWEAKS_STORAGE_KEY)
    if (!raw) return defaultThemeTweaks
    const parsed = JSON.parse(raw) as Partial<ThemeTweaks>
    return {
      radiusScale: parsed.radiusScale ?? defaultThemeTweaks.radiusScale,
      fontPreference: parsed.fontPreference ?? defaultThemeTweaks.fontPreference,
    }
  } catch {
    return defaultThemeTweaks
  }
}

export function setStoredTweaks(tweaks: ThemeTweaks): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(TWEAKS_STORAGE_KEY, JSON.stringify(tweaks))
  } catch {
    // ignore
  }
}

function parseRadiusToRem(value: string): number | null {
  const trimmed = value.trim()
  if (!trimmed) return null
  if (trimmed.endsWith("rem")) return Number.parseFloat(trimmed)
  if (trimmed.endsWith("px")) return Number.parseFloat(trimmed) / 16
  const numeric = Number.parseFloat(trimmed)
  return Number.isFinite(numeric) ? numeric : null
}

export function applyThemeTweaks(tweaks: ThemeTweaks): void {
  if (typeof document === "undefined") return

  const root = document.documentElement
  root.dataset.radiusScale = tweaks.radiusScale
  root.dataset.fontPreference = tweaks.fontPreference

  const multiplier = radiusMultipliers[tweaks.radiusScale]
  root.style.removeProperty("--radius")

  if (multiplier !== null) {
    const baseRadius = getComputedStyle(root).getPropertyValue("--radius")
    const rem = parseRadiusToRem(baseRadius)
    if (rem !== null) {
      root.style.setProperty("--radius", `${rem * multiplier}rem`)
    }
  }

  if (tweaks.fontPreference === "default") {
    root.style.removeProperty("--font-sans-family")
    root.style.removeProperty("--font-heading-family")
    return
  }

  const styles = getComputedStyle(root)
  const sourceVar =
    tweaks.fontPreference === "serif"
      ? "--font-serif-family"
      : tweaks.fontPreference === "mono"
        ? "--font-mono-family"
        : "--font-sans-family"

  const family = styles.getPropertyValue(sourceVar).trim()
  if (family) {
    root.style.setProperty("--font-sans-family", family)
    root.style.setProperty("--font-heading-family", family)
  }
}
