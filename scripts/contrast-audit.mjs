#!/usr/bin/env node
/**
 * Parses theme token CSS and checks WCAG 2.1 AA contrast (4.5:1 normal text pairs).
 * Run: node scripts/contrast-audit.mjs
 * Output: src/lib/accessibility-audit.generated.ts
 */

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, "..")
const themesDir = path.join(root, "src/themes")
const outFile = path.join(root, "src/lib/accessibility-audit.generated.ts")

const themeIds = fs
  .readdirSync(themesDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)

const PAIRS = [
  ["foreground", "background", "Body text"],
  ["primary-foreground", "primary", "Primary button"],
  ["secondary-foreground", "secondary", "Secondary surface"],
  ["muted-foreground", "muted", "Muted text"],
  ["card-foreground", "card", "Card text"],
  ["destructive-foreground", "destructive", "Destructive button"],
]

function parseOklch(value) {
  const trimmed = value.trim()
  const hex = trimmed.match(/^#([0-9a-f]{3,8})$/i)
  if (hex) {
    let h = hex[1]
    if (h.length === 3) {
      h = h
        .split("")
        .map((c) => c + c)
        .join("")
    }
    const r = parseInt(h.slice(0, 2), 16) / 255
    const g = parseInt(h.slice(2, 4), 16) / 255
    const b = parseInt(h.slice(4, 6), 16) / 255
    return { rgb: [r, g, b] }
  }
  const match = trimmed.match(/oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)/i)
  if (!match) return null
  return {
    rgb: oklchToRgb({
      l: Number(match[1]),
      c: Number(match[2]),
      h: Number(match[3]),
    }),
  }
}

function oklchToRgb({ l, c, h }) {
  const hRad = (h * Math.PI) / 180
  const a = c * Math.cos(hRad)
  const b = c * Math.sin(hRad)
  const l_ = l + 0.3963377774 * a + 0.2158037573 * b
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b
  const s_ = l - 0.0894841775 * a - 1.291485548 * b
  const l3 = l_ ** 3
  const m3 = m_ ** 3
  const s3 = s_ ** 3
  let r = 4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3
  let g = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3
  let bVal = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3
  const clamp = (x) => Math.min(1, Math.max(0, x))
  r = clamp(r)
  g = clamp(g)
  bVal = clamp(bVal)
  const toSrgb = (c) =>
    c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055
  return [toSrgb(r), toSrgb(g), toSrgb(bVal)]
}

function relativeLuminance([r, g, b]) {
  const lin = (v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
}

function contrastRatio(fg, bg) {
  const l1 = relativeLuminance(fg)
  const l2 = relativeLuminance(bg)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

function parseTokens(css, mode) {
  const selector =
    mode === "dark"
      ? /\[data-theme="[^"]+"\]\.dark\s*\{([^}]+)\}/g
      : /\[data-theme="([^"]+)"\]\s*\{(?![^}]*\.dark)([^}]+)\}/g

  const tokens = {}
  if (mode === "dark") {
    let m
    while ((m = selector.exec(css)) !== null) {
      const block = m[1]
      for (const line of block.split("\n")) {
        const varMatch = line.match(/--([a-z0-9-]+):\s*([^;]+);/)
        if (varMatch) tokens[varMatch[1]] = varMatch[2].trim()
      }
    }
    return tokens
  }

  let m
  while ((m = selector.exec(css)) !== null) {
    const themeId = m[1]
    const block = m[2]
    if (!tokens[themeId]) tokens[themeId] = {}
    for (const line of block.split("\n")) {
      const varMatch = line.match(/--([a-z0-9-]+):\s*([^;]+);/)
      if (varMatch) tokens[themeId][varMatch[1]] = varMatch[2].trim()
    }
  }
  return tokens
}

function checkPair(tokenMap, fgKey, bgKey) {
  const fg = parseOklch(tokenMap[fgKey] ?? "")
  const bg = parseOklch(tokenMap[bgKey] ?? "")
  if (!fg || !bg) return { ratio: 0, pass: false }
  const ratio = contrastRatio(fg.rgb, bg.rgb)
  return { ratio: Math.round(ratio * 100) / 100, pass: ratio >= 4.5 }
}

const results = []

for (const themeId of themeIds) {
  const css = fs.readFileSync(
    path.join(themesDir, themeId, "tokens.css"),
    "utf8"
  )
  const lightTokens = parseTokens(css, "light")[themeId] ?? {}
  const darkBlock = css.match(
    new RegExp(`\\[data-theme="${themeId}"\\]\\.dark\\s*\\{([^}]+)\\}`)
  )
  const darkTokens = {}
  if (darkBlock) {
    for (const line of darkBlock[1].split("\n")) {
      const varMatch = line.match(/--([a-z0-9-]+):\s*([^;]+);/)
      if (varMatch) darkTokens[varMatch[1]] = varMatch[2].trim()
    }
  }

  for (const mode of ["light", "dark"]) {
    const tokenMap = mode === "light" ? lightTokens : darkTokens
    const pairs = PAIRS.map(([fg, bg, label]) => {
      const { ratio, pass } = checkPair(tokenMap, fg, bg)
      return { label, ratio, pass, fg, bg }
    })
    const pass = pairs.every((p) => p.pass)
    results.push({ themeId, mode, pass, pairs })
  }
}

const allPass = results.every((r) => r.pass)
const auditedAt = new Date().toISOString().slice(0, 10)

const file = `/** Generated by scripts/contrast-audit.mjs — do not edit manually */
export const contrastAuditMeta = {
  auditedAt: "${auditedAt}",
  standard: "WCAG 2.1 AA (4.5:1 normal text)",
  allThemesPass: ${allPass},
} as const

export const contrastAuditResults = ${JSON.stringify(results, null, 2)} as const

export type ContrastAuditEntry = (typeof contrastAuditResults)[number]
`

fs.writeFileSync(outFile, file)
console.log(`Wrote ${outFile}`)
console.log(`All themes pass AA: ${allPass}`)
if (!allPass) {
  for (const r of results.filter((x) => !x.pass)) {
    console.log(`FAIL ${r.themeId} ${r.mode}:`)
    for (const p of r.pairs.filter((x) => !x.pass)) {
      console.log(`  ${p.label}: ${p.ratio}:1`)
    }
  }
  process.exitCode = 1
}
