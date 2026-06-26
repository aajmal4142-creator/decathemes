import { LazyDemoPage } from "@/components/demo/demo-page-loader"
import type { DemoPageId } from "@/components/demo/preview-registry"
import { ScopedTheme } from "@/components/showcase/scoped-theme"
import { isValidThemeId } from "@/themes/_registry"

export function EmbeddedDemoPage({
  pageId,
  themeId,
}: {
  pageId: DemoPageId
  themeId?: string
}) {
  const inner = (
    <div className="min-h-0 bg-background">
      <LazyDemoPage pageId={pageId} />
    </div>
  )

  if (themeId && isValidThemeId(themeId)) {
    return (
      <ScopedTheme themeId={themeId} className="min-h-0 bg-background">
        {inner}
      </ScopedTheme>
    )
  }

  return inner
}
