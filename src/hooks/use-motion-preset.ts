"use client"

import { useMemo } from "react"

import { useReducedMotion } from "framer-motion"

import { useActiveThemeId } from "@/components/showcase/theme-provider"
import {
  getButtonHoverProps,
  getButtonTapProps,
  getCardHoverProps,
  getIconHoverProps,
  getMotionPreset,
  getRevealVariants,
  getStaggerContainerVariants,
  getTransition,
  type MotionPreset,
} from "@/lib/motion"

/** Motion variants and transitions keyed by active theme personality. */
export function useMotionPreset() {
  const themeId = useActiveThemeId()
  const reducedMotion = useReducedMotion() ?? false

  const preset = useMemo(() => getMotionPreset(themeId), [themeId])

  return useMemo(
    () => ({
      themeId,
      preset,
      reducedMotion,
      revealVariants: getRevealVariants(preset),
      staggerVariants: getStaggerContainerVariants(preset),
      transition: (slow?: boolean) =>
        getTransition(preset, { reducedMotion, ...(slow ? { slow: true } : {}) }),
      cardHover: getCardHoverProps(preset, reducedMotion),
      buttonTap: getButtonTapProps(preset, reducedMotion),
      buttonHover: getButtonHoverProps(preset, reducedMotion),
      iconHover: getIconHoverProps(preset, reducedMotion),
    }),
    [themeId, preset, reducedMotion]
  )
}

export type MotionPresetHook = ReturnType<typeof useMotionPreset>

export function useMotionPresetFromTheme(themeId: string) {
  const reducedMotion = useReducedMotion() ?? false
  const preset = useMemo(() => getMotionPreset(themeId), [themeId])

  return {
    preset,
    reducedMotion,
    revealVariants: getRevealVariants(preset),
    staggerVariants: getStaggerContainerVariants(preset),
    transition: (slow?: boolean) =>
      getTransition(preset, { reducedMotion, ...(slow ? { slow: true } : {}) }),
  } satisfies {
    preset: MotionPreset
    reducedMotion: boolean
    revealVariants: ReturnType<typeof getRevealVariants>
    staggerVariants: ReturnType<typeof getStaggerContainerVariants>
    transition: (slow?: boolean) => ReturnType<typeof getTransition>
  }
}
