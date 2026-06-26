import { demoPages } from "@/components/demo/preview-registry"
import { getAllDocPages } from "@/docs/registry"
import { siteConfig } from "@/lib/site-config"

import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url

  const marketingRoutes = [
    "",
    "/preview",
    "/components",
    "/blocks",
    "/theme-builder",
    "/accessibility",
  ]

  const previewRoutes = demoPages.map((page) => page.path)

  const docRoutes = getAllDocPages().map((page) => `/docs/${page.slug}`)

  const allPaths = [...marketingRoutes, ...previewRoutes, ...docRoutes]

  return allPaths.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : ("monthly" as const),
    priority: path === "" ? 1 : path.startsWith("/docs") ? 0.7 : 0.8,
  }))
}
