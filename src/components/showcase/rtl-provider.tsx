"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

import { DirectionProvider } from "@/components/ui/direction"
import { applyRtl, getStoredRtl, setStoredRtl } from "@/lib/rtl"

interface RtlContextValue {
  rtl: boolean
  setRtl: (rtl: boolean) => void
  toggleRtl: () => void
}

const RtlContext = createContext<RtlContextValue | null>(null)

export function RtlProvider({ children }: { children: React.ReactNode }) {
  const [rtl, setRtlState] = useState(false)

  useEffect(() => {
    setRtlState(getStoredRtl())
  }, [])

  useEffect(() => {
    applyRtl(rtl)
    setStoredRtl(rtl)
  }, [rtl])

  const setRtl = useCallback((value: boolean) => {
    setRtlState(value)
  }, [])

  const toggleRtl = useCallback(() => {
    setRtlState((prev) => !prev)
  }, [])

  const value = useMemo(() => ({ rtl, setRtl, toggleRtl }), [rtl, setRtl, toggleRtl])

  return (
    <RtlContext.Provider value={value}>
      <DirectionProvider dir={rtl ? "rtl" : "ltr"}>{children}</DirectionProvider>
    </RtlContext.Provider>
  )
}

export function useRtl() {
  const context = useContext(RtlContext)
  if (!context) {
    throw new Error("useRtl must be used within RtlProvider")
  }
  return context
}
