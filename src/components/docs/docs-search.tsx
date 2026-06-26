"use client"

import * as React from "react"

import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"

import { SearchIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

const DocsCommandDialog = dynamic(
  () =>
    import("@/components/docs/docs-command-dialog").then((m) => ({
      default: m.DocsCommandDialog,
    })),
  { ssr: false }
)

export function DocsSearch() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setOpen((value) => !value)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="h-9 w-full justify-start gap-2 text-muted-foreground lg:w-56"
        onClick={() => setOpen(true)}
      >
        <SearchIcon className="size-4 shrink-0" />
        <span className="flex-1 text-left">Search docs…</span>
        <kbd className="hidden rounded border bg-muted px-1.5 font-mono text-[10px] sm:inline">
          ⌘K
        </kbd>
      </Button>

      {open ? (
        <DocsCommandDialog
          open={open}
          onOpenChange={setOpen}
          onNavigate={(slug) => router.push(`/docs/${slug}`)}
        />
      ) : null}
    </>
  )
}
