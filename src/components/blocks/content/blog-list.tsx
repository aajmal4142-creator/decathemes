import { DemoMeshImage } from "@/components/demo/demo-media"
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui"
import { blogCopy, materialEditPosts } from "@/lib/demo/data"
import { firstOrThrow } from "@/lib/optional-props"
import { cn } from "@/lib/utils"

function PostCard({ post }: { post: (typeof materialEditPosts)[number] }) {
  return (
    <Card className="overflow-hidden py-0 transition-shadow hover:shadow-md">
      <CardContent className="p-0">
        <DemoMeshImage id={post.slug} label={post.title} ratio={16 / 10} />
        <div className="space-y-theme-3 p-theme-4">
          <div className="flex flex-wrap items-center gap-theme-2">
            <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">
              {post.category}
            </Badge>
            <span className="text-xs text-muted-foreground">{post.readTime}</span>
          </div>
          <CardTitle className="text-lg leading-snug">{post.title}</CardTitle>
          <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
          <p className="text-xs text-muted-foreground">
            {post.author} · {post.date}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export function BlogListGrid({ className }: { className?: string }) {
  return (
    <section className={cn("w-full p-theme-6", className)}>
      <div className="mx-auto max-w-6xl space-y-theme-6">
        <header className="space-y-theme-2">
          <Badge variant="outline">{blogCopy.publication}</Badge>
          <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            Stories from the studio
          </h2>
          <p className="max-w-xl text-muted-foreground">{blogCopy.tagline}</p>
        </header>
        <div className="grid gap-theme-4 sm:grid-cols-2 lg:grid-cols-3">
          {materialEditPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function BlogListFeatured({ className }: { className?: string }) {
  const featured = firstOrThrow(materialEditPosts, "posts required")
  const rest = materialEditPosts.slice(1)

  return (
    <section className={cn("w-full p-theme-6", className)}>
      <div className="mx-auto max-w-6xl space-y-theme-8">
        <header className="flex flex-col gap-theme-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-theme-2">
            <Badge>{blogCopy.publication}</Badge>
            <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
              Latest articles
            </h2>
            <p className="max-w-lg text-muted-foreground">{blogCopy.tagline}</p>
          </div>
          <Button variant="outline">View all posts</Button>
        </header>

        <Card className="overflow-hidden py-0">
          <div className="grid lg:grid-cols-2">
            <DemoMeshImage
              id={featured.slug}
              label={featured.title}
              ratio={16 / 10}
              className="rounded-none lg:min-h-full [&>div]:min-h-[240px] lg:[&>div]:min-h-full"
            />
            <div className="flex flex-col justify-center gap-theme-4 p-theme-6 lg:p-theme-8">
              <div className="flex flex-wrap items-center gap-theme-2">
                <Badge variant="secondary">{featured.category}</Badge>
                <span className="text-xs text-muted-foreground">
                  {featured.readTime}
                </span>
              </div>
              <h3 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                {featured.title}
              </h3>
              <p className="text-muted-foreground">{featured.excerpt}</p>
              <p className="text-sm text-muted-foreground">
                {featured.author} · {featured.date}
              </p>
              <Button className="w-fit">Read article</Button>
            </div>
          </div>
        </Card>

        <div className="grid gap-theme-4 md:grid-cols-2 lg:grid-cols-3">
          {rest.slice(0, 3).map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
