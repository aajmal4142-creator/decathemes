"use client"

import * as React from "react"

import {
  ForgotPasswordCard,
  LoginWithSocial,
  OtpVerifyCard,
  SignupWithTerms,
  TwoColumnAuthImage,
} from "@/components/blocks/block-exports"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const authScreens = [
  { id: "login", label: "Login" },
  { id: "signup", label: "Signup" },
  { id: "forgot", label: "Forgot password" },
  { id: "otp", label: "OTP verify" },
  { id: "split", label: "Two-column" },
] as const

type AuthScreen = (typeof authScreens)[number]["id"]

export function AuthDemoPage() {
  const [screen, setScreen] = React.useState<AuthScreen>("login")

  return (
    <div className="flex min-h-[640px] flex-col bg-muted/30">
      <div className="border-b bg-background px-4 py-3">
        <nav
          className="mx-auto flex max-w-3xl flex-wrap gap-2"
          aria-label="Auth flow screens"
        >
          {authScreens.map((item) => (
            <Button
              key={item.id}
              size="sm"
              variant={screen === item.id ? "default" : "outline"}
              onClick={() => setScreen(item.id)}
              className={cn(screen === item.id && "shadow-sm")}
            >
              {item.label}
            </Button>
          ))}
        </nav>
      </div>
      <div className="flex flex-1 items-center justify-center p-4 sm:p-8">
        {screen === "login" ? <LoginWithSocial /> : null}
        {screen === "signup" ? <SignupWithTerms /> : null}
        {screen === "forgot" ? <ForgotPasswordCard /> : null}
        {screen === "otp" ? <OtpVerifyCard /> : null}
        {screen === "split" ? (
          <div className="w-full max-w-5xl">
            <TwoColumnAuthImage />
          </div>
        ) : null}
      </div>
    </div>
  )
}
