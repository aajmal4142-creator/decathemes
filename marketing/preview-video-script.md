# Preview video / GIF — script & recording guide

**Target length:** 15–30 seconds  
**Goal:** Show theme-switch magic → breadth of product → purchase CTA  
**Formats:** MP4 (preferred for CodeCanyon) or high-quality GIF (≤15MB)

Save exports to `marketing/screenshots/export/preview-video.mp4`.

---

## Storyboard (25s version)

| Time      | Visual                                                        | Audio / text overlay (optional) |
| --------- | ------------------------------------------------------------- | ------------------------------- |
| 0:00–0:03 | Homepage `/` — hero mini-app visible, themes auto-cycling     | “One attribute. Ten products.”  |
| 0:03–0:04 | Hard cut or continue — **Minimal** theme label visible        | —                               |
| 0:04–0:06 | Circular view-transition wipe → **Brutalist**                 | “Not a color swap.”             |
| 0:06–0:08 | Wipe → **Glass**                                              | —                               |
| 0:08–0:10 | Wipe → **Playful** (radius + font obvious)                    | “Fonts. Radius. Shadows.”       |
| 0:10–0:12 | Wipe → **Luxury** or **Editorial**                            | —                               |
| 0:12–0:16 | Navigate to `/components` — scroll past 2–3 staged components | “50+ components”                |
| 0:16–0:19 | Quick flash: `/blocks` — one full-width block + copy toast    | “62 blocks”                     |
| 0:19–0:22 | `/capture/theme-identity-grid` OR pre-exported 2×5 still zoom | “10 distinct identities”        |
| 0:22–0:25 | Scroll homepage to **Buy now** / pricing — cursor hover CTA   | “Decathemes on CodeCanyon”      |

**15s cut:** Hero (3s) → 3 theme wipes (6s) → components flash (3s) → Buy now (3s).

---

## Exact recording steps

### Before you record

1. **Production build:** `npm run build && npm run start` (smooth fonts, no dev overlay)
2. **Window:** Chrome **1440×900**, 100% zoom, bookmarks bar hidden
3. **Clean state:** Incognito or clear `localStorage` theme key; start on **Minimal**
4. **Disable distractions:** DND on OS, close other tabs, mute notifications
5. **Homepage:** On `/`, toggle **“Surprise me” / auto-cycle OFF** for controlled switches (or leave ON for first 3s only)

### Tools

| Tool                      | Notes                                                                |
| ------------------------- | -------------------------------------------------------------------- |
| **OBS Studio** (free)     | Display capture 1440×900, 30fps, MP4 H.264                           |
| **ScreenFlow / Camtasia** | Easier trimming and text overlays                                    |
| **Chrome DevTools**       | Optional — throttle CPU only if simulating buyer laptop              |
| **ffmpeg**                | Trim + compress: `ffmpeg -i raw.mp4 -t 25 -crf 23 preview-video.mp4` |

### Shot-by-shot

#### 1. Hero open (0:00–0:03)

- Navigate to `http://localhost:3000/` (or production URL)
- Let mini-app render; if auto-cycle is on, wait one full cycle
- **Do not scroll** — headline + live demo in frame

#### 2. Theme switches with circular reveal (0:03–0:12)

**Option A — Homepage hero (best for “wow”)**

- Click theme in floating dock OR use ⌘K palette
- Click **center of demo frame** so view-transition origin looks intentional
- Switch in order: **Minimal → Brutalist → Glass → Playful → Luxury**
- Pause **~1.5s** on each theme after animation completes (~0.55s)

**Option B — Preview hub**

- Go to `/preview/dashboard`
- Use top bar theme dropdown; same 5 themes, same click-center technique

#### 3. Component gallery flash (0:12–0:16)

- `Cmd+L` → `/components`
- Slow scroll through **Forms** or **Data** section (~1 card per second)
- Optional: toggle **Compare themes** for 1s

#### 4. Blocks flash (0:16–0:19)

- `/blocks` → scroll to one **full-width** marketing block
- Click **Copy block** — let Sonner toast appear (~1s)

#### 5. Identity grid (0:19–0:22)

- Open `/capture/theme-identity-grid`
- Hold **2–3s** (or use exported PNG with Ken Burns zoom in editor)

#### 6. Buy now (0:22–0:25)

- `/` → scroll to `#pricing` OR click nav **Buy now**
- Hover **Buy Extended** / **Buy now** — end frame on CTA

### Post-production

- Trim dead air at start/end
- Optional: subtle lowercase captions (max 6 words per card)
- Export **1920×1080** or **1440×900**, **24–30fps**, under **20MB**
- Generate GIF if needed: `ffmpeg -i preview-video.mp4 -vf "fps=12,scale=1280:-1" preview-video.gif`

### Upload

- CodeCanyon **Preview** slot (video URL or MP4 upload per Envato UI)
- Homepage `ThemeSwitchMedia` — drop file at `/public/marketing/theme-switch-demo.mp4`

---

## GIF-specific notes

- Keep to **12–15fps** and **1280px** wide to control file size
- Loop point: hero auto-cycle mid-wipe (hard) OR fade to black on Buy now (easier)
- Record MP4 first, convert to GIF — do not record GIF directly

---

## Checklist

- [ ] Circular wipe visible at least **3 times**
- [ ] **Brutalist vs Playful** contrast obvious in video
- [ ] No mouse jitter — use slow deliberate moves
- [ ] No personal URLs/passwords in frame
- [ ] Final frame is **Buy now** or pricing
- [ ] Length **15–30s**
