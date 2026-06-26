import {
  BuildingIcon,
  CalendarIcon,
  MailIcon,
  MapPinIcon,
  PencilIcon,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getAvatarGradientStyle } from "@/lib/demo/avatars"

const profile = {
  name: "Alex Morgan",
  email: "alex@decathemes.com",
  role: "Product Designer",
  company: "DecaThemes",
  location: "San Francisco, CA",
  joined: "March 2024",
  bio: "Building beautiful, token-driven interfaces for modern SaaS products.",
}

function ProfilePageSimple() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center gap-theme-6 text-center">
      <Avatar size="lg" className="size-20">
        <AvatarFallback
          className="text-lg font-semibold text-white"
          style={getAvatarGradientStyle(profile.name)}
        >
          AM
        </AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">{profile.name}</h1>
        <p className="text-sm text-muted-foreground">{profile.role}</p>
        <Badge variant="secondary">{profile.company}</Badge>
      </div>
      <p className="text-sm text-muted-foreground">{profile.bio}</p>
      <div className="flex gap-theme-2">
        <Button size="sm">
          <PencilIcon />
          Edit profile
        </Button>
        <Button size="sm" variant="outline">
          <MailIcon />
          Message
        </Button>
      </div>
    </div>
  )
}

function ProfilePageDetailed() {
  return (
    <div className="flex flex-col gap-theme-6">
      <div className="flex flex-col gap-theme-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-theme-4">
          <Avatar size="lg" className="size-16">
            <AvatarFallback
              className="font-semibold text-white"
              style={getAvatarGradientStyle(profile.name)}
            >
              AM
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{profile.name}</h1>
            <p className="text-sm text-muted-foreground">{profile.role}</p>
            <div className="mt-2 flex flex-wrap gap-theme-2">
              <Badge variant="secondary">{profile.company}</Badge>
              <Badge variant="outline">Pro plan</Badge>
            </div>
          </div>
        </div>
        <Button size="sm">
          <PencilIcon />
          Edit profile
        </Button>
      </div>

      <div className="grid gap-theme-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
            <CardDescription>Personal and professional details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-theme-3 text-sm">
            <p className="text-muted-foreground">{profile.bio}</p>
            <Separator />
            <div className="flex items-center gap-2 text-muted-foreground">
              <BuildingIcon className="size-4 shrink-0" />
              <span>{profile.company}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPinIcon className="size-4 shrink-0" />
              <span>{profile.location}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <CalendarIcon className="size-4 shrink-0" />
              <span>Joined {profile.joined}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact</CardTitle>
            <CardDescription>How to reach this user</CardDescription>
          </CardHeader>
          <CardContent className="space-y-theme-3 text-sm">
            <div className="flex items-center gap-2">
              <MailIcon className="size-4 shrink-0 text-muted-foreground" />
              <span>{profile.email}</span>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-theme-4">
              <div>
                <p className="text-muted-foreground">Projects</p>
                <p className="text-lg font-semibold">12</p>
              </div>
              <div>
                <p className="text-muted-foreground">Teams</p>
                <p className="text-lg font-semibold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export { ProfilePageSimple, ProfilePageDetailed }
