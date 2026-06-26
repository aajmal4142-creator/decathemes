import { Building2 } from "lucide-react"

const logos = [
  "Acme Corp",
  "Globex",
  "Initech",
  "Umbrella",
  "Stark Industries",
  "Wayne Enterprises",
]

function LogoCloudSimple() {
  return (
    <section
      className="border-y border-border bg-background py-12"
      aria-label="Trusted by"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {logos.map((name) => (
            <li key={name}>
              <span className="flex items-center gap-2 text-lg font-semibold text-muted-foreground/60 transition-colors hover:text-muted-foreground">
                <Building2 className="size-5" aria-hidden="true" />
                {name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function LogoCloudWithHeading() {
  return (
    <section className="bg-muted/30 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Trusted by innovative teams worldwide
        </p>
        <ul
          className="mt-10 grid grid-cols-2 items-center gap-8 sm:grid-cols-3 lg:grid-cols-6"
          aria-label="Company logos"
        >
          {logos.map((name) => (
            <li key={name} className="flex justify-center">
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="flex size-12 items-center justify-center rounded-lg border border-border bg-card">
                  <Building2
                    className="size-6 text-muted-foreground"
                    aria-hidden="true"
                  />
                </div>
                <span className="text-xs font-medium text-muted-foreground">
                  {name}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export { LogoCloudSimple, LogoCloudWithHeading }
