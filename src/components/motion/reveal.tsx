"use client"

import * as React from "react"

import { motion } from "framer-motion"

import { useMotionPreset } from "@/hooks/use-motion-preset"
import { REVEAL_VIEWPORT_MARGIN } from "@/lib/constants"

type RevealProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: "div" | "section" | "article"
  id?: string
}

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
  id,
}: RevealProps) {
  const { revealVariants, transition, reducedMotion } = useMotionPreset()
  const Comp =
    as === "section" ? motion.section : as === "article" ? motion.article : motion.div

  return (
    <Comp
      id={id}
      className={className}
      variants={revealVariants}
      initial={reducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: REVEAL_VIEWPORT_MARGIN }}
      transition={{ ...transition(), delay: reducedMotion ? 0 : delay }}
    >
      {children}
    </Comp>
  )
}

export function RevealStagger({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const { staggerVariants, transition, reducedMotion } = useMotionPreset()

  return (
    <motion.div
      className={className}
      variants={staggerVariants}
      initial={reducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: REVEAL_VIEWPORT_MARGIN }}
      transition={transition()}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const { revealVariants, transition } = useMotionPreset()

  return (
    <motion.div
      className={className}
      variants={revealVariants}
      transition={transition()}
    >
      {children}
    </motion.div>
  )
}
