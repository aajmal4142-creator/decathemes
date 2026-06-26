"use client"

import { themes } from "@/themes/_registry"

const CAPTURE_PAGE = "dashboard"
const IFRAME_HEIGHT = 360

/**
 * Renders a 2×5 grid of iframes — same `/preview/dashboard` page, one theme per cell.
 * Open `/capture/theme-identity-grid` at 1440px+ width and screenshot for CodeCanyon.
 */
export function ThemeIdentityGridCapture() {
  return (
    <div className="min-h-screen bg-neutral-950 p-6 text-white">
      <div className="mx-auto max-w-[1320px] space-y-4">
        <header className="space-y-1 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-400">
            Screenshot capture — crop title bar out for listing
          </p>
          <h1 className="text-lg font-semibold tracking-tight">
            Same page · 10 distinct identities
          </h1>
          <p className="text-xs text-neutral-400">
            /preview/{CAPTURE_PAGE} · light mode · 1440px viewport recommended
          </p>
        </header>

        <div className="grid grid-cols-2 gap-3">
          {themes.map((theme) => (
            <figure
              key={theme.id}
              className="overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900"
            >
              <figcaption className="flex items-center justify-between gap-2 border-b border-neutral-800 px-3 py-2">
                <span className="text-sm font-medium">{theme.name}</span>
                <span className="font-mono text-[10px] text-neutral-500">
                  data-theme=&quot;{theme.id}&quot;
                </span>
              </figcaption>
              <iframe
                title={`${theme.name} — ${CAPTURE_PAGE} demo`}
                src={`/preview/${CAPTURE_PAGE}?embedded=1&theme=${theme.id}`}
                className="w-full border-0 bg-background"
                style={{ height: IFRAME_HEIGHT }}
                loading="eager"
              />
            </figure>
          ))}
        </div>
      </div>
    </div>
  )
}
