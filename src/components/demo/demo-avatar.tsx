"use client"

import * as React from "react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { getAvatarGradientStyle, getInitials } from "@/lib/demo/avatars"
import { pickDefined } from "@/lib/optional-props"
import { cn } from "@/lib/utils"

export function DemoAvatar({
  name,
  className,
  size,
}: {
  name: string
  className?: string
  size?: "sm" | "default" | "lg"
}) {
  const initials = getInitials(name)
  const style = getAvatarGradientStyle(name)

  return (
    <Avatar {...pickDefined({ size, className })}>
      <AvatarFallback
        className={cn("text-[0.65rem] font-semibold text-white")}
        style={style}
      >
        {initials}
      </AvatarFallback>
    </Avatar>
  )
}
