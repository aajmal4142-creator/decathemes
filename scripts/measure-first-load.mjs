#!/usr/bin/env node
/**
 * Measure transferred JS for routes by fetching HTML and summing linked chunk sizes.
 * Usage: npm run build && node scripts/measure-first-load.mjs --serve
 */
import { spawn } from "node:child_process"
import fs from "node:fs"
import http from "node:http"
import path from "node:path"
import zlib from "node:zlib"

const root = path.resolve(import.meta.dirname, "..")
const nextDir = path.join(root, ".next")
const serve = process.argv.includes("--serve")

function gzSize(abs) {
  if (!fs.existsSync(abs)) return 0
  return zlib.gzipSync(fs.readFileSync(abs)).length
}

function readJson(rel) {
  const file = path.join(nextDir, rel)
  if (!fs.existsSync(file)) return null
  return JSON.parse(fs.readFileSync(file, "utf8"))
}

function manifestEstimate() {
  const buildManifest = readJson("build-manifest.json")
  if (!buildManifest) {
    console.error("Run npm run build first.")
    process.exit(1)
  }

  const shared = [
    ...buildManifest.polyfillFiles,
    ...buildManifest.rootMainFiles,
  ]

  const routes = [
    { label: "/", appPath: "page" },
    { label: "/components", appPath: "components/page" },
    { label: "/preview", appPath: "preview/page" },
    { label: "/docs/getting-started", appPath: "docs/[slug]/page" },
  ]

  function routeChunks(appPath) {
    const lazyManifest = readJson(`server/app/${appPath}/react-loadable-manifest.json`)
    const chunks = new Set(shared)
    if (lazyManifest) {
      for (const entry of Object.values(lazyManifest)) {
        for (const file of entry.files ?? []) {
          if (file.endsWith(".js")) chunks.add(file)
        }
      }
    }
    return [...chunks]
  }

  console.log(
    "Manifest estimate (all lazy siblings — upper bound, not true first paint)\n"
  )
  console.log(
    `Shared framework: ${Math.round(shared.reduce((s, f) => s + gzSize(path.join(nextDir, f)), 0) / 1024)} KB\n`
  )

  for (const route of routes) {
    const chunks = routeChunks(route.appPath)
    const total = chunks.reduce((sum, file) => sum + gzSize(path.join(nextDir, file)), 0)
    const routeOnly =
      total - shared.reduce((sum, file) => sum + gzSize(path.join(nextDir, file)), 0)
    console.log(
      `${route.label.padEnd(24)} ${String(Math.round(total / 1024)).padStart(4)} KB  (+${Math.round(routeOnly / 1024)} KB lazy siblings)`
    )
  }
}

async function fetchRoute(port, routePath) {
  const html = await new Promise((resolve, reject) => {
    http
      .get(`http://127.0.0.1:${port}${routePath}`, (res) => {
        let body = ""
        res.on("data", (chunk) => {
          body += chunk
        })
        res.on("end", () => resolve(body))
      })
      .on("error", reject)
  })

  const scripts = new Set()
  const re = /\/_next\/static\/chunks\/[^"'\s)]+\.js/g
  for (const match of html.matchAll(re)) {
    scripts.add(match[0].replace(/^\/_next\//, ""))
  }
  return [...scripts]
}

async function serveMeasure() {
  const port = 3459
  const child = spawn("npm", ["run", "start", "--", "-p", String(port)], {
    cwd: root,
    stdio: "ignore",
    shell: true,
  })

  await new Promise((resolve) => setTimeout(resolve, 2500))

  const routes = ["/", "/components", "/preview", "/docs/getting-started"]
  console.log("\nHTML-linked chunks (closer to first-load JS):\n")

  try {
    for (const route of routes) {
      const scripts = await fetchRoute(port, route)
      const total = scripts.reduce(
        (sum, rel) => sum + gzSize(path.join(nextDir, rel)),
        0
      )
      console.log(
        `${route.padEnd(24)} ${String(Math.round(total / 1024)).padStart(4)} KB  (${scripts.length} scripts)`
      )
    }
  } finally {
    child.kill()
  }
}

manifestEstimate()

if (serve) {
  await serveMeasure()
}

const chunkDir = path.join(nextDir, "static/chunks")
if (fs.existsSync(chunkDir)) {
  const top = fs
    .readdirSync(chunkDir)
    .filter((f) => f.endsWith(".js"))
    .map((f) => ({
      file: f,
      gz: gzSize(path.join(chunkDir, f)),
      raw: fs.statSync(path.join(chunkDir, f)).size,
    }))
    .sort((a, b) => b.gz - a.gz)
    .slice(0, 12)

  console.log("\nHeaviest chunks (gzip):")
  for (const { file, gz, raw } of top) {
    console.log(
      `  ${String(Math.round(gz / 1024)).padStart(4)} KB  ${file}  (raw ${Math.round(raw / 1024)} KB)`
    )
  }
}
