import { ImageResponse } from "next/og"

import { siteConfig } from "@/lib/site-config"
import { themes } from "@/themes/_registry"

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(145deg, #0a0a0a 0%, #171717 42%, #262626 100%)",
          padding: 52,
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: "#fafafa",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 700,
              color: "#171717",
            }}
          >
            D
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 52,
                fontWeight: 700,
                color: "#fafafa",
                letterSpacing: -1.5,
                lineHeight: 1.05,
              }}
            >
              {siteConfig.name}
            </div>
            <div style={{ fontSize: 24, color: "#a3a3a3", marginTop: 6 }}>
              {siteConfig.tagline}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 14,
            marginTop: 40,
          }}
        >
          {themes.map((theme) => (
            <div
              key={theme.id}
              style={{
                width: 204,
                height: 112,
                borderRadius: 16,
                background: theme.previewGradient,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: 14,
                border: "1px solid rgba(255,255,255,0.14)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
              }}
            >
              <div
                style={{
                  fontSize: 17,
                  fontWeight: 600,
                  color: "#ffffff",
                  textShadow: "0 1px 6px rgba(0,0,0,0.55)",
                }}
              >
                {theme.name}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: "auto",
            fontSize: 20,
            color: "#d4d4d4",
            letterSpacing: 0.2,
          }}
        >
          50+ components · 62 blocks · 9 demo pages · Next.js 16 + React 19
        </div>
      </div>
    ),
    { ...size }
  )
}
