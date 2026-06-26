export type ThemeBuilderFont = "sans" | "serif" | "mono"

export type ThemeBuilderShadow = "none" | "soft" | "medium" | "strong"

export interface ThemeBuilderConfig {
  themeId: string
  themeName: string
  primaryHue: number
  primaryChroma: number
  primaryLightness: number
  radiusRem: number
  font: ThemeBuilderFont
  shadow: ThemeBuilderShadow
  spacingUnit: number
}

export const defaultThemeBuilderConfig: ThemeBuilderConfig = {
  themeId: "custom",
  themeName: "Custom",
  primaryHue: 250,
  primaryChroma: 0.14,
  primaryLightness: 0.52,
  radiusRem: 0.5,
  font: "sans",
  shadow: "medium",
  spacingUnit: 0.25,
}

export const fontFamilyMap: Record<ThemeBuilderFont, string> = {
  sans: "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
  serif: "var(--font-source-serif), ui-serif, Georgia, serif",
  mono: "var(--font-jetbrains-mono), ui-monospace, monospace",
}
