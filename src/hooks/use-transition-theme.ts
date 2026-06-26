import * as React from "react"

const TRANSITION_CLASS = "transition-theme"

/** Adds `transition-theme` on `<html>` for smooth token transitions (theme switcher chrome). */
export function useTransitionThemeClass(): void {
  React.useEffect(() => {
    document.documentElement.classList.add(TRANSITION_CLASS)
    return () => document.documentElement.classList.remove(TRANSITION_CLASS)
  }, [])
}
