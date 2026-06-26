import { defaultThemeId, isValidThemeId } from "@/themes/_registry"

import type { Transition, Variants } from "framer-motion"

export type MotionPersonality =
  | "subtle"
  | "elegant"
  | "springy"
  | "snappy"
  | "glitch"
  | "floaty"
  | "retro"

export interface MotionPreset {
  personality: MotionPersonality
  duration: number
  durationSlow: number
  ease: Transition["ease"]
  spring?: { stiffness: number; damping: number; mass?: number }
  reveal: { y: number; opacity: number }
  stagger: number
  cardHover: {
    y: number
    scale: number
    rotate: number
    x: number
  }
  buttonTap: { scale: number }
  iconHover: { scale: number; rotate: number }
}

const PERSONALITY_PRESETS: Record<MotionPersonality, MotionPreset> = {
  subtle: {
    personality: "subtle",
    duration: 0.18,
    durationSlow: 0.2,
    ease: [0, 0, 0.2, 1],
    reveal: { y: 12, opacity: 0 },
    stagger: 0.04,
    cardHover: { y: -3, scale: 1, rotate: 0, x: 0 },
    buttonTap: { scale: 0.97 },
    iconHover: { scale: 1.05, rotate: 0 },
  },
  elegant: {
    personality: "elegant",
    duration: 0.5,
    durationSlow: 0.6,
    ease: [0.22, 1, 0.36, 1],
    reveal: { y: 12, opacity: 0 },
    stagger: 0.07,
    cardHover: { y: -4, scale: 1.005, rotate: 0, x: 0 },
    buttonTap: { scale: 0.98 },
    iconHover: { scale: 1.04, rotate: 0 },
  },
  springy: {
    personality: "springy",
    duration: 0.35,
    durationSlow: 0.45,
    ease: [0.34, 1.56, 0.64, 1],
    spring: { stiffness: 420, damping: 22, mass: 0.8 },
    reveal: { y: 14, opacity: 0 },
    stagger: 0.06,
    cardHover: { y: -5, scale: 1.02, rotate: -1.5, x: 0 },
    buttonTap: { scale: 0.94 },
    iconHover: { scale: 1.12, rotate: 8 },
  },
  snappy: {
    personality: "snappy",
    duration: 0.08,
    durationSlow: 0.1,
    ease: [0.2, 0, 0.4, 1],
    reveal: { y: 8, opacity: 0 },
    stagger: 0.02,
    cardHover: { y: 0, scale: 1, rotate: 0, x: -2 },
    buttonTap: { scale: 0.98 },
    iconHover: { scale: 1.02, rotate: 0 },
  },
  glitch: {
    personality: "glitch",
    duration: 0.16,
    durationSlow: 0.22,
    ease: [0.4, 0, 0.2, 1],
    reveal: { y: 10, opacity: 0 },
    stagger: 0.035,
    cardHover: { y: -2, scale: 1.01, rotate: 0, x: 0 },
    buttonTap: { scale: 0.96 },
    iconHover: { scale: 1.08, rotate: 0 },
  },
  floaty: {
    personality: "floaty",
    duration: 0.42,
    durationSlow: 0.55,
    ease: [0.33, 1, 0.68, 1],
    reveal: { y: 12, opacity: 0 },
    stagger: 0.055,
    cardHover: { y: -6, scale: 1.01, rotate: 0, x: 0 },
    buttonTap: { scale: 0.97 },
    iconHover: { scale: 1.06, rotate: -4 },
  },
  retro: {
    personality: "retro",
    duration: 0.22,
    durationSlow: 0.28,
    ease: [0.25, 0.8, 0.25, 1],
    reveal: { y: 12, opacity: 0 },
    stagger: 0.045,
    cardHover: { y: -4, scale: 1.01, rotate: 0.5, x: 0 },
    buttonTap: { scale: 0.96 },
    iconHover: { scale: 1.1, rotate: -3 },
  },
}

const THEME_PERSONALITY: Record<string, MotionPersonality> = {
  minimal: "subtle",
  corporate: "subtle",
  luxury: "elegant",
  editorial: "elegant",
  playful: "springy",
  brutalist: "snappy",
  neon: "glitch",
  glass: "floaty",
  organic: "floaty",
  retro: "retro",
}

export function getMotionPersonality(themeId: string): MotionPersonality {
  if (isValidThemeId(themeId)) {
    return THEME_PERSONALITY[themeId] ?? "subtle"
  }
  return THEME_PERSONALITY[defaultThemeId] ?? "subtle"
}

export function getMotionPreset(themeId: string): MotionPreset {
  return PERSONALITY_PRESETS[getMotionPersonality(themeId)]
}

export function getRevealVariants(preset: MotionPreset): Variants {
  return {
    hidden: {
      opacity: preset.reveal.opacity,
      y: preset.reveal.y,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  }
}

export function getStaggerContainerVariants(preset: MotionPreset): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: preset.stagger,
        delayChildren: 0.04,
      },
    },
  }
}

export function getTransition(
  preset: MotionPreset,
  options: { slow?: boolean; reducedMotion?: boolean } = {}
): Transition {
  if (options.reducedMotion) {
    return { duration: 0 }
  }

  const slow = options.slow === true

  if (preset.spring && preset.personality === "springy") {
    return {
      type: "spring",
      ...preset.spring,
    }
  }

  return {
    duration: slow ? preset.durationSlow : preset.duration,
    ...(preset.ease !== undefined ? { ease: preset.ease } : {}),
  }
}

export function getCardHoverProps(preset: MotionPreset, reducedMotion: boolean) {
  if (reducedMotion) return undefined

  const base = {
    y: preset.cardHover.y,
    scale: preset.cardHover.scale,
    rotate: preset.cardHover.rotate,
    x: preset.cardHover.x,
  }

  if (preset.personality === "glitch") {
    return {
      y: -3,
      scale: 1.01,
    }
  }

  return base
}

export function getButtonTapProps(preset: MotionPreset, reducedMotion: boolean) {
  if (reducedMotion) return undefined
  return { scale: preset.buttonTap.scale }
}

export function getButtonHoverProps(preset: MotionPreset, reducedMotion: boolean) {
  if (reducedMotion) return undefined

  if (preset.personality === "glitch") {
    return {
      x: [0, -1, 1, 0],
      transition: { duration: 0.18, ease: "linear" as const },
    }
  }

  if (preset.personality === "snappy") {
    return { x: -1, y: -1 }
  }

  if (preset.personality === "springy") {
    return { rotate: -2, scale: 1.02 }
  }

  return { scale: 1.01 }
}

export function getIconHoverProps(preset: MotionPreset, reducedMotion: boolean) {
  if (reducedMotion) return undefined
  return {
    scale: preset.iconHover.scale,
    rotate: preset.iconHover.rotate,
  }
}

export interface ParsedStatValue {
  prefix: string
  value: number
  suffix: string
  decimals: number
}

export function parseStatValue(raw: string): ParsedStatValue | null {
  const match = raw.match(/^([^0-9.-]*)([-+]?[0-9,]*\.?[0-9]+)(.*)$/)
  if (!match) return null

  const numPart = match[2]
  if (!numPart) return null

  const numeric = Number.parseFloat(numPart.replace(/,/g, ""))
  if (!Number.isFinite(numeric)) return null

  const decimals = numPart.includes(".")
    ? (numPart.split(".")[1]?.replace(/,/g, "").length ?? 0)
    : 0

  return {
    prefix: match[1] ?? "",
    value: numeric,
    suffix: match[3] ?? "",
    decimals,
  }
}

export function formatStatValue(
  value: number,
  parsed: Pick<ParsedStatValue, "prefix" | "suffix" | "decimals">
): string {
  const formatted =
    parsed.decimals > 0
      ? value.toLocaleString(undefined, {
          minimumFractionDigits: parsed.decimals,
          maximumFractionDigits: parsed.decimals,
        })
      : Math.round(value).toLocaleString()

  return `${parsed.prefix}${formatted}${parsed.suffix}`
}
