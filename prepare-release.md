# Prepare release ZIP for CodeCanyon

Follow these steps to create the upload package Envato expects.

---

## 1. Pre-flight

```bash
npm ci
npm run typecheck
npm run lint
npm run build
```

Fix all errors before zipping. Version in `package.json` must match `CHANGELOG.md`.

---

## 2. Files to INCLUDE

```
decathemes/
├── src/                    # Full source
├── public/                 # Static assets, favicons
├── docs-buyer/             # Required offline documentation
├── marketing/              # Listing copy (optional for buyer, useful for you)
├── README.md
├── CHANGELOG.md
├── LICENSE-NOTES.md
├── THIRD-PARTY-NOTICES.md
├── CHECKLIST.md
├── ARCHITECTURE.md
├── prepare-release.md
├── package.json
├── package-lock.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
├── components.json
├── .env.example
├── .prettierrc
└── .prettierignore
```

---

## 3. Files to EXCLUDE

Never include in the buyer ZIP:

| Path            | Reason                                   |
| --------------- | ---------------------------------------- |
| `node_modules/` | Buyer runs `npm install`                 |
| `.next/`        | Build output                             |
| `.env.local`    | Secrets                                  |
| `.git/`         | Optional — buyers don't need VCS history |
| `*.log`         | Noise                                    |
| `.cursor/`      | IDE                                      |
| `coverage/`     | Test artifacts                           |

---

## 4. Create the ZIP

### macOS / Linux

```bash
# From parent directory of project
zip -r decathemes-v1.0.0.zip decathemes \
  -x "decathemes/node_modules/*" \
  -x "decathemes/.next/*" \
  -x "decathemes/.git/*" \
  -x "decathemes/.env.local" \
  -x "decathemes/.env" \
  -x "*/.DS_Store"
```

### Windows (PowerShell)

```powershell
# Use 7-Zip or Compress-Archive after manually excluding node_modules and .next
```

### Verify ZIP contents

```bash
unzip -l decathemes-v1.0.0.zip | head -50
# Confirm docs-buyer/Documentation.md and Documentation.html exist
# Confirm no node_modules entries
```

---

## 5. Deploy live demo separately

CodeCanyon live preview is a **URL**, not the ZIP:

1. Deploy repo to Vercel/Netlify
2. Set env vars from `.env.example`
3. Use `https://your-domain.com` as preview URL
4. After item is approved, set `NEXT_PUBLIC_PURCHASE_URL` to item page

---

## 6. Upload to CodeCanyon

1. **Files** → upload `decathemes-v1.0.0.zip`
2. **Live preview** → production URL
3. **Description** → paste from `marketing/item-description.md`
4. **Tags** → from `marketing/tags.txt`
5. **Images** → per `marketing/screenshots/README.md`
6. **Message to reviewer** → mention Node 20+, `npm install && npm run build`, docs in `docs-buyer/`

---

## 7. Version bumps (v1.0.1+)

1. Update `CHANGELOG.md`
2. Bump `package.json` version
3. Rebuild ZIP with new filename: `decathemes-v1.0.1.zip`
4. Upload as new version on CodeCanyon
