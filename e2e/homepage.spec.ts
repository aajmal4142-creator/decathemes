import { expect, test } from "@playwright/test"

import { expectHrefNotLocalhost } from "./helpers"

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  })

  test("loads with hero and product title", async ({ page }) => {
    await expect(page).toHaveTitle(/Decathemes/i)
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible()
  })

  test("primary CTAs point to in-app routes, not localhost", async ({ page }) => {
    const ctas = [
      page.getByRole("link", { name: /live preview/i }).first(),
      page.getByRole("link", { name: /explore live preview/i }),
      page.getByRole("link", { name: /^preview$/i }),
    ]

    for (const link of ctas) {
      await expect(link).toBeVisible()
      const href = await link.getAttribute("href")
      expect(href).toBeTruthy()
      expectHrefNotLocalhost(href!)
      expect(href).toMatch(/^\/preview/)
    }
  })

  test("footer product links are internal and valid", async ({ page }) => {
    const footer = page.locator("footer")
    await expect(footer.getByRole("link", { name: /live preview/i })).toHaveAttribute(
      "href",
      "/preview"
    )
    await expect(footer.getByRole("link", { name: /^components$/i })).toHaveAttribute(
      "href",
      "/components"
    )
    await expect(footer.getByRole("link", { name: /^blocks$/i })).toHaveAttribute(
      "href",
      "/blocks"
    )
    await expect(footer.getByRole("link", { name: /documentation/i })).toHaveAttribute(
      "href",
      "/docs"
    )
  })
})
