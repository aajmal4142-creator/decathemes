import { expect, test } from "@playwright/test"

test.describe("Blocks library", () => {
  test("copy block shows success toast", async ({ page, browserName, context }) => {
    if (browserName === "chromium") {
      await context.grantPermissions(["clipboard-read", "clipboard-write"])
    }
    await page.goto("/blocks")
    await page.waitForLoadState("networkidle")

    await page.getByRole("button", { name: /copy block/i }).first().click()
    await expect(page.getByText("Copied to clipboard")).toBeVisible()
  })
})
