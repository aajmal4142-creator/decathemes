import { codecanyonLicenses } from "@/lib/pricing"
import { siteConfig } from "@/lib/site-config"

function parsePriceUsd(price: string): number {
  return Number(price.replace(/[^0-9.]/g, ""))
}

export function homePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    description: siteConfig.description,
    url: siteConfig.url,
    offers: [
      {
        "@type": "Offer",
        name: codecanyonLicenses.regular.name,
        price: parsePriceUsd(codecanyonLicenses.regular.price),
        priceCurrency: "USD",
        url: siteConfig.purchaseUrl,
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: codecanyonLicenses.extended.name,
        price: parsePriceUsd(codecanyonLicenses.extended.price),
        priceCurrency: "USD",
        url: siteConfig.purchaseUrl,
        availability: "https://schema.org/InStock",
      },
    ],
  }
}
