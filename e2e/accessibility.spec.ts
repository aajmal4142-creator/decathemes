import { test } from "@playwright/test"

import { runAxeAudit } from "./helpers"

const AXE_ROUTES = [
  { path: "/", label: "homepage" },
  { path: "/preview", label: "preview" },
  { path: "/components", label: "components" },
  { path: "/docs/getting-started", label: "docs" },
] as const

test.describe("Accessibility (axe)", () => {
  for (const { path, label } of AXE_ROUTES) {
    test(`no serious axe violations on ${label}`, async ({ page }) => {
      await page.goto(path)
      await page.waitForLoadState("networkidle")
      await runAxeAudit(page, label)
    })
  }
})
