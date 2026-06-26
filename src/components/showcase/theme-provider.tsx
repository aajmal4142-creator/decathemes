"use client"

/**
 * Theme system: `data-theme` id + tweaks + auto-cycle, combined with next-themes color mode.
 *
 * Prefer granular hooks (`useThemeId`, `useThemeTweaks`, `useActiveThemeId`) over
 * `useDecathemes()` in performance-sensitive trees — contexts are split to limit re-renders.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"

import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"

import {
  applyThemeId,
  getStoredThemeId,
  setStoredThemeId,
  THEME_ID_STORAGE_KEY,
} from "@/lib/theme"
import {
  applyThemeTweaks,
  defaultThemeTweaks,
  getStoredTweaks,
  setStoredTweaks,
  type ThemeTweaks,
} from "@/lib/theme-tweaks"
import {
  getTransitionOriginFromEvent,
  runThemeViewTransition,
  type TransitionOrigin,
} from "@/lib/view-transition"
import {
  defaultThemeId,
  isValidThemeId,
  type ThemeDefinition,
  themes,
} from "@/themes/_registry"

const AUTO_CYCLE_INTERVAL_MS = 4200

interface ThemeIdContextValue {
  themeId: string
  setThemeId: (themeId: string, origin?: TransitionOrigin) => void
  themes: ThemeDefinition[]
}

interface ThemeTweaksContextValue {
  tweaks: ThemeTweaks
  setTweaks: (tweaks: ThemeTweaks) => void
}

interface ThemeAutoCycleContextValue {
  autoCycle: boolean
  setAutoCycle: (enabled: boolean) => void
}

const ThemeIdContext = createContext<ThemeIdContextValue | null>(null)
const ThemeTweaksContext = createContext<ThemeTweaksContextValue | null>(null)
const ThemeAutoCycleContext = createContext<ThemeAutoCycleContextValue | null>(null)

function ThemeIdManager({ children }: { children: React.ReactNode }) {
  const [themeId, setThemeIdState] = useState(defaultThemeId)
  const [tweaks, setTweaksState] = useState(defaultThemeTweaks)
  const [autoCycle, setAutoCycle] = useState(false)
  const themeIdRef = useRef(themeId)

  useEffect(() => {
    themeIdRef.current = themeId
  }, [themeId])

  useEffect(() => {
    setThemeIdState(getStoredThemeId())
    setTweaksState(getStoredTweaks())
  }, [])

  // Sync DOM + storage whenever id or tweaks change (layout script handles first paint)
  useEffect(() => {
    applyThemeId(themeId)
    setStoredThemeId(themeId)
    requestAnimationFrame(() => applyThemeTweaks(tweaks))
  }, [themeId, tweaks])

  const setThemeId = useCallback((nextThemeId: string, origin?: TransitionOrigin) => {
    if (!isValidThemeId(nextThemeId) || nextThemeId === themeIdRef.current) {
      return
    }

    runThemeViewTransition(() => {
      setThemeIdState(nextThemeId)
      applyThemeId(nextThemeId)
      setStoredThemeId(nextThemeId)
      requestAnimationFrame(() => applyThemeTweaks(getStoredTweaks()))
    }, origin)
  }, [])

  const setTweaks = useCallback((nextTweaks: ThemeTweaks) => {
    setTweaksState(nextTweaks)
    setStoredTweaks(nextTweaks)
  }, [])

  useEffect(() => {
    if (!autoCycle) return

    const interval = window.setInterval(() => {
      const currentIndex = themes.findIndex((theme) => theme.id === themeIdRef.current)
      const nextTheme = themes[(currentIndex + 1) % themes.length]
      if (nextTheme !== undefined) {
        setThemeId(nextTheme.id, getTransitionOriginFromEvent())
      }
    }, AUTO_CYCLE_INTERVAL_MS)

    return () => window.clearInterval(interval)
  }, [autoCycle, setThemeId])

  const themeIdValue = useMemo(
    () => ({
      themeId,
      setThemeId,
      themes,
    }),
    [themeId, setThemeId]
  )

  const tweaksValue = useMemo(
    () => ({
      tweaks,
      setTweaks,
    }),
    [tweaks, setTweaks]
  )

  const autoCycleValue = useMemo(
    () => ({
      autoCycle,
      setAutoCycle,
    }),
    [autoCycle]
  )

  return (
    <ThemeIdContext.Provider value={themeIdValue}>
      <ThemeTweaksContext.Provider value={tweaksValue}>
        <ThemeAutoCycleContext.Provider value={autoCycleValue}>
          {children}
        </ThemeAutoCycleContext.Provider>
      </ThemeTweaksContext.Provider>
    </ThemeIdContext.Provider>
  )
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      <ThemeIdManager>{children}</ThemeIdManager>
    </NextThemesProvider>
  )
}

function useThemeIdContext() {
  const context = useContext(ThemeIdContext)

  if (!context) {
    throw new Error("useThemeId must be used within ThemeProvider")
  }

  return context
}

function useThemeTweaksContext() {
  const context = useContext(ThemeTweaksContext)

  if (!context) {
    throw new Error("useThemeTweaks must be used within ThemeProvider")
  }

  return context
}

function useThemeAutoCycleContext() {
  const context = useContext(ThemeAutoCycleContext)

  if (!context) {
    throw new Error("useThemeAutoCycle must be used within ThemeProvider")
  }

  return context
}

/** Theme ID + setter + catalog — does not re-render on tweak or auto-cycle changes. */
export function useThemeId() {
  return useThemeIdContext()
}

/** Active theme ID only — minimal subscription surface for decorative effects. */
export function useActiveThemeId(): string {
  return useThemeIdContext().themeId
}

/** Radius/font tweaks — isolated from theme ID changes. */
export function useThemeTweaks() {
  return useThemeTweaksContext()
}

/** Hero auto-cycle toggle — isolated from theme grid and tweak controls. */
export function useThemeAutoCycle() {
  return useThemeAutoCycleContext()
}

/** Full theme API — prefer granular hooks when a subtree only needs one slice. */
export function useDecathemes() {
  const { theme, setTheme, resolvedTheme, systemTheme } = useTheme()
  const { themeId, setThemeId, themes: availableThemes } = useThemeIdContext()
  const { tweaks, setTweaks } = useThemeTweaksContext()
  const { autoCycle, setAutoCycle } = useThemeAutoCycleContext()

  const setColorMode = useCallback(
    (mode: string, origin?: TransitionOrigin) => {
      runThemeViewTransition(() => {
        setTheme(mode)
      }, origin)
    },
    [setTheme]
  )

  return {
    themeId,
    setThemeId,
    themes: availableThemes,
    tweaks,
    setTweaks,
    autoCycle,
    setAutoCycle,
    colorMode: theme,
    setColorMode,
    resolvedColorMode: resolvedTheme,
    systemColorMode: systemTheme,
    storageKey: THEME_ID_STORAGE_KEY,
  }
}
