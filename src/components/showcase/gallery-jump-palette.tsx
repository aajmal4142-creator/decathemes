"use client"

import {
  galleryCategoryMeta,
  galleryEntries,
  type GalleryCategory,
} from "@/components/showcase/gallery-registry"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Popover, PopoverContent } from "@/components/ui/popover"

const galleryCategories = (Object.keys(galleryCategoryMeta) as GalleryCategory[]).map(
  (id) => ({ id, ...galleryCategoryMeta[id] })
)

export function GalleryJumpPalette({
  open,
  onOpenChange,
  onJump,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onJump: (id: string) => void
}) {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverContent className="w-[min(100vw-2rem,24rem)] p-0" align="end">
        <Command>
          <CommandInput placeholder="Jump to component…" />
          <CommandList>
            <CommandEmpty>No component found.</CommandEmpty>
            {galleryCategories.map((category) => (
              <CommandGroup key={category.id} heading={category.label}>
                {galleryEntries
                  .filter((e) => e.category === category.id)
                  .map((entry) => (
                    <CommandItem
                      key={entry.id}
                      value={`${entry.name} ${entry.id}`}
                      onSelect={() => onJump(entry.id)}
                    >
                      {entry.name}
                    </CommandItem>
                  ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
