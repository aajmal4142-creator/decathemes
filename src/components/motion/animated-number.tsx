"use client"

import * as React from "react"

import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion"

import { useMotionPreset } from "@/hooks/use-motion-preset"
import { formatStatValue, parseStatValue, type ParsedStatValue } from "@/lib/motion"
import { cn } from "@/lib/utils"

export function AnimatedNumber({
  value,
  className,
  duration,
}: {
  value: string
  className?: string
  duration?: number
}) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const { preset, reducedMotion } = useMotionPreset()
  const parsed = React.useMemo(() => parseStatValue(value), [value])

  if (!parsed) {
    return <span className={className}>{value}</span>
  }

  if (reducedMotion) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    )
  }

  return (
    <AnimatedNumberInner
      ref={ref}
      parsed={parsed}
      inView={inView}
      duration={duration ?? Math.max(preset.durationSlow * 2.5, 0.6)}
      {...(className !== undefined ? { className } : {})}
    />
  )
}

const AnimatedNumberInner = React.forwardRef<
  HTMLSpanElement,
  {
    parsed: ParsedStatValue
    className?: string
    inView: boolean
    duration: number
  }
>(function AnimatedNumberInner({ parsed, className, inView, duration }, ref) {
  const count = useMotionValue(0)
  const display = useTransform(count, (latest) => formatStatValue(latest, parsed))

  React.useEffect(() => {
    if (!inView) return

    const controls = animate(count, parsed.value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    })

    return () => controls.stop()
  }, [inView, parsed.value, count, duration])

  return (
    <motion.span ref={ref} className={cn("tabular-nums", className)}>
      {display}
    </motion.span>
  )
})
