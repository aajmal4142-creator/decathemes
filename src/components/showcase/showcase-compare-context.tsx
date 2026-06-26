"use client"

import * as React from "react"

import { useThemeId } from "@/components/showcase/theme-provider"
import { themes } from "@/themes/_registry"

export interface ShowcaseCompareState {
  compareMode: boolean
  setCompareMode: (enabled: boolean) => void
  compareThemeA: string
  compareThemeB: string
  setCompareThemeA: (id: string) => void
  setCompareThemeB: (id: string) => void
  randomizeTheme: () => void
}

const ShowcaseCompareContext = React.createContext<ShowcaseCompareState | null>(null)

export function ShowcaseCompareProvider({ children }: { children: React.ReactNode }) {
  const { themeId, setThemeId, themes: themeList } = useThemeId()
  const [compareMode, setCompareMode] = React.useState(false)
  const [compareThemeA, setCompareThemeA] = React.useState("minimal")
  const [compareThemeB, setCompareThemeB] = React.useState("glass")

  const randomizeTheme = React.useCallback(() => {
    const pool = themeList.length > 0 ? themeList : themes
    const pick = pool[Math.floor(Math.random() * pool.length)]
    if (pick !== undefined) {
      setThemeId(pick.id)
    }
  }, [setThemeId, themeList])

  React.useEffect(() => {
    if (!compareMode) return
    setCompareThemeA(themeId)
  }, [compareMode, themeId])

  const value = React.useMemo(
    () => ({
      compareMode,
      setCompareMode,
      compareThemeA,
      compareThemeB,
      setCompareThemeA,
      setCompareThemeB,
      randomizeTheme,
    }),
    [compareMode, compareThemeA, compareThemeB, randomizeTheme]
  )

  return (
    <ShowcaseCompareContext.Provider value={value}>
      {children}
    </ShowcaseCompareContext.Provider>
  )
}

export function useShowcaseCompare() {
  const ctx = React.useContext(ShowcaseCompareContext)
  if (!ctx) {
    throw new Error("useShowcaseCompare must be used within ShowcaseCompareProvider")
  }
  return ctx
}

export function useShowcaseCompareOptional() {
  return React.useContext(ShowcaseCompareContext)
}
