import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Separator,
} from "@/components/ui"
import { cn } from "@/lib/utils"

const article = {
  title: "How to care for washed linen",
  category: "Guides",
  author: {
    name: "Elena Marsh",
    role: "Head of Product",
    initials: "EM",
  },
  date: "June 12, 2026",
  readTime: "6 min read",
}

const relatedPosts = [
  { title: "Styling a small apartment without clutter", category: "Interior" },
  { title: "The summer edit: lighter layers", category: "Seasonal" },
  { title: "Plastic-free shipping, explained", category: "Sustainability" },
]

const sidebarTopics = [
  "Washing & drying",
  "Removing stains",
  "Storage tips",
  "When to replace",
]

function ArticleBody() {
  return (
    <div className="max-w-none space-y-theme-6">
      <p className="text-lg text-muted-foreground leading-relaxed">
        Garment-washed linen is meant to look relaxed from day one. With a little care,
        your throws and bedding will grow softer while keeping their structure.
      </p>

      <h2 className="font-heading text-xl font-semibold tracking-tight">
        Wash cold, dry low
      </h2>
      <p className="text-muted-foreground leading-relaxed">
        Machine wash on a gentle cycle with mild detergent. Avoid bleach and fabric
        softener — both coat fibers and reduce breathability. Tumble dry on low or line
        dry; slight wrinkling is part of the character.
      </p>

      <h2 className="font-heading text-xl font-semibold tracking-tight">
        Treat stains early
      </h2>
      <p className="text-muted-foreground leading-relaxed">
        Blot spills immediately with cool water. For oil-based marks, a drop of dish
        soap worked into the spot before washing usually does the trick. Test any
        treatment on an inside seam first.
      </p>

      <h2 className="font-heading text-xl font-semibold tracking-tight">
        Store with airflow
      </h2>
      <p className="text-muted-foreground leading-relaxed">
        Fold loosely or roll to prevent sharp creases. Keep linen in a dry closet —
        never in plastic bins, which trap moisture and can cause mildew over time.
      </p>
    </div>
  )
}

function ArticleMeta() {
  return (
    <div className="flex flex-wrap items-center gap-theme-4">
      <Avatar>
        <AvatarFallback>{article.author.initials}</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm font-medium">{article.author.name}</p>
        <p className="text-xs text-muted-foreground">
          {article.author.role} · {article.date} · {article.readTime}
        </p>
      </div>
    </div>
  )
}

export function BlogPostSimple({ className }: { className?: string }) {
  return (
    <article className={cn("w-full p-theme-6", className)}>
      <div className="mx-auto max-w-3xl space-y-theme-8">
        <header className="space-y-theme-4 border-b pb-theme-6">
          <Badge variant="outline">{article.category}</Badge>
          <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            {article.title}
          </h1>
          <ArticleMeta />
        </header>

        <div
          className="aspect-[2/1] rounded-xl bg-gradient-to-br from-muted to-muted-foreground/20"
          aria-hidden
        />

        <ArticleBody />

        <footer className="border-t pt-theme-6">
          <div className="flex flex-wrap gap-theme-3">
            <Button variant="outline">Share</Button>
            <Button variant="outline">Save for later</Button>
          </div>
        </footer>
      </div>
    </article>
  )
}

export function BlogPostWithSidebar({ className }: { className?: string }) {
  return (
    <article className={cn("w-full p-theme-6", className)}>
      <div className="mx-auto grid max-w-6xl gap-theme-8 lg:grid-cols-[1fr_280px]">
        <div className="min-w-0 space-y-theme-8">
          <header className="space-y-theme-4">
            <Badge variant="outline">{article.category}</Badge>
            <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              {article.title}
            </h1>
            <ArticleMeta />
          </header>

          <div
            className="aspect-[16/9] rounded-xl bg-gradient-to-br from-muted to-muted-foreground/20"
            aria-hidden
          />

          <ArticleBody />
        </div>

        <aside className="space-y-theme-6 lg:sticky lg:top-theme-8 lg:self-start">
          <Card className="py-theme-4">
            <CardHeader className="px-theme-4 pb-theme-3">
              <CardTitle className="text-sm font-medium">In this article</CardTitle>
            </CardHeader>
            <CardContent className="px-theme-4">
              <ul className="space-y-theme-2 text-sm">
                {sidebarTopics.map((topic) => (
                  <li key={topic}>
                    <button
                      type="button"
                      className="text-left text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {topic}
                    </button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="py-theme-4">
            <CardHeader className="px-theme-4 pb-theme-3">
              <CardTitle className="text-sm font-medium">Related reading</CardTitle>
            </CardHeader>
            <CardContent className="space-y-theme-4 px-theme-4">
              {relatedPosts.map((post, i) => (
                <div key={post.title}>
                  {i > 0 && <Separator className="mb-theme-4" />}
                  <p className="text-xs text-muted-foreground">{post.category}</p>
                  <button
                    type="button"
                    className="mt-1 text-left text-sm font-medium leading-snug hover:underline"
                  >
                    {post.title}
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-primary/5 py-theme-4">
            <CardContent className="space-y-theme-3 px-theme-4">
              <p className="text-sm font-medium">Enjoying the journal?</p>
              <p className="text-xs text-muted-foreground">
                Get one thoughtful email per month — no promotions, just stories.
              </p>
              <Button size="sm" className="w-full">
                Subscribe
              </Button>
            </CardContent>
          </Card>
        </aside>
      </div>
    </article>
  )
}
