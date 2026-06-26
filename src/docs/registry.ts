import { AddingThemePage, addingThemeToc } from "@/docs/pages/adding-a-theme"
import { BlocksPage, blocksToc } from "@/docs/pages/blocks"
import { ComponentsPage, componentsToc } from "@/docs/pages/components"
import { CustomizationPage, customizationToc } from "@/docs/pages/customization"
import { DeploymentPage, deploymentToc } from "@/docs/pages/deployment"
import { FaqPage, faqToc } from "@/docs/pages/faq"
import { GettingStartedPage, gettingStartedToc } from "@/docs/pages/getting-started"
import { ThemingPage, themingToc } from "@/docs/pages/theming"
import type { DocPageMeta, DocTocItem } from "@/docs/types"

export interface DocNavGroup {
  title: string
  items: { slug: string; title: string }[]
}

export interface DocPageEntry extends DocPageMeta {
  Content: () => React.JSX.Element
}

export const docPages: Record<string, DocPageEntry> = {
  "getting-started": {
    slug: "getting-started",
    title: "Getting started",
    description: "Install, run, and understand the project structure.",
    section: "Introduction",
    keywords: ["install", "setup", "structure", "npm", "dev"],
    toc: gettingStartedToc,
    Content: GettingStartedPage,
  },
  theming: {
    slug: "theming",
    title: "Theming guide",
    description: "How data-theme works, token reference, and editing themes.",
    section: "Theming",
    keywords: ["data-theme", "tokens", "css", "dark mode", "colors"],
    toc: themingToc,
    Content: ThemingPage,
  },
  "adding-a-theme": {
    slug: "adding-a-theme",
    title: "Adding a new theme",
    description: "Step-by-step guide and copy-paste template for new themes.",
    section: "Theming",
    keywords: ["new theme", "template", "registry", "tokens.css"],
    toc: addingThemeToc,
    Content: AddingThemePage,
  },
  components: {
    slug: "components",
    title: "Using components",
    description: "Import patterns, gallery, forms, and adding shadcn primitives.",
    section: "Development",
    keywords: ["shadcn", "ui", "gallery", "import", "form"],
    toc: componentsToc,
    Content: ComponentsPage,
  },
  blocks: {
    slug: "blocks",
    title: "Using blocks",
    description: "Copy, customize, and compose page sections.",
    section: "Development",
    keywords: ["blocks", "copy", "hero", "pricing", "sections"],
    toc: blocksToc,
    Content: BlocksPage,
  },
  customization: {
    slug: "customization",
    title: "Customization",
    description: "Fonts, radius, colors, dark mode, and runtime tweaks.",
    section: "Development",
    keywords: ["fonts", "radius", "tweaks", "customize"],
    toc: customizationToc,
    Content: CustomizationPage,
  },
  deployment: {
    slug: "deployment",
    title: "Deployment",
    description: "Vercel, Netlify, self-hosting, and reviewer URLs.",
    section: "Shipping",
    keywords: ["vercel", "netlify", "docker", "production", "build"],
    toc: deploymentToc,
    Content: DeploymentPage,
  },
  faq: {
    slug: "faq",
    title: "FAQ & troubleshooting",
    description: "Common issues, fixes, and licensing questions.",
    section: "Support",
    keywords: ["faq", "error", "fix", "license", "hydration"],
    toc: faqToc,
    Content: FaqPage,
  },
}

export const docNavGroups: DocNavGroup[] = [
  {
    title: "Introduction",
    items: [{ slug: "getting-started", title: "Getting started" }],
  },
  {
    title: "Theming",
    items: [
      { slug: "theming", title: "Theming guide" },
      { slug: "adding-a-theme", title: "Adding a new theme" },
    ],
  },
  {
    title: "Development",
    items: [
      { slug: "components", title: "Using components" },
      { slug: "blocks", title: "Using blocks" },
      { slug: "customization", title: "Customization" },
    ],
  },
  {
    title: "Shipping",
    items: [{ slug: "deployment", title: "Deployment" }],
  },
  {
    title: "Support",
    items: [{ slug: "faq", title: "FAQ & troubleshooting" }],
  },
]

export const defaultDocSlug = "getting-started"

export function getDocPage(slug: string): DocPageEntry | undefined {
  return docPages[slug]
}

export function getAllDocPages(): DocPageEntry[] {
  return Object.values(docPages)
}

export function getDocToc(slug: string): DocTocItem[] {
  return docPages[slug]?.toc ?? []
}
