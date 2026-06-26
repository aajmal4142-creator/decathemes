"use client"

import * as React from "react"

import { CheckIcon, CopyIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"
import { cn } from "@/lib/utils"

export function CopyCodeButton({
  code,
  className,
  label = "Copy code",
  successMessage = "Copied to clipboard",
  successDescription = "Paste into your project — all theme tokens apply automatically.",
}: {
  code: string
  className?: string
  label?: string
  successMessage?: string
  successDescription?: string
}) {
  const { copied, copy } = useCopyToClipboard({
    successMessage,
    successDescription,
  })

  return (
    <Button
      variant="outline"
      size="sm"
      className={cn(
        "gap-1.5 transition-all",
        copied && "border-primary/40 bg-primary/5 text-primary",
        className
      )}
      onClick={() => void copy(code)}
    >
      {copied ? <CheckIcon className="size-3.5" /> : <CopyIcon className="size-3.5" />}
      {copied ? "Copied" : label}
    </Button>
  )
}
