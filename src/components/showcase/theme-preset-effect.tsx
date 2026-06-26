"use client"

import * as React from "react"

import { useThemeId } from "@/components/showcase/theme-provider"
import { getMotionPersonality } from "@/lib/motion"
import { isValidThemeId } from "@/themes/_registry"

export function ThemePresetEffect({ themeId }: { themeId?: string }) {
  const { setThemeId, themeId: activeThemeId } = useThemeId()

  React.useEffect(() => {
    if (themeId && isValidThemeId(themeId)) {
      setThemeId(themeId)
    }
  }, [themeId, setThemeId])

  React.useEffect(() => {
    const id = themeId && isValidThemeId(themeId) ? themeId : activeThemeId
    const root = document.documentElement
    root.dataset.motionPersonality = getMotionPersonality(id)
  }, [themeId, activeThemeId])

  return null
}
