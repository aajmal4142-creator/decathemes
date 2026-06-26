import * as React from "react"

import { toast } from "sonner"

import { COPY_RESET_MS } from "@/lib/constants"

export interface UseCopyToClipboardOptions {
  successMessage?: string
  successDescription?: string
  errorMessage?: string
  resetMs?: number
}

/**
 * Copy text to the clipboard with toast feedback.
 *
 * @example
 * ```tsx
 * const { copied, copy } = useCopyToClipboard({ successMessage: "Code copied" })
 * <Button onClick={() => copy(source)}>{copied ? "Copied" : "Copy"}</Button>
 * ```
 */
export function useCopyToClipboard(options: UseCopyToClipboardOptions = {}) {
  const {
    successMessage = "Copied to clipboard",
    successDescription,
    errorMessage = "Could not copy",
    resetMs = COPY_RESET_MS,
  } = options

  const [copied, setCopied] = React.useState(false)

  const copy = React.useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text.trim())
        setCopied(true)
        toast.success(successMessage, {
          ...(successDescription !== undefined
            ? { description: successDescription }
            : {}),
        })
        window.setTimeout(() => setCopied(false), resetMs)
        return true
      } catch {
        toast.error(errorMessage)
        return false
      }
    },
    [successMessage, successDescription, errorMessage, resetMs]
  )

  return { copied, copy }
}
