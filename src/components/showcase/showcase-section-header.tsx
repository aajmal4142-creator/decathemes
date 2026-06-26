import { PageHeader } from "@/components/layout/page-header"
import { pickDefined } from "@/lib/optional-props"

export function ShowcaseSectionHeader({
  eyebrow,
  title,
  description,
  count,
  countLabel = "items",
  className,
}: {
  eyebrow?: string
  title: string
  description?: string
  count?: number
  countLabel?: string
  className?: string
}) {
  return (
    <PageHeader
      variant="showcase"
      title={title}
      countLabel={countLabel}
      {...pickDefined({ eyebrow, description, count, className })}
    />
  )
}
