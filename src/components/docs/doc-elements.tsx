import Link from "next/link"

import { cn } from "@/lib/utils"

export function DocH1({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <h1
      className={cn(
        "font-heading text-3xl font-semibold tracking-tight sm:text-4xl",
        className
      )}
    >
      {children}
    </h1>
  )
}

export function DocH2({
  id,
  children,
  className,
}: {
  id: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <h2
      id={id}
      className={cn(
        "scroll-mt-28 font-heading text-xl font-semibold tracking-tight sm:text-2xl",
        className
      )}
    >
      {children}
    </h2>
  )
}

export function DocH3({
  id,
  children,
  className,
}: {
  id: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <h3
      id={id}
      className={cn(
        "scroll-mt-28 font-heading text-lg font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </h3>
  )
}

export function DocP({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p className={cn("leading-relaxed text-muted-foreground", className)}>{children}</p>
  )
}

export function DocUl({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <ul
      className={cn("list-inside list-disc space-y-2 text-muted-foreground", className)}
    >
      {children}
    </ul>
  )
}

export function DocOl({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <ol
      className={cn(
        "list-inside list-decimal space-y-2 text-muted-foreground",
        className
      )}
    >
      {children}
    </ol>
  )
}

export function DocInlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
      {children}
    </code>
  )
}

export function DocPre({
  children,
  title,
  className,
}: {
  children: string
  title?: string
  className?: string
}) {
  return (
    <div className={cn("overflow-hidden rounded-lg border bg-muted/40", className)}>
      {title ? (
        <div className="border-b bg-muted/60 px-4 py-2 text-xs font-medium text-muted-foreground">
          {title}
        </div>
      ) : null}
      <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed sm:text-sm">
        <code>{children}</code>
      </pre>
    </div>
  )
}

export function DocCallout({
  title,
  children,
  variant = "note",
}: {
  title?: string
  children: React.ReactNode
  variant?: "note" | "tip" | "warning"
}) {
  return (
    <div
      className={cn(
        "rounded-lg border px-4 py-3 text-sm",
        variant === "note" && "border-border bg-muted/40",
        variant === "tip" && "border-primary/30 bg-primary/5",
        variant === "warning" && "border-destructive/30 bg-destructive/5"
      )}
    >
      {title ? <p className="mb-1 font-medium text-foreground">{title}</p> : null}
      <div className="text-muted-foreground [&_code]:text-foreground">{children}</div>
    </div>
  )
}

export function DocLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  const external = href.startsWith("http")

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-primary underline-offset-4 hover:underline"
      >
        {children}
      </a>
    )
  }

  return (
    <Link
      href={href}
      className="font-medium text-primary underline-offset-4 hover:underline"
    >
      {children}
    </Link>
  )
}

/** In-app route with readable label plus monospace path. */
export function DocRouteLink({
  href,
  label,
}: {
  href: string
  label: string
}) {
  return (
    <>
      <DocLink href={href}>{label}</DocLink>{" "}
      <span className="text-muted-foreground">
        (<DocInlineCode>{href}</DocInlineCode>)
      </span>
    </>
  )
}

export function DocTable({
  headers,
  rows,
}: {
  headers: string[]
  rows: (string | React.ReactNode)[][]
}) {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full min-w-[32rem] border-collapse text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            {headers.map((header) => (
              <th
                key={header}
                className="px-4 py-3 text-left font-medium text-foreground"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="border-b border-border/60 last:border-0">
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-4 py-3 align-top text-muted-foreground [&_code]:text-foreground"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
