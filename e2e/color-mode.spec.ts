import { expect, test } from "@playwright/test"

import { setColorMode } from "./helpers"

test.describe("Color mode persistence", () => {
  test("dark mode persists across reload via next-themes", async ({ page }) => {
    await page.goto("/components")
    await page.waitForFunction(() =>
      document.querySelector('[aria-label="Color mode"]')
    )

    await setColorMode(page, "dark")

    await expect.poll(async () => page.locator("html").getAttribute("class")).toMatch(/dark/)

    const stored = await page.evaluate(() => localStorage.getItem("theme"))
    expect(stored).toBe("dark")

    await page.reload()
    await page.waitForLoadState("networkidle")

    await expect.poll(async () => page.locator("html").getAttribute("class")).toMatch(/dark/)
    expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe("dark")
  })
})
