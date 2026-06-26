"use client"

import * as React from "react"

import { AnimatePresence, motion } from "framer-motion"

import { Skeleton } from "@/components/ui/skeleton"
import { useMotionPreset } from "@/hooks/use-motion-preset"
import { cn } from "@/lib/utils"

export function ContentReveal({
  loading,
  children,
  skeleton,
  className,
}: {
  loading: boolean
  children: React.ReactNode
  skeleton?: React.ReactNode
  className?: string
}) {
  const { transition, reducedMotion } = useMotionPreset()

  if (reducedMotion) {
    return <div className={className}>{loading ? skeleton : children}</div>
  }

  return (
    <div className={cn("relative", className)}>
      <AnimatePresence mode="wait" initial={false}>
        {loading ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition()}
            aria-busy
            aria-live="polite"
          >
            {skeleton ?? <Skeleton className="h-24 w-full rounded-xl" />}
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={transition()}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function useSimulatedLoading(delayMs = 420) {
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), delayMs)
    return () => window.clearTimeout(timer)
  }, [delayMs])

  return loading
}
