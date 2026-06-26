/**
 * View Transitions API helpers for theme and color-mode switches.
 * Falls back to instant updates when reduced-motion is on or API is unavailable.
 */

export interface TransitionOrigin {
  x: number
  y: number
}

/** Click position for circular wipe origin; viewport center when no event. */
export function getTransitionOriginFromEvent(event?: {
  clientX: number
  clientY: number
}): TransitionOrigin {
  if (event && "clientX" in event) {
    return { x: event.clientX, y: event.clientY }
  }

  if (typeof window !== "undefined") {
    return { x: window.innerWidth / 2, y: window.innerHeight / 2 }
  }

  return { x: 0, y: 0 }
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export function supportsViewTransitions(): boolean {
  if (typeof document === "undefined") return false
  return typeof document.startViewTransition === "function"
}

export function setTransitionOrigin(origin: TransitionOrigin): void {
  const root = document.documentElement
  // CSS in globals.css reads these for the circular reveal mask
  root.style.setProperty("--theme-transition-x", `${origin.x}px`)
  root.style.setProperty("--theme-transition-y", `${origin.y}px`)
}

/**
 * Run a DOM/state update inside a View Transition when supported.
 * @param update - synchronous state change (e.g. setThemeId, setTheme)
 * @param origin - wipe center in viewport pixels
 */
export function runThemeViewTransition(
  update: () => void,
  origin?: TransitionOrigin
): void {
  if (typeof document === "undefined") {
    update()
    return
  }

  if (prefersReducedMotion() || !supportsViewTransitions()) {
    update()
    return
  }

  setTransitionOrigin(origin ?? getTransitionOriginFromEvent())

  const root = document.documentElement
  root.classList.add("theme-view-transition")

  const transition = document.startViewTransition(() => {
    update()
  })

  void transition.finished.finally(() => {
    root.classList.remove("theme-view-transition")
  })
}
