import { expect, test } from "@playwright/test"

test.describe("Theme builder", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/theme-builder")
    await page.waitForLoadState("networkidle")
  })

  test("slider controls update live preview copy", async ({ page }) => {
    const hueLabel = page.getByText(/OKLCH hue \d+°/)
    await expect(hueLabel).toContainText("250°")

    const slider = page.getByRole("slider").first()
    await slider.focus()
    for (let i = 0; i < 15; i++) {
      await page.keyboard.press("ArrowRight")
    }

    await expect(hueLabel).not.toContainText("250°")
  })

  test("download produces a tokens.css file", async ({ page }) => {
    const downloadPromise = page.waitForEvent("download")
    await page.getByRole("button", { name: /download/i }).click()
    const download = await downloadPromise

    expect(download.suggestedFilename()).toMatch(/\.tokens\.css$/)
    const path = await download.path()
    expect(path).toBeTruthy()
  })
})
