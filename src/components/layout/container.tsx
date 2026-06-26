import * as React from "react"

import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/** Responsive max-width + horizontal gutters. Use `size="marketing"` on landing pages. */
const containerVariants = cva("mx-auto w-full min-w-0", {
  variants: {
    size: {
      marketing: "max-w-6xl section-px",
      block: "max-w-7xl px-4 sm:px-6 lg:px-8",
      content: "max-w-3xl section-px",
      showcase: "max-w-[100rem] px-4 sm:px-6 lg:px-8",
      prose: "max-w-2xl section-px",
      full: "section-px",
    },
  },
  defaultVariants: {
    size: "marketing",
  },
})

export interface ContainerProps
  extends React.ComponentProps<"div">, VariantProps<typeof containerVariants> {}

export function Container({ className, size, ...props }: ContainerProps) {
  return (
    <div
      data-slot="container"
      className={cn(containerVariants({ size }), className)}
      {...props}
    />
  )
}

export { containerVariants }
