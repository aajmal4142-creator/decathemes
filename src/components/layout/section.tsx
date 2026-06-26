"use client"

/**
 * Page section with fluid vertical spacing, optional `Container`, and optional scroll reveal.
 *
 * @example
 * ```tsx
 * <Section id="features" background="muted" containerSize="marketing">
 *   <h2>Features</h2>
 * </Section>
 * ```
 */
import * as React from "react"

import { cva, type VariantProps } from "class-variance-authority"

import { Container, type ContainerProps } from "@/components/layout/container"
import { Reveal } from "@/components/motion/reveal"
import { cn } from "@/lib/utils"

const sectionVariants = cva("", {
  variants: {
    spacing: {
      default: "section-py",
      compact: "section-py-sm",
      none: "",
      hero: "py-12 sm:py-20 lg:py-24",
    },
    border: {
      none: "",
      top: "border-t",
      bottom: "border-b",
      y: "border-y",
    },
    background: {
      none: "",
      muted: "bg-muted/20",
      card: "bg-card",
    },
  },
  defaultVariants: {
    spacing: "default",
    border: "none",
    background: "none",
  },
})

export interface SectionProps
  extends React.ComponentProps<"section">, VariantProps<typeof sectionVariants> {
  id?: string
  containerSize?: ContainerProps["size"]
  containerClassName?: string
  reveal?: boolean
  revealDelay?: number
}

export function Section({
  className,
  spacing,
  border,
  background,
  id,
  containerSize,
  containerClassName,
  reveal = false,
  revealDelay = 0,
  children,
  ...props
}: SectionProps) {
  const inner = containerSize ? (
    <Container size={containerSize} className={containerClassName}>
      {children}
    </Container>
  ) : (
    children
  )

  const body = reveal ? <Reveal delay={revealDelay}>{inner}</Reveal> : inner

  return (
    <section
      id={id}
      data-slot="section"
      className={cn(sectionVariants({ spacing, border, background }), className)}
      {...props}
    >
      {body}
    </section>
  )
}

export { sectionVariants }
