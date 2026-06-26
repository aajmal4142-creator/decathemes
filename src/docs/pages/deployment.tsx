import {
  DocCallout,
  DocH1,
  DocH2,
  DocH3,
  DocInlineCode,
  DocOl,
  DocP,
  DocPre,
  DocUl,
} from "@/components/docs/doc-elements"
import { Badge } from "@/components/ui/badge"
import type { DocTocItem } from "@/docs/types"

export const deploymentToc: DocTocItem[] = [
  { id: "build", title: "Production build", level: 2 },
  { id: "vercel", title: "Deploy to Vercel", level: 2 },
  { id: "netlify", title: "Deploy to Netlify", level: 2 },
  { id: "self-host", title: "Self-hosting", level: 2 },
  { id: "env-vars", title: "Environment variables", level: 2 },
  { id: "demo-routes", title: "Demo routes for reviewers", level: 2 },
]

export function DeploymentPage() {
  return (
    <article className="space-y-8">
      <header className="space-y-4">
        <Badge variant="outline">Deployment</Badge>
        <DocH1>Deployment</DocH1>
        <DocP>
          Decathemes is a standard Next.js 16 application. Any platform that supports
          the App Router and Node.js 20+ can host it. No database or external services
          are required for the demo site.
        </DocP>
      </header>

      <section className="space-y-4">
        <DocH2 id="build">Production build</DocH2>
        <DocPre>{`npm run build
npm run start`}</DocPre>
        <DocP>
          The build outputs a standalone Next.js production bundle. Fix any TypeScript
          errors before deploying — <DocInlineCode>npm run build</DocInlineCode> runs
          type checking. Run <DocInlineCode>npm run lint</DocInlineCode> for ESLint.
        </DocP>
        <DocCallout variant="warning">
          Do not deploy with <DocInlineCode>next dev</DocInlineCode>. Always use a
          production build for CodeCanyon live preview URLs.
        </DocCallout>
      </section>

      <section className="space-y-4">
        <DocH2 id="vercel">Deploy to Vercel</DocH2>
        <DocOl>
          <li>Push the project to GitHub, GitLab, or Bitbucket</li>
          <li>Import the repo at vercel.com → New Project</li>
          <li>
            Framework preset: <strong>Next.js</strong> (auto-detected)
          </li>
          <li>
            Build command: <DocInlineCode>npm run build</DocInlineCode>
          </li>
          <li>Output: default (Next.js handles this)</li>
          <li>Deploy</li>
        </DocOl>
        <DocP>
          Set your production URL as the CodeCanyon live preview link (e.g.{" "}
          <DocInlineCode>https://decathemes.vercel.app</DocInlineCode>). Root{" "}
          <DocInlineCode>/</DocInlineCode> serves the marketing page;{" "}
          <DocInlineCode>/preview</DocInlineCode> is the interactive demo.
        </DocP>
      </section>

      <section className="space-y-4">
        <DocH2 id="netlify">Deploy to Netlify</DocH2>
        <DocP>Use Netlify&apos;s Next.js runtime (v5+):</DocP>
        <DocUl>
          <li>Connect your Git repository</li>
          <li>
            Build command: <DocInlineCode>npm run build</DocInlineCode>
          </li>
          <li>
            Publish directory: <DocInlineCode>.next</DocInlineCode> (use Netlify Next
            plugin — auto when framework is Next.js)
          </li>
          <li>
            Node version: 20 in <DocInlineCode>netlify.toml</DocInlineCode> or UI
          </li>
        </DocUl>
        <DocPre title="netlify.toml (optional)">{`[build]
  command = "npm run build"

[build.environment]
  NODE_VERSION = "20"`}</DocPre>
      </section>

      <section className="space-y-4">
        <DocH2 id="self-host">Self-hosting</DocH2>
        <DocP>Run on a VPS, Docker, or internal server:</DocP>
        <DocPre>{`npm ci
npm run build
NODE_ENV=production npm run start`}</DocPre>
        <DocP>
          Default port is 3000. Put Nginx or Caddy in front for TLS and reverse proxy to{" "}
          <DocInlineCode>localhost:3000</DocInlineCode>.
        </DocP>
        <DocH3 id="docker-hint">Docker (example)</DocH3>
        <DocPre>{`FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["npm", "run", "start"]`}</DocPre>
      </section>

      <section className="space-y-4">
        <DocH2 id="env-vars">Environment variables</DocH2>
        <DocP>
          The stock demo requires <strong>no</strong> environment variables. All theme
          and preference state is client-side (localStorage). If you add analytics or
          CMS integrations, use <DocInlineCode>.env.local</DocInlineCode> (never commit
          secrets).
        </DocP>
      </section>

      <section className="space-y-4">
        <DocH2 id="demo-routes">Demo routes for reviewers</DocH2>
        <DocP>Provide these URLs in your CodeCanyon item description:</DocP>
        <DocUl>
          <li>
            <DocInlineCode>/</DocInlineCode> — Product marketing homepage
          </li>
          <li>
            <DocInlineCode>/preview</DocInlineCode> — Live demo hub (6 pages, theme
            switcher)
          </li>
          <li>
            <DocInlineCode>/preview?theme=neon</DocInlineCode> — Deep link with theme
            preset
          </li>
          <li>
            <DocInlineCode>/components</DocInlineCode> — Component gallery
          </li>
          <li>
            <DocInlineCode>/blocks</DocInlineCode> — Block library
          </li>
          <li>
            <DocInlineCode>/docs</DocInlineCode> — Documentation
          </li>
        </DocUl>
      </section>
    </article>
  )
}
