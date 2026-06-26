"use client"

import { FileTextIcon } from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { getAllDocPages } from "@/docs/registry"

export function DocsCommandDialog({
  open,
  onOpenChange,
  onNavigate,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onNavigate: (slug: string) => void
}) {
  const pages = getAllDocPages()

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange} title="Search documentation">
      <CommandInput placeholder="Search pages and topics…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Documentation">
          {pages.map((page) => (
            <CommandItem
              key={page.slug}
              value={`${page.title} ${page.description} ${page.keywords?.join(" ") ?? ""}`}
              onSelect={() => {
                onNavigate(page.slug)
                onOpenChange(false)
              }}
            >
              <FileTextIcon className="size-4 text-muted-foreground" />
              <div className="min-w-0">
                <p className="truncate font-medium">{page.title}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {page.description}
                </p>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
