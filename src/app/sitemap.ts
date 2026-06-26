import { getAllDocPages } from "@/docs/registry"
import { siteConfig } from "@/lib/site-config"

import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url

  const staticRoutes = [
    "",
    "/preview",
    "/components",
    "/blocks",
    "/docs",
    "/preview/landing",
    "/preview/dashboard",
    "/preview/auth",
    "/preview/settings",
    "/preview/store",
    "/preview/blog",
    "/preview/crm",
    "/preview/analytics",
    "/preview/ai-chat",
    "/theme-builder",
    "/accessibility",
  ]

  const docRoutes = getAllDocPages().map((page) => `/docs/${page.slug}`)

  return [...staticRoutes, ...docRoutes].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : ("monthly" as const),
    priority: path === "" ? 1 : path.startsWith("/docs") ? 0.7 : 0.8,
  }))
}
