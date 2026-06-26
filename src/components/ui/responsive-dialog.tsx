"use client"

import * as React from "react"

import { XIcon } from "lucide-react"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

/**
 * Modal shell — centered Dialog on md+, bottom Drawer (vaul) on small screens.
 * Use for CommandDialog and any mobile-first overlay pattern.
 */
function ResponsiveModal({ ...props }: React.ComponentProps<typeof Dialog>) {
  const isMobile = useIsMobile()

  if (isMobile) {
    return <Drawer {...props} />
  }

  return <Dialog {...props} />
}

function ResponsiveModalTrigger({
  ...props
}: React.ComponentProps<typeof DialogTrigger>) {
  const isMobile = useIsMobile()

  if (isMobile) {
    return <DrawerTrigger {...props} />
  }

  return <DialogTrigger {...props} />
}

function ResponsiveModalClose({ ...props }: React.ComponentProps<typeof DialogClose>) {
  const isMobile = useIsMobile()

  if (isMobile) {
    return <DrawerClose {...props} />
  }

  return <DialogClose {...props} />
}

function ResponsiveModalContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogContent> & {
  showCloseButton?: boolean
}) {
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <DrawerContent
        className={cn(
          "max-h-[min(92vh,calc(100dvh-env(safe-area-inset-bottom)))] px-0 pb-[env(safe-area-inset-bottom)]",
          className
        )}
        {...(props as React.ComponentProps<typeof DrawerContent>)}
      >
        <div className="overflow-y-auto px-4 pb-4">{children}</div>
        {showCloseButton ? (
          <DrawerClose className="absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:outline-hidden">
            <XIcon className="size-4" />
            <span className="sr-only">Close</span>
          </DrawerClose>
        ) : null}
      </DrawerContent>
    )
  }

  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogContent className={className} showCloseButton={showCloseButton} {...props}>
        {children}
      </DialogContent>
    </DialogPortal>
  )
}

function ResponsiveModalHeader({
  className,
  ...props
}: React.ComponentProps<typeof DialogHeader>) {
  const isMobile = useIsMobile()

  if (isMobile) {
    return <DrawerHeader className={cn("text-left", className)} {...props} />
  }

  return <DialogHeader className={className} {...props} />
}

function ResponsiveModalFooter({
  className,
  ...props
}: React.ComponentProps<typeof DialogFooter>) {
  const isMobile = useIsMobile()

  if (isMobile) {
    return <DrawerFooter className={className} {...props} />
  }

  return <DialogFooter className={className} {...props} />
}

function ResponsiveModalTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogTitle>) {
  const isMobile = useIsMobile()

  if (isMobile) {
    return <DrawerTitle className={className} {...props} />
  }

  return <DialogTitle className={className} {...props} />
}

function ResponsiveModalDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogDescription>) {
  const isMobile = useIsMobile()

  if (isMobile) {
    return <DrawerDescription className={className} {...props} />
  }

  return <DialogDescription className={className} {...props} />
}

export {
  ResponsiveModal,
  ResponsiveModalClose,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
}
