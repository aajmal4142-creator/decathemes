import * as React from "react"

/**
 * Returns `false` on the server and first client render, then `true` after mount.
 * Use when rendered output must differ from SSR (theme toggle, localStorage-backed UI).
 *
 * @example
 * ```tsx
 * const mounted = useMounted()
 * if (!mounted) return <Skeleton className="h-8 w-20" />
 * return <ThemeSwitcher />
 * ```
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  return mounted
}
