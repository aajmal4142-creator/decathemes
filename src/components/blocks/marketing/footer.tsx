import Link from "next/link"

import { Layers } from "lucide-react"

import { Separator } from "@/components/ui/separator"

const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Themes", href: "#themes" },
    { label: "Changelog", href: "#changelog" },
  ],
  company: [
    { label: "About", href: "#about" },
    { label: "Blog", href: "#blog" },
    { label: "Careers", href: "#careers" },
    { label: "Contact", href: "#contact" },
  ],
  legal: [
    { label: "Privacy", href: "#privacy" },
    { label: "Terms", href: "#terms" },
    { label: "License", href: "#license" },
  ],
}

function FooterSimple() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-foreground"
          >
            <Layers className="size-5 text-primary" aria-hidden="true" />
            DecaThemes
          </Link>
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap justify-center gap-6">
              {[
                ...footerLinks.product.slice(0, 2),
                ...footerLinks.company.slice(0, 2),
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <Separator className="my-8" />
        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} DecaThemes. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

const footerColumns = [
  { title: "Product", links: footerLinks.product },
  { title: "Company", links: footerLinks.company },
  { title: "Legal", links: footerLinks.legal },
]

function FooterColumns() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-2 font-semibold text-foreground"
            >
              <Layers className="size-6 text-primary" aria-hidden="true" />
              DecaThemes
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              The design system platform for teams who ship fast. Beautiful themes,
              accessible components, zero compromise.
            </p>
          </div>
          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={`${column.title} links`}>
              <h3 className="text-sm font-semibold text-foreground">{column.title}</h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <Separator className="my-12" />
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} DecaThemes, Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#twitter"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Twitter
            </a>
            <a
              href="#github"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              GitHub
            </a>
            <a
              href="#discord"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Discord
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { FooterSimple, FooterColumns }
