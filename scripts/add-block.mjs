#!/usr/bin/env node
/**
 * Decathemes block helper — prints copy-paste import snippet for a block.
 *
 * Usage:
 *   node scripts/add-block.mjs <BlockName>
 *   node scripts/add-block.mjs HeroCentered
 *   npm run add-block -- PricingThreeTier
 *
 * Lists all blocks when run without arguments.
 */

import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, "..")

const registryPath = join(root, "src/components/blocks/_registry.ts")
const registry = readFileSync(registryPath, "utf8")

const entryRegex =
  /componentKey:\s*"([^"]+)"[\s\S]*?importPath:\s*"([^"]+)"/g

const blocks = []
let match
while ((match = entryRegex.exec(registry)) !== null) {
  blocks.push({ key: match[1], importPath: match[2] })
}

const arg = process.argv[2]

if (!arg) {
  console.log("\nDecathemes — available blocks\n")
  console.log("Usage: npm run add-block -- <ComponentName>\n")
  const byPath = new Map()
  for (const b of blocks) {
    const list = byPath.get(b.importPath) ?? []
    list.push(b.key)
    byPath.set(b.importPath, list)
  }
  for (const [path, keys] of byPath) {
    console.log(`  ${path}`)
    for (const k of keys) console.log(`    · ${k}`)
    console.log()
  }
  process.exit(0)
}

const found = blocks.find(
  (b) => b.key.toLowerCase() === arg.toLowerCase()
)

if (!found) {
  console.error(`\nBlock not found: ${arg}`)
  console.error("Run without arguments to list all blocks.\n")
  process.exit(1)
}

const snippet = `import { ${found.key} } from "${found.importPath}"

export default function Page() {
  return <${found.key} />
}
`

console.log("\n✓ Copy into your page:\n")
console.log(snippet)
