"use client"

import * as React from "react"

import { motion, type HTMLMotionProps } from "framer-motion"

import { useMotionPreset } from "@/hooks/use-motion-preset"
import { pickDefined } from "@/lib/optional-props"
import { cn } from "@/lib/utils"

export function MotionCard({
  className,
  children,
  as = "div",
  ...props
}: HTMLMotionProps<"div"> & { as?: "div" | "article" | "section" }) {
  const { cardHover, transition, reducedMotion } = useMotionPreset()
  const Comp =
    as === "article" ? motion.article : as === "section" ? motion.section : motion.div

  return (
    <Comp
      data-slot="motion-card"
      className={cn(className)}
      {...pickDefined({ whileHover: reducedMotion ? undefined : cardHover })}
      transition={transition()}
      {...props}
    >
      {children}
    </Comp>
  )
}

export function withMotionCard<P extends { className?: string }>(
  Component: React.ComponentType<P>
) {
  return function MotionWrappedCard(props: P) {
    const { cardHover, transition } = useMotionPreset()

    return (
      <motion.div {...pickDefined({ whileHover: cardHover })} transition={transition()}>
        <Component {...props} />
      </motion.div>
    )
  }
}
