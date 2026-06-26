"use client"

import * as React from "react"

import Link from "next/link"

import { motion } from "framer-motion"

import { useMotionPreset } from "@/hooks/use-motion-preset"
import { pickDefined } from "@/lib/optional-props"
import { cn } from "@/lib/utils"

type MotionLinkProps = React.ComponentProps<typeof Link> & {
  underline?: boolean
}

export function MotionLink({
  className,
  children,
  underline = true,
  ...props
}: MotionLinkProps) {
  const { transition, reducedMotion } = useMotionPreset()

  if (reducedMotion || !underline) {
    return (
      <Link className={className} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <Link className={cn("group relative inline-flex", className)} {...props}>
      {children}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -bottom-0.5 left-0 h-px w-full origin-left bg-current opacity-70"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={transition()}
      />
    </Link>
  )
}

export function MotionIcon({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const { iconHover, transition, reducedMotion } = useMotionPreset()

  return (
    <motion.span
      className={cn("inline-flex", className)}
      {...pickDefined({ whileHover: reducedMotion ? undefined : iconHover })}
      transition={transition()}
    >
      {children}
    </motion.span>
  )
}
