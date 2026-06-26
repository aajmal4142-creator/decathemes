import {
  Chakra_Petch,
  Cormorant_Garamond,
  Fraunces,
  IBM_Plex_Sans,
  Nunito,
  Orbitron,
  Playfair_Display,
  Poppins,
  Quicksand,
  Righteous,
  Source_Serif_4,
  Space_Grotesk,
} from "next/font/google"

import { jetbrainsMono } from "@/lib/fonts-core"
import { themes } from "@/themes/_registry"

type ThemeId = (typeof themes)[number]["id"]

/**
 * Theme-specific faces — imported only by DeferredFontFaces so they load
 * after first paint instead of blocking the critical path.
 */
export const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  preload: false,
})

export const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
})

export const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  display: "swap",
  preload: false,
})

export const chakraPetch = Chakra_Petch({
  variable: "--font-chakra-petch",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
})

export const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  preload: false,
})

export const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  preload: false,
})

export const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
  preload: false,
})

export const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
})

export const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  display: "swap",
  preload: false,
})

export const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
  preload: false,
})

export const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
})

export const righteous = Righteous({
  variable: "--font-righteous",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  preload: false,
})

/** CSS variable classes applied to <html> when a theme is active */
export const themeFontVariableClasses: Record<ThemeId, string> = {
  minimal: "",
  brutalist: `${spaceGrotesk.variable} ${jetbrainsMono.variable}`,
  glass: "",
  neon: `${orbitron.variable} ${chakraPetch.variable}`,
  corporate: ibmPlexSans.variable,
  editorial: `${sourceSerif.variable} ${fraunces.variable} ${playfairDisplay.variable} ${jetbrainsMono.variable}`,
  playful: `${quicksand.variable} ${poppins.variable}`,
  luxury: cormorant.variable,
  retro: `${nunito.variable} ${righteous.variable}`,
  organic: `${nunito.variable} ${fraunces.variable}`,
}
