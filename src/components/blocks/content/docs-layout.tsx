"use client"

import * as React from "react"

import { ChevronRightIcon } from "lucide-react"

import {
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Input,
  ScrollArea,
  Separator,
} from "@/components/ui"
import { cn } from "@/lib/utils"

const docSections = [
  {
    title: "Getting started",
    items: [
      { id: "introduction", label: "Introduction", active: true },
      { id: "installation", label: "Installation" },
      { id: "project-structure", label: "Project structure" },
    ],
  },
  {
    title: "Theming",
    items: [
      { id: "theme-tokens", label: "Theme tokens" },
      { id: "dark-mode", label: "Dark mode" },
      { id: "custom-themes", label: "Custom themes" },
    ],
  },
  {
    title: "Components",
    items: [
      { id: "ui-primitives", label: "UI primitives" },
      { id: "blocks", label: "Blocks" },
      { id: "forms", label: "Forms" },
    ],
  },
]

const tocItems = [
  { id: "overview", label: "Overview", level: 2 },
  { id: "requirements", label: "Requirements", level: 2 },
  { id: "quick-start", label: "Quick start", level: 2 },
  { id: "install-deps", label: "Install dependencies", level: 3 },
  { id: "configure-theme", label: "Configure your theme", level: 3 },
  { id: "next-steps", label: "Next steps", level: 2 },
]

function DocBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Docs</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Getting started</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Introduction</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

function DocContent() {
  return (
    <div className="min-w-0 space-y-theme-8">
      <header className="space-y-theme-3">
        <Badge variant="outline">Getting started</Badge>
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          Introduction
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          Decathemes is a collection of production-ready UI themes for Next.js and
          shadcn/ui. This guide walks through installation, theming, and composing
          blocks into full pages.
        </p>
      </header>

      <section id="overview" className="space-y-theme-3 scroll-mt-24">
        <h2 className="font-heading text-xl font-semibold tracking-tight">Overview</h2>
        <p className="text-muted-foreground leading-relaxed">
          Each theme ships as a self-contained token set scoped under{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
            data-theme
          </code>
          . UI primitives read from CSS variables, so switching themes restyles your
          entire product without touching component code.
        </p>
      </section>

      <section id="requirements" className="space-y-theme-3 scroll-mt-24">
        <h2 className="font-heading text-xl font-semibold tracking-tight">
          Requirements
        </h2>
        <ul className="list-inside list-disc space-y-theme-2 text-muted-foreground">
          <li>Next.js 16 or later</li>
          <li>React 19</li>
          <li>Tailwind CSS v4</li>
          <li>Node.js 20+</li>
        </ul>
      </section>

      <section id="quick-start" className="space-y-theme-4 scroll-mt-24">
        <h2 className="font-heading text-xl font-semibold tracking-tight">
          Quick start
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Clone the starter, install dependencies, and wrap your app with the theme
          provider. You can preview all ten themes in the component gallery.
        </p>

        <div id="install-deps" className="space-y-theme-2 scroll-mt-24">
          <h3 className="text-base font-medium">Install dependencies</h3>
          <pre className="overflow-x-auto rounded-lg border bg-muted/50 p-theme-4 font-mono text-sm">
            npm install
          </pre>
        </div>

        <div id="configure-theme" className="space-y-theme-2 scroll-mt-24">
          <h3 className="text-base font-medium">Configure your theme</h3>
          <pre className="overflow-x-auto rounded-lg border bg-muted/50 p-theme-4 font-mono text-sm">
            {`<html data-theme="minimal">`}
          </pre>
        </div>
      </section>

      <section id="next-steps" className="space-y-theme-3 scroll-mt-24">
        <h2 className="font-heading text-xl font-semibold tracking-tight">
          Next steps
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Explore the component gallery, copy blocks into your pages, and customize
          tokens in{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
            src/themes/
          </code>
          .
        </p>
        <div className="flex flex-wrap gap-theme-3">
          <Button>Component gallery</Button>
          <Button variant="outline">Theme reference</Button>
        </div>
      </section>
    </div>
  )
}

function SidebarNav({ className }: { className?: string }) {
  return (
    <nav className={cn("space-y-theme-6", className)} aria-label="Documentation">
      <div className="relative">
        <Input placeholder="Search docs…" className="pr-9" />
      </div>
      {docSections.map((section) => (
        <div key={section.title} className="space-y-theme-2">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {section.title}
          </p>
          <ul className="space-y-1">
            {section.items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={cn(
                    "block rounded-md px-theme-2 py-1.5 text-sm transition-colors",
                    item.active
                      ? "bg-accent font-medium text-accent-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}

function MobileSidebar() {
  const [openSection, setOpenSection] = React.useState<string | null>("Getting started")

  return (
    <div className="space-y-theme-2 lg:hidden">
      {docSections.map((section) => (
        <Collapsible
          key={section.title}
          open={openSection === section.title}
          onOpenChange={(open) => setOpenSection(open ? section.title : null)}
        >
          <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md border px-theme-3 py-theme-2 text-sm font-medium">
            {section.title}
            <ChevronRightIcon
              className={cn(
                "size-4 transition-transform",
                openSection === section.title && "rotate-90"
              )}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="px-theme-2 pt-theme-2">
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={cn(
                      "block rounded-md px-theme-2 py-1.5 text-sm",
                      item.active
                        ? "bg-accent font-medium text-accent-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  )
}

function TableOfContents({ className }: { className?: string }) {
  const [active, setActive] = React.useState("overview")

  return (
    <nav className={cn("space-y-theme-3", className)} aria-label="Table of contents">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        On this page
      </p>
      <ul className="space-y-1 border-l text-sm">
        {tocItems.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={() => setActive(item.id)}
              className={cn(
                "block border-l-2 py-1 transition-colors",
                item.level === 3 ? "pl-6" : "pl-4",
                active === item.id
                  ? "border-primary font-medium text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function DocsLayoutSidebar({ className }: { className?: string }) {
  return (
    <div className={cn("w-full", className)}>
      <div className="border-b bg-muted/30 px-theme-6 py-theme-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-theme-4">
          <span className="font-heading text-sm font-semibold">Decathemes Docs</span>
          <Badge variant="secondary">v1.0</Badge>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-theme-8 p-theme-6 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-theme-8">
            <ScrollArea className="h-[calc(100vh-8rem)]">
              <SidebarNav />
            </ScrollArea>
          </div>
        </aside>

        <main className="min-w-0 space-y-theme-6">
          <MobileSidebar />
          <DocBreadcrumb />
          <Separator />
          <DocContent />
        </main>
      </div>
    </div>
  )
}

export function DocsLayoutToc({ className }: { className?: string }) {
  return (
    <div className={cn("w-full", className)}>
      <div className="border-b bg-muted/30 px-theme-6 py-theme-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-theme-4">
          <span className="font-heading text-sm font-semibold">Decathemes Docs</span>
          <Badge variant="secondary">v1.0</Badge>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-theme-8 p-theme-6 xl:grid-cols-[200px_1fr_200px]">
        <aside className="hidden xl:block">
          <div className="sticky top-theme-8">
            <SidebarNav />
          </div>
        </aside>

        <main className="min-w-0 space-y-theme-6">
          <MobileSidebar />
          <DocBreadcrumb />
          <Separator />
          <DocContent />
        </main>

        <aside className="hidden lg:block">
          <div className="sticky top-theme-8">
            <TableOfContents />
          </div>
        </aside>
      </div>
    </div>
  )
}
