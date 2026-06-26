import { redirect } from "next/navigation"

import { defaultDocSlug } from "@/docs/registry"

export default function DocsIndexPage() {
  redirect(`/docs/${defaultDocSlug}`)
}
