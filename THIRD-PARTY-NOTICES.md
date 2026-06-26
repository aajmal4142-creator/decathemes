# Third-party notices

Decathemes bundles and depends on the following open-source software.  
Retain this file in your project and in CodeCanyon releases.

---

## UI framework & components

| Package                                                                     | License    | Notes                                             |
| --------------------------------------------------------------------------- | ---------- | ------------------------------------------------- |
| [Next.js](https://nextjs.org)                                               | MIT        | App framework                                     |
| [React](https://react.dev)                                                  | MIT        | UI library                                        |
| [shadcn/ui](https://ui.shadcn.com)                                          | MIT        | Component source copied into `src/components/ui/` |
| [Radix UI](https://radix-ui.com)                                            | MIT        | Primitives via shadcn                             |
| [Tailwind CSS](https://tailwindcss.com)                                     | MIT        | Styling                                           |
| [class-variance-authority](https://github.com/joe-bell/cva)                 | Apache-2.0 | Variant utilities                                 |
| [clsx](https://github.com/lukeed/clsx)                                      | MIT        | Class names                                       |
| [tailwind-merge](https://github.com/dcastil/tailwind-merge)                 | MIT        | Tailwind class merge                              |
| [Lucide React](https://lucide.dev)                                          | ISC        | Icons                                             |
| [cmdk](https://github.com/pacocoursey/cmdk)                                 | MIT        | Command palette                                   |
| [Vaul](https://github.com/emilkowalski/vaul)                                | MIT        | Drawer                                            |
| [Embla Carousel](https://www.embla-carousel.com)                            | MIT        | Carousel                                          |
| [Recharts](https://recharts.org)                                            | MIT        | Charts                                            |
| [@tanstack/react-table](https://tanstack.com/table)                         | MIT        | Data tables                                       |
| [react-hook-form](https://react-hook-form.com)                              | MIT        | Forms                                             |
| [zod](https://zod.dev)                                                      | MIT        | Validation                                        |
| [date-fns](https://date-fns.org)                                            | MIT        | Dates                                             |
| [framer-motion](https://www.framer.com/motion)                              | MIT        | Animation                                         |
| [next-themes](https://github.com/pacocoursey/next-themes)                   | MIT        | Color mode                                        |
| [Sonner](https://sonner.emilkowal.ski)                                      | MIT        | Toasts                                            |
| [react-day-picker](https://daypicker.dev)                                   | MIT        | Calendar                                          |
| [input-otp](https://github.com/guilhermerodz/input-otp)                     | MIT        | OTP input                                         |
| [react-resizable-panels](https://github.com/bvaughn/react-resizable-panels) | MIT        | Resizable layouts                                 |

---

## Fonts (Google Fonts — SIL Open Font License 1.1)

Loaded via `next/font/google` in `src/lib/fonts.ts`:

Inter, JetBrains Mono, Space Grotesk, IBM Plex Mono, Outfit, Orbitron, Share Tech Mono, DM Sans, Lora, Source Serif 4, Nunito, Fredoka, Cormorant Garamond, Montserrat, Righteous, Quicksand

- **License:** [SIL Open Font License 1.1](https://openfontlicense.org)
- **Attribution:** Not required for OFL fonts in web apps; include this notice for compliance best practice
- **Restriction:** Do not sell the font files standalone

---

## Images & placeholders

**Bundled in the ZIP:** No stock photos or third-party image files are included in demo pages.

| Approach                      | Location                                                         | License                                                                                                                                                   |
| ----------------------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CSS/SVG mesh placeholders     | `src/components/demo/demo-media.tsx`, commerce/blog blocks       | Original — no attribution required                                                                                                                        |
| Initials avatars              | `src/components/demo/demo-avatar.tsx`, `src/lib/demo/avatars.ts` | Original — deterministic OKLCH gradients                                                                                                                  |
| Optional Unsplash Source URLs | `src/lib/demo/images.ts` (`getOptionalUnsplashUrl`)              | **Not used by default.** If you enable remote images, [Unsplash License](https://unsplash.com/license) applies — attribution appreciated but not required |

**Buyer swap:** Set `NEXT_PUBLIC_DEMO_UNSPLASH=1` (or wire `getOptionalUnsplashUrl` into `next/image`) to load remote photos. Example queries are documented in `unsplashExamples` inside `src/lib/demo/images.ts`.

**Removed:** Demo pages no longer reference `github.com/shadcn.png` or other external avatar URLs.

---

## Envato / Decathemes

The Decathemes product source (themes, blocks, demos, documentation) is **not** open source. It is licensed via Envato Market. See [LICENSE-NOTES.md](LICENSE-NOTES.md).
