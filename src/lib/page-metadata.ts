import { siteConfig } from "@/lib/site-config"

import type { Metadata } from "next"

export const ogImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${siteConfig.name} — ${siteConfig.tagline}`,
} as const

export function absoluteUrl(path = "/"): string {
  const base = siteConfig.url
  if (path === "/" || path === "") return base
  return `${base}${path.startsWith("/") ? path : `/${path}`}`
}

export function pageMetadata({
  title,
  description,
  path = "/",
  openGraphTitle,
  openGraphDescription,
}: {
  title?: string
  description?: string
  path?: string
  openGraphTitle?: string
  openGraphDescription?: string
}): Metadata {
  const url = absoluteUrl(path)
  const resolvedOgTitle = openGraphTitle ?? title
  const resolvedOgDescription = openGraphDescription ?? description

  return {
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: siteConfig.name,
      url,
      ...(resolvedOgTitle ? { title: resolvedOgTitle } : {}),
      ...(resolvedOgDescription ? { description: resolvedOgDescription } : {}),
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      ...(resolvedOgTitle ? { title: resolvedOgTitle } : {}),
      ...(resolvedOgDescription ? { description: resolvedOgDescription } : {}),
      images: [ogImage.url],
    },
  }
}
