import { Inter, JetBrains_Mono } from "next/font/google"

/** Always loaded — universal fallback for first paint */
export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

export const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

export const coreFontVariables = [inter.variable, jetbrainsMono.variable].join(" ")
