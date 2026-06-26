import { test } from "@playwright/test"

import { collectSameOriginLinks, expectHeaderFooterHrefsClean, expectLinksReturnOk } from "./helpers"

const ROUTES_WITH_CHROME = ["/", "/components", "/blocks", "/preview", "/theme-builder"]

test.describe("Header and footer navigation", () => {
  for (const route of ROUTES_WITH_CHROME) {
    test(`all header/footer links on ${route} return OK`, async ({ page }) => {
      await page.goto(route)
      await page.waitForLoadState("networkidle")

      const paths = await collectSameOriginLinks(page)
      await expectLinksReturnOk(page, paths)
      await expectHeaderFooterHrefsClean(page)
    })
  }
})
