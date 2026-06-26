# Hooks (`src/hooks/`)

Client-side React hooks shared across showcase, marketing, and demo routes.

| Hook                            | Purpose                                                   |
| ------------------------------- | --------------------------------------------------------- |
| `useMounted`                    | Gate browser-only UI until after hydration                |
| `useMediaQuery` / `useIsMobile` | Responsive layout switches (SSR-safe)                     |
| `useLocalStorage`               | Typed `localStorage` state with JSON serialize            |
| `useCopyToClipboard`            | Clipboard write + Sonner toast feedback                   |
| `useTransitionThemeClass`       | Adds `transition-theme` on `<html>` during theme chrome   |
| `useShowcaseCatalog`            | Filter, jump palette, and scroll for blocks/gallery pages |
| `useMotionPreset`               | Framer Motion variants derived from active theme          |
| `useToast`                      | Radix toast state (shadcn)                                |

## Theme hooks

Theme **id**, **tweaks**, and **auto-cycle** live in `theme-provider.tsx` (not here):

- `useThemeId()` — `{ themeId, setThemeId, themes }`
- `useActiveThemeId()` — theme id string only (minimal re-renders)
- `useThemeTweaks()` — radius/font overrides
- `useThemeAutoCycle()` — marketing hero auto-cycle
- `useDecathemes()` — full API (prefer granular hooks in hot paths)

## Adding a hook

1. Create `use-your-hook.ts` with a `useYourHook` export and JSDoc.
2. Keep hooks focused — one responsibility per file.
3. Guard `window` / `localStorage` for SSR; use `useMounted` when the **rendered output** must differ after hydration.
4. Re-export from this README table if the hook is buyer-facing.
