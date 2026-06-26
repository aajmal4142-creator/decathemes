"use client"

import { CheckIcon, CodeIcon, CopyIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"
import { cn } from "@/lib/utils"

export function CodePeek({
  title,
  description,
  code,
  className,
}: {
  title: string
  description?: string
  code: string
  className?: string
}) {
  const { copied, copy } = useCopyToClipboard({
    successDescription: "Paste into your component file.",
  })

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn("gap-1.5 text-muted-foreground", className)}
        >
          <CodeIcon className="size-3.5" />
          View code
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {description ? <SheetDescription>{description}</SheetDescription> : null}
        </SheetHeader>
        <div className="relative mt-4 overflow-hidden rounded-lg border bg-muted/40">
          <Button
            variant="secondary"
            size="icon-sm"
            className="absolute top-2 right-2 z-10"
            onClick={() => void copy(code)}
            aria-label="Copy code"
          >
            {copied ? (
              <CheckIcon className="size-3.5" />
            ) : (
              <CopyIcon className="size-3.5" />
            )}
          </Button>
          <pre className="max-h-[70vh] overflow-auto p-4 font-mono text-xs leading-relaxed text-foreground">
            <code>{code.trim()}</code>
          </pre>
        </div>
      </SheetContent>
    </Sheet>
  )
}
