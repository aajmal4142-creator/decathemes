import type { DemoPageId } from "@/components/demo/preview-registry"
import { isValidThemeId } from "@/themes/_registry"

export function getPreviewUrl(options: { themeId?: string; page?: DemoPageId } = {}) {
  const page = options.page ?? "landing"
  const base = page === "landing" ? "/preview" : `/preview/${page}`
  const params = new URLSearchParams()

  if (options.themeId && isValidThemeId(options.themeId)) {
    params.set("theme", options.themeId)
  }

  const query = params.toString()
  return query ? `${base}?${query}` : base
}
