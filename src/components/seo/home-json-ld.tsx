import { homePageJsonLd } from "@/lib/structured-data"

export function HomeJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageJsonLd()) }}
    />
  )
}
