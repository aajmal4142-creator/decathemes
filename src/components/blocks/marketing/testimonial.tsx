import { Quote, Star } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { firstOrThrow } from "@/lib/optional-props"

const testimonials = [
  {
    quote:
      "DecaThemes cut our design-to-dev handoff time by 70%. Our engineers love that everything is just React components they can customize.",
    name: "Sarah Chen",
    role: "VP of Engineering",
    company: "Acme Corp",
    initials: "SC",
  },
  {
    quote:
      "We launched three products last quarter using DecaThemes. The theme system means our brand stays consistent without micromanaging every pixel.",
    name: "Marcus Rivera",
    role: "Head of Design",
    company: "Globex",
    initials: "MR",
  },
  {
    quote:
      "The accessibility defaults alone saved us weeks of audit fixes. Every block passes WCAG 2.1 AA out of the box.",
    name: "Emily Nakamura",
    role: "Product Lead",
    company: "Initech",
    initials: "EN",
  },
]

function TestimonialCards() {
  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary" className="mb-4">
            Testimonials
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Loved by teams everywhere
          </h2>
        </div>
        <div className="mx-auto mt-16 grid max-w-6xl gap-8 lg:grid-cols-3">
          {testimonials.map((item) => (
            <Card key={item.name} className="border-border">
              <CardHeader>
                <div className="flex gap-1" role="img" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 fill-primary text-primary"
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </CardHeader>
              <CardContent className="-mt-4">
                <blockquote>
                  <p className="text-foreground">&ldquo;{item.quote}&rdquo;</p>
                  <footer className="mt-6 flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {item.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <cite className="not-italic font-semibold text-foreground">
                        {item.name}
                      </cite>
                      <CardDescription>
                        {item.role}, {item.company}
                      </CardDescription>
                    </div>
                  </footer>
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialSingle() {
  const item = firstOrThrow(testimonials, "testimonials required")

  return (
    <section className="bg-muted/30 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <figure className="mx-auto max-w-3xl text-center">
          <Quote className="mx-auto size-10 text-primary/40" aria-hidden="true" />
          <blockquote className="mt-6">
            <p className="text-2xl font-medium leading-relaxed text-foreground sm:text-3xl">
              &ldquo;{item.quote}&rdquo;
            </p>
          </blockquote>
          <figcaption className="mt-10 flex flex-col items-center gap-4">
            <Avatar className="size-14">
              <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                {item.initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <cite className="not-italic text-lg font-semibold text-foreground">
                {item.name}
              </cite>
              <p className="text-muted-foreground">
                {item.role} at {item.company}
              </p>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}

export { TestimonialCards, TestimonialSingle }
