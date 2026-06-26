"use client"

import { useState } from "react"

import Link from "next/link"

import { Menu, X, Layers } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#docs" },
  { label: "Blog", href: "#blog" },
]

function NavbarSimple() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-foreground"
        >
          <Layers className="size-6 text-primary" aria-hidden="true" />
          <span>DecaThemes</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" size="sm" asChild>
            <a href="#login">Log in</a>
          </Button>
          <Button size="sm" asChild>
            <a href="#signup">Sign up</a>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-xs">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <Layers className="size-5 text-primary" aria-hidden="true" />
                DecaThemes
              </SheetTitle>
            </SheetHeader>
            <nav className="mt-8 flex flex-col gap-4" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-base font-medium text-foreground"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
                <Button variant="outline" asChild>
                  <a href="#login">Log in</a>
                </Button>
                <Button asChild>
                  <a href="#signup">Sign up</a>
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}

function NavbarWithCta() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 font-semibold text-foreground"
        >
          <Layers className="size-6 text-primary" aria-hidden="true" />
          <span>DecaThemes</span>
        </Link>

        <ul className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <Button variant="ghost" size="sm" asChild>
            <a href="#login">Log in</a>
          </Button>
          <Button size="sm" asChild>
            <a href="#demo">Book a demo</a>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label="Open menu"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-xs">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <nav className="mt-8 flex flex-col gap-4" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-base font-medium"
                >
                  {link.label}
                </a>
              ))}
              <Button className="mt-4" asChild>
                <a href="#demo" onClick={() => setOpen(false)}>
                  Book a demo
                </a>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}

export { NavbarSimple, NavbarWithCta }
