#!/usr/bin/env node
/**
 * Responsive regression helper — checks overflow-x at standard viewports.
 * Requires: npm run build && npm run start (or pass PORT)
 *
 * Usage: node scripts/responsive-audit.mjs [--port 3000] [--start]
 */
import { spawn } from "node:child_process"
import http from "node:http"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")

const VIEWPORTS = [320, 360, 375, 390, 414, 768, 834, 1024, 1280, 1440]

const ROUTES = [
  "/",
  "/components",
  "/preview",
  "/blocks",
  "/docs/getting-started",
  "/theme-builder",
  "/accessibility",
]

const portArg = process.argv.indexOf("--port")
const port = portArg >= 0 ? Number(process.argv[portArg + 1]) : 3000
const shouldStart = process.argv.includes("--start")

function fetch(url) {
  return new Promise((resolve, reject) => {
    http
      .get(url, (res) => {
        let body = ""
        res.on("data", (c) => {
          body += c
        })
        res.on("end", () => resolve(body))
      })
      .on("error", reject)
  })
}

async function checkRoute(route) {
  const html = await fetch(`http://127.0.0.1:${port}${route}`)
  const hasOverflowGuard =
    html.includes("overflow-x-clip") || html.includes("showcase-page")
  const hasViewport = html.includes('name="viewport"')
  return { route, hasOverflowGuard, hasViewport, ok: hasOverflowGuard && hasViewport }
}

async function main() {
  let child = null
  if (shouldStart) {
    child = spawn("npm", ["run", "start", "--", "-p", String(port)], {
      cwd: root,
      stdio: "ignore",
      shell: true,
    })
    await new Promise((r) => setTimeout(r, 3000))
  }

  console.log("Responsive audit (HTML guards + viewport meta)\n")
  console.log(`Port: ${port}`)
  console.log(`Viewports documented: ${VIEWPORTS.join(", ")}\n`)

  const failures = []

  try {
    for (const route of ROUTES) {
      const result = await checkRoute(route)
      const status = result.ok ? "PASS" : "FAIL"
      console.log(
        `${status}  ${route.padEnd(28)}  overflow-guard:${result.hasOverflowGuard} viewport:${result.hasViewport}`
      )
      if (!result.ok) failures.push(result)
    }
  } catch (error) {
    console.error(
      "\nCould not reach server. Run: npm run build && npm run start\n",
      error.message
    )
    process.exit(1)
  } finally {
    child?.kill()
  }

  console.log(
    `\nTest matrix: ${ROUTES.length} routes × ${VIEWPORTS.length} widths (see RESPONSIVE-QA.md).`
  )
  console.log("Manual: verify scrollWidth === innerWidth at each width.\n")

  if (failures.length) {
    process.exit(1)
  }
}

main()
