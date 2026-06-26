export {
  defaultThemeId,
  getThemeById,
  isValidThemeId,
  themeIds,
  themes,
  type ThemeDefinition,
} from "@/themes/_registry"

export {
  applyThemeId,
  getStoredThemeId,
  setStoredThemeId,
  THEME_ID_STORAGE_KEY,
} from "@/lib/theme"

export function themeSelector(themeId: string): string {
  return `[data-theme="${themeId}"]`
}

export function themeDarkSelector(themeId: string): string {
  return `[data-theme="${themeId}"].dark`
}
