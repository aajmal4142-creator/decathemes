"use client"

import * as React from "react"

import Link from "next/link"

import { ArrowLeftIcon, ShoppingBagIcon } from "lucide-react"

import { CartDrawer } from "@/components/blocks/commerce/cart-drawer"
import { ProductDetailGallery } from "@/components/blocks/commerce/product-detail"
import { ProductGridFeatured } from "@/components/blocks/commerce/product-grid"
import { DemoMeshImage } from "@/components/demo/demo-media"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { fieldAndCo } from "@/lib/demo/brand"
import { fieldAndCoProducts, storeCopy } from "@/lib/demo/data"
import { firstOrThrow } from "@/lib/optional-props"
import { cn } from "@/lib/utils"

type StoreView = "store" | "product"

export function StoreDemoPage() {
  const [view, setView] = React.useState<StoreView>("store")
  const featured = firstOrThrow(fieldAndCoProducts, "products required")

  return (
    <div className="min-h-[640px] bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            {view === "product" ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setView("store")}
                className="gap-1.5"
              >
                <ArrowLeftIcon className="size-4" />
                Back
              </Button>
            ) : (
              <Link
                href="/preview/store"
                className="flex items-center gap-2 font-semibold"
              >
                <ShoppingBagIcon className="size-5 text-primary" aria-hidden="true" />
                {fieldAndCo.name}
              </Link>
            )}
            <Badge variant="secondary" className="hidden sm:inline-flex">
              {storeCopy.shippingNote}
            </Badge>
          </div>
          <nav className="hidden items-center gap-6 text-sm md:flex" aria-label="Store">
            <span className="text-muted-foreground">New in</span>
            <span className="text-muted-foreground">Living room</span>
            <span className="text-muted-foreground">Gifts</span>
          </nav>
          <div className="flex items-center gap-2">
            <StoreCartTrigger />
          </div>
        </div>
      </header>

      <main>
        {view === "store" ? (
          <div>
            <ProductGridFeatured />
            <div className="border-t bg-muted/20 px-4 py-10 sm:px-6">
              <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center sm:flex-row sm:text-start">
                <div className="w-full max-w-[200px] shrink-0 sm:max-w-[160px]">
                  <DemoMeshImage id={featured.id} label={featured.name} ratio={1} />
                </div>
                <div className="flex-1 space-y-2">
                  <p className="text-sm font-medium">Editor&apos;s pick</p>
                  <h2 className="font-heading text-xl font-semibold">
                    {featured.name}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {featured.description}
                  </p>
                </div>
                <Button className="shrink-0" onClick={() => setView("product")}>
                  View product — ${featured.price}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className={cn("mx-auto max-w-6xl px-4 py-6 sm:px-6")}>
            <ProductDetailGallery />
          </div>
        )}
      </main>
    </div>
  )
}

function StoreCartTrigger() {
  return (
    <div className="[&_button]:gap-2">
      <CartDrawer />
    </div>
  )
}
