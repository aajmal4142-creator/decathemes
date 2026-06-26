import { expect, test } from "@playwright/test"

test.describe("Component gallery", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/components")
    await page.waitForLoadState("networkidle")
  })

  test("category filter scrolls to a section", async ({ page }) => {
    await page.getByRole("button", { name: /^navigation/i }).click({ force: true })
    await expect(page.locator("#section-navigation")).toBeInViewport()
  })

  test("View code opens the code sheet", async ({ page }) => {
    await page.getByRole("button", { name: "View code" }).first().click()
    await expect(page.getByRole("dialog")).toBeVisible()
    await expect(page.locator("pre code")).not.toBeEmpty()
  })

  test("compare themes mode shows side-by-side selectors", async ({ page }) => {
    const compareSwitch = page.locator("#compare-mode")
    await compareSwitch.scrollIntoViewIfNeeded()
    await compareSwitch.evaluate((element) => {
      ;(element as HTMLButtonElement).click()
    })
    await expect(page.getByRole("combobox", { name: "Theme A" })).toBeVisible()
    await expect(page.getByRole("combobox", { name: "Theme B" })).toBeVisible()
  })
})
