import { DemoMeshImage } from "@/components/demo/demo-media"
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui"
import { fieldAndCo } from "@/lib/demo/brand"
import { fieldAndCoProducts } from "@/lib/demo/data"
import { firstOrThrow } from "@/lib/optional-props"
import { cn } from "@/lib/utils"

function ProductCard({
  product,
  featured,
}: {
  product: (typeof fieldAndCoProducts)[number]
  featured?: boolean
}) {
  return (
    <Card
      className={cn("overflow-hidden py-0", featured && "border-primary/30 shadow-md")}
    >
      <CardContent className="p-0">
        <DemoMeshImage id={product.id} label={product.name} />
        <div className="space-y-theme-2 p-theme-4">
          <div className="flex items-start justify-between gap-theme-2">
            <div className="min-w-0 space-y-1">
              <Badge
                variant="secondary"
                className="text-[10px] uppercase tracking-wider"
              >
                {product.category}
              </Badge>
              <CardTitle className={cn("text-base", featured && "text-lg")}>
                {product.name}
              </CardTitle>
            </div>
            <span className="shrink-0 font-semibold tabular-nums">
              ${product.price}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </div>
      </CardContent>
      <CardFooter className="border-t px-theme-4 py-theme-3">
        <Button className="w-full" variant={featured ? "default" : "outline"}>
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  )
}

export function ProductGridSimple({ className }: { className?: string }) {
  return (
    <section className={cn("w-full p-theme-6", className)}>
      <div className="mx-auto max-w-6xl space-y-theme-6">
        <header className="space-y-theme-2">
          <Badge variant="outline">New arrivals</Badge>
          <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            Shop {fieldAndCo.name}
          </h2>
          <p className="max-w-xl text-muted-foreground">
            {fieldAndCo.tagline} — ships in 2–3 business days, carbon-neutral delivery
            on orders over $75.
          </p>
        </header>
        <div className="grid gap-theme-4 sm:grid-cols-2 lg:grid-cols-3">
          {fieldAndCoProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function ProductGridFeatured({ className }: { className?: string }) {
  const featured = firstOrThrow(fieldAndCoProducts, "products required")
  const rest = fieldAndCoProducts.slice(1)

  return (
    <section className={cn("w-full p-theme-6", className)}>
      <div className="mx-auto max-w-6xl space-y-theme-6">
        <header className="flex flex-col gap-theme-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-theme-2">
            <Badge>Editor&apos;s pick</Badge>
            <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
              Featured this week
            </h2>
            <p className="max-w-lg text-muted-foreground">
              A curated edit of bestsellers and seasonal favorites from{" "}
              {fieldAndCo.name}.
            </p>
          </div>
          <Button variant="outline" className="shrink-0">
            View all products
          </Button>
        </header>
        <div className="grid gap-theme-4 lg:grid-cols-2">
          <ProductCard product={featured} featured />
          <div className="grid gap-theme-4 sm:grid-cols-2">
            {rest.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
