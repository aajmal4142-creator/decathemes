import { defaultThemeId, isValidThemeId } from "@/themes/_registry"

/** localStorage key for the active `data-theme` id. */
export const THEME_ID_STORAGE_KEY = "decathemes-theme-id"

/**
 * Read persisted theme id. Returns `defaultThemeId` during SSR or when storage is empty.
 */
export function getStoredThemeId(): string {
  if (typeof window === "undefined") {
    return defaultThemeId
  }

  try {
    const stored = localStorage.getItem(THEME_ID_STORAGE_KEY)
    return stored && isValidThemeId(stored) ? stored : defaultThemeId
  } catch {
    return defaultThemeId
  }
}

export function setStoredThemeId(themeId: string): void {
  if (typeof window === "undefined" || !isValidThemeId(themeId)) {
    return
  }

  try {
    localStorage.setItem(THEME_ID_STORAGE_KEY, themeId)
    document.documentElement.setAttribute("data-theme", themeId)
  } catch {
    // Ignore storage errors in restricted environments.
  }
}

export function applyThemeId(themeId: string): void {
  if (typeof document === "undefined" || !isValidThemeId(themeId)) {
    return
  }

  document.documentElement.setAttribute("data-theme", themeId)
}
