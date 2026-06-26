import AxeBuilder from "@axe-core/playwright"

import { expect, type Page } from "@playwright/test"

/** All registered `data-theme` ids — keep in sync with `src/themes/_registry.ts`. */
export const THEME_IDS = [
  "minimal",
  "glass",
  "neon",
  "luxury",
  "corporate",
  "editorial",
  "playful",
  "brutalist",
  "retro",
  "organic",
] as const

export const PREVIEW_DEMO_PATHS = [
  "/preview/landing",
  "/preview/dashboard",
  "/preview/auth",
  "/preview/settings",
  "/preview/store",
  "/preview/blog",
  "/preview/crm",
  "/preview/analytics",
  "/preview/ai-chat",
] as const

const IGNORED_CONSOLE_PATTERNS = [
  /favicon/i,
  /Failed to load resource.*404/i,
  /net::ERR_/i,
  /analytics/i,
  /googletagmanager/i,
]

export function shouldIgnoreConsoleMessage(text: string): boolean {
  return IGNORED_CONSOLE_PATTERNS.some((pattern) => pattern.test(text))
}

export function attachConsoleCollector(page: Page): string[] {
  const errors: string[] = []

  page.on("console", (message) => {
    if (message.type() !== "error") return
    const text = message.text()
    if (shouldIgnoreConsoleMessage(text)) return
    errors.push(text)
  })

  page.on("pageerror", (error) => {
    errors.push(error.message)
  })

  return errors
}

export async function getPrimaryToken(page: Page): Promise<string> {
  return page.evaluate(() =>
    getComputedStyle(document.documentElement).getPropertyValue("--primary").trim()
  )
}

export async function selectThemeFromTopBar(page: Page, themeName: string) {
  const themeId = THEME_NAMES_TO_ID[themeName] ?? themeName.toLowerCase()
  const currentTheme = await page.locator("html").getAttribute("data-theme")
  if (currentTheme === themeId) {
    return
  }

  await page.keyboard.press("Escape")
  await page.locator('[aria-label^="Theme:"]').click()
  const menu = page.getByRole("menu", { name: /^Theme:/ })
  await menu.waitFor({ state: "visible" })
  const menuContent = page.locator('[data-slot="dropdown-menu-content"]')
  await menuContent.evaluate((container, label) => {
    const target = container.querySelector(`[aria-label="${label}"]`)
    if (!(target instanceof HTMLElement)) {
      throw new Error(`Theme option not found: ${label}`)
    }
    target.click()
  }, `${themeName} theme`)
  await expect.poll(async () => page.locator("html").getAttribute("data-theme")).not.toBeNull()
  await page.keyboard.press("Escape")
}

const THEME_NAMES_TO_ID: Record<string, string> = {
  Minimal: "minimal",
  Brutalist: "brutalist",
  Glass: "glass",
  Neon: "neon",
  Corporate: "corporate",
  Editorial: "editorial",
  Playful: "playful",
  Luxury: "luxury",
  Retro: "retro",
  Organic: "organic",
}

export async function setColorMode(page: Page, mode: "light" | "dark" | "system") {
  const labels = { light: "Light", dark: "Dark", system: "System" } as const
  await page.getByRole("group", { name: "Color mode" }).getByLabel(labels[mode]).click()
}

export function expectHrefNotLocalhost(href: string) {
  expect(href).not.toMatch(/localhost/i)
  expect(href).not.toMatch(/127\.0\.0\.1/)
}

export async function collectSameOriginLinks(page: Page): Promise<string[]> {
  const base = new URL(page.url())
  const hrefs = await page.locator("header a[href], footer a[href]").evaluateAll(
    (anchors) =>
      anchors
        .map((anchor) => anchor.getAttribute("href"))
        .filter((href): href is string => Boolean(href))
  )

  const internal = new Set<string>()

  for (const href of hrefs) {
    if (href.startsWith("#")) continue
    if (href.startsWith("mailto:") || href.startsWith("tel:")) continue

    const resolved = new URL(href, base)
    if (resolved.origin !== base.origin) continue

    const path = resolved.pathname.replace(/\/$/, "") || "/"
    internal.add(path)
  }

  return [...internal].sort()
}

export async function expectLinksReturnOk(page: Page, paths: string[]) {
  for (const path of paths) {
    const response = await page.request.get(path)
    expect(
      response.status(),
      `Expected ${path} to return 2xx/3xx, got ${response.status()}`
    ).toBeLessThan(400)
  }
}

export async function expectHeaderFooterHrefsClean(page: Page) {
  const hrefs = await page.locator("header a[href], footer a[href]").evaluateAll(
    (anchors) =>
      anchors
        .map((anchor) => anchor.getAttribute("href"))
        .filter((href): href is string => Boolean(href))
  )

  for (const href of hrefs) {
    if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
      continue
    }
    expectHrefNotLocalhost(href)
  }
}

export async function runAxeAudit(page: Page, routeLabel: string) {
  const results = await new AxeBuilder({ page })
    .disableRules(["color-contrast"])
    .exclude('[data-gallery-stage]')
    .analyze()

  const serious = results.violations.filter(
    (violation) => violation.impact === "serious" || violation.impact === "critical"
  )

  if (serious.length > 0) {
    const summary = serious
      .map(
        (violation) =>
          `[${violation.impact}] ${violation.id}: ${violation.help} (${violation.nodes.length} nodes)`
      )
      .join("\n")
    throw new Error(`Axe serious/critical violations on ${routeLabel}:\n${summary}`)
  }
}
