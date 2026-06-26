import * as React from "react"

/**
 * Typed `localStorage` state. Initial render uses `initialValue` (SSR-safe);
 * hydrates from storage in `useEffect`.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const read = React.useCallback((): T => {
    if (typeof window === "undefined") return initialValue
    try {
      const raw = window.localStorage.getItem(key)
      if (raw === null) return initialValue
      return JSON.parse(raw) as T
    } catch {
      return initialValue
    }
  }, [key, initialValue])

  const [stored, setStored] = React.useState<T>(initialValue)

  // Hydrate from storage after mount — avoids SSR/client HTML mismatch
  React.useEffect(() => {
    setStored(read())
  }, [read])

  const setValue = React.useCallback(
    (value: T | ((prev: T) => T)) => {
      setStored((prev) => {
        const next = value instanceof Function ? value(prev) : value
        try {
          window.localStorage.setItem(key, JSON.stringify(next))
        } catch {
          /* quota / private mode */
        }
        return next
      })
    },
    [key]
  )

  return [stored, setValue]
}
