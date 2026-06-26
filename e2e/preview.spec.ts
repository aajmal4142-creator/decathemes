import { expect, test } from "@playwright/test"

import { attachConsoleCollector, PREVIEW_DEMO_PATHS } from "./helpers"

test.describe("Preview shell", () => {
  test.use({ viewport: { width: 1280, height: 800 } })

  test("viewport toggles constrain preview frame width", async ({ page }) => {
    await page.goto("/preview")
    await page.getByRole("radio", { name: "375px viewport" }).click()

    const frameWrapper = page.getByTestId("preview-frame-wrapper")

    await expect(frameWrapper).toBeVisible()
    await expect.poll(async () =>
      frameWrapper.evaluate(
        (el) => el.style.maxWidth || getComputedStyle(el).maxWidth
      )
    ).toBe("375px")
  })
})

test.describe("Preview demo pages", () => {
  for (const path of PREVIEW_DEMO_PATHS) {
    test(`${path} loads without console errors`, async ({ page }) => {
      const errors = attachConsoleCollector(page)
      await page.goto(path)
      await page.waitForLoadState("networkidle")
      await expect(page.locator("body")).toBeVisible()
      expect(errors, `Console errors on ${path}: ${errors.join("; ")}`).toEqual([])
    })
  }
})
