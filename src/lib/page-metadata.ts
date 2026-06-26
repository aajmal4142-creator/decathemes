import { siteConfig } from "@/lib/site-config"

import type { Metadata } from "next"

export function absoluteUrl(path = "/"): string {
  const base = siteConfig.url
  if (path === "/" || path === "") return base
  return `${base}${path.startsWith("/") ? path : `/${path}`}`
}

export function pageMetadata({
  title,
  description,
  path = "/",
}: {
  title?: string
  description?: string
  path?: string
}): Metadata {
  const url = absoluteUrl(path)

  return {
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    alternates: {
      canonical: url,
    },
    openGraph: {
      url,
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
    },
  }
}
