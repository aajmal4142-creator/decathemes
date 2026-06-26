/**
 * Build props objects that satisfy `exactOptionalPropertyTypes`.
 * Omits keys whose values are `undefined` instead of passing `undefined` explicitly.
 */
export type DefinedProps<T extends Record<string, unknown>> = {
  [K in keyof T as T[K] extends undefined ? never : K]: Exclude<T[K], undefined>
}

export function pickDefined<T extends Record<string, unknown>>(
  props: T
): DefinedProps<T> {
  const result = {} as DefinedProps<T>
  for (const key of Object.keys(props) as (keyof T)[]) {
    const value = props[key]
    if (value !== undefined) {
      ;(result as Record<string, unknown>)[key as string] = value
    }
  }
  return result
}

/** Returns the first element or a fallback when index access may be undefined. */
export function atOr<T>(items: readonly T[], index: number, fallback: T): T {
  return items[index] ?? fallback
}

/** First item in a non-empty list (throws if empty). */
export function firstOrThrow<T>(items: readonly T[], message: string): T {
  const first = items[0]
  if (first === undefined) {
    throw new Error(message)
  }
  return first
}
