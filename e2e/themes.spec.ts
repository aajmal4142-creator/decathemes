import { expect, test } from "@playwright/test"

import { getPrimaryToken, selectThemeFromTopBar, THEME_IDS } from "./helpers"

const THEME_NAMES: Record<(typeof THEME_IDS)[number], string> = {
  minimal: "Minimal",
  brutalist: "Brutalist",
  glass: "Glass",
  neon: "Neon",
  corporate: "Corporate",
  editorial: "Editorial",
  playful: "Playful",
  luxury: "Luxury",
  retro: "Retro",
  organic: "Organic",
}

test.describe("Theme switching", () => {
  test.describe.configure({ mode: "serial" })
  test.beforeEach(async ({ page }) => {
    await page.goto("/components")
    await page.waitForLoadState("networkidle")
    await page.evaluate(() => {
      localStorage.setItem("decathemes-theme-id", "minimal")
      document.documentElement.setAttribute("data-theme", "minimal")
    })
  })

  for (const themeId of THEME_IDS) {
    test(`selecting ${themeId} updates data-theme and --primary token`, async ({ page }) => {
      const before = await getPrimaryToken(page)

      await selectThemeFromTopBar(page, THEME_NAMES[themeId])

      await expect
        .poll(async () => page.locator("html").getAttribute("data-theme"))
        .toBe(themeId)

      const after = await getPrimaryToken(page)
      expect(after).not.toBe("")

      if (themeId !== "minimal") {
        expect(after).not.toBe(before)
      }
    })
  }
})
