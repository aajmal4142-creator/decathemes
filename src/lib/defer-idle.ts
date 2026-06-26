/**
 * Defer non-critical work until idle or first user interaction.
 * @returns cleanup to cancel pending idle callback
 */
export function scheduleWhenReady(run: () => void): () => void {
  if (typeof window === "undefined") {
    return () => {}
  }

  let done = false
  const execute = () => {
    if (done) return
    done = true
    run()
  }

  const idle =
    typeof requestIdleCallback !== "undefined"
      ? requestIdleCallback
      : (cb: () => void) => window.setTimeout(cb, 1)

  const idleId = idle(execute)

  const onInteraction = () => execute()
  const events = ["pointerdown", "keydown", "scroll", "touchstart"] as const
  for (const event of events) {
    window.addEventListener(event, onInteraction, { once: true, passive: true })
  }

  return () => {
    if (typeof cancelIdleCallback !== "undefined" && typeof idleId === "number") {
      cancelIdleCallback(idleId)
    }
    for (const event of events) {
      window.removeEventListener(event, onInteraction)
    }
  }
}
