/** Shared responsive constants — align with Tailwind defaults and use-mobile hook. */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const

/** Viewport widths to regression-test (see RESPONSIVE.md). */
export const TEST_VIEWPORTS = [
  320, 360, 375, 390, 414, 768, 834, 1024, 1280, 1440, 1920,
] as const

export const MOBILE_MAX_WIDTH = BREAKPOINTS.md - 1
