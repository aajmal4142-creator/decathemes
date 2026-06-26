"use client"

import * as React from "react"

import { MinusIcon, PlusIcon, StarIcon } from "lucide-react"

import { DemoMeshImage } from "@/components/demo/demo-media"
import {
  Badge,
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Label,
  RadioGroup,
  RadioGroupItem,
  Separator,
} from "@/components/ui"
import { fieldAndCoProducts } from "@/lib/demo/data"
import { firstOrThrow } from "@/lib/optional-props"
import { cn } from "@/lib/utils"

const base = firstOrThrow(fieldAndCoProducts, "products required")

const product = {
  ...base,
  compareAt: 118,
  rating: 4.9,
  reviews: 186,
  details: [
    "100% European flax linen",
    "Garment-washed twice before shipping",
    "Machine wash cold, tumble dry low",
    "50 × 70 in (127 × 178 cm)",
  ],
  colors: [
    { id: "stone", label: "Stone" },
    { id: "sand", label: "Warm Sand" },
    { id: "sage", label: "Sage" },
  ],
  images: [
    { id: "1", label: "Folded detail" },
    { id: "2", label: "Texture close-up" },
    { id: "3", label: "Styled on sofa" },
    { id: "4", label: "Packaging" },
  ],
}

function QuantityStepper({
  value,
  onChange,
}: {
  value: number
  onChange: (value: number) => void
}) {
  return (
    <div className="flex items-center gap-theme-2">
      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        aria-label="Decrease quantity"
        disabled={value <= 1}
        onClick={() => onChange(Math.max(1, value - 1))}
      >
        <MinusIcon />
      </Button>
      <span className="w-8 text-center text-sm font-medium tabular-nums">{value}</span>
      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        aria-label="Increase quantity"
        onClick={() => onChange(value + 1)}
      >
        <PlusIcon />
      </Button>
    </div>
  )
}

function ProductInfo({ className }: { className?: string }) {
  const [color, setColor] = React.useState(
    firstOrThrow(product.colors, "product colors required").id
  )
  const [quantity, setQuantity] = React.useState(1)

  return (
    <div className={cn("flex flex-col gap-theme-6", className)}>
      <div className="space-y-theme-3">
        <Badge variant="outline">Bestseller</Badge>
        <h1 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
          {product.name}
        </h1>
        <div className="flex flex-wrap items-center gap-theme-3">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon
                key={i}
                className={cn(
                  "size-4",
                  i < Math.floor(product.rating)
                    ? "fill-primary text-primary"
                    : "text-muted-foreground/40"
                )}
              />
            ))}
            <span className="ml-1 text-sm text-muted-foreground">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>
        </div>
        <div className="flex items-baseline gap-theme-2">
          <span className="text-2xl font-semibold tabular-nums">${product.price}</span>
          <span className="text-sm text-muted-foreground line-through tabular-nums">
            ${product.compareAt}
          </span>
        </div>
        <p className="text-muted-foreground">{product.description}</p>
      </div>

      <div className="space-y-theme-3">
        <Label className="text-sm font-medium">Color</Label>
        <RadioGroup
          value={color}
          onValueChange={setColor}
          className="flex flex-wrap gap-theme-3"
        >
          {product.colors.map((option) => (
            <div key={option.id} className="flex items-center gap-theme-2">
              <RadioGroupItem value={option.id} id={`color-${option.id}`} />
              <Label
                htmlFor={`color-${option.id}`}
                className="cursor-pointer font-normal"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="flex flex-col gap-theme-4 sm:flex-row sm:items-center">
        <QuantityStepper value={quantity} onChange={setQuantity} />
        <Button size="lg" className="flex-1">
          Add to cart — ${(product.price ?? 0) * quantity}
        </Button>
      </div>

      <Separator />

      <ul className="space-y-theme-2 text-sm text-muted-foreground">
        {product.details.map((detail) => (
          <li key={detail} className="flex gap-theme-2">
            <span className="text-foreground">·</span>
            {detail}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function ProductDetailSimple({ className }: { className?: string }) {
  return (
    <section className={cn("w-full p-theme-6", className)}>
      <div className="mx-auto grid max-w-6xl gap-theme-8 lg:grid-cols-2">
        <DemoMeshImage id={product.id} label={product.name} className="rounded-xl" />
        <ProductInfo />
      </div>
    </section>
  )
}

export function ProductDetailGallery({ className }: { className?: string }) {
  return (
    <section className={cn("w-full p-theme-6", className)}>
      <div className="mx-auto grid max-w-6xl gap-theme-8 lg:grid-cols-2">
        <div className="space-y-theme-4">
          <Carousel className="w-full">
            <CarouselContent>
              {product.images.map((image) => (
                <CarouselItem key={image.id}>
                  <DemoMeshImage
                    id={`${product.id}-${image.id}`}
                    label={`${product.name} — ${image.label}`}
                    className="rounded-xl"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-theme-4 flex justify-end gap-theme-2">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </Carousel>
          <div className="grid grid-cols-4 gap-theme-2">
            {product.images.map((image) => (
              <DemoMeshImage
                key={image.id}
                id={`${product.id}-thumb-${image.id}`}
                label={image.label}
                ratio={1}
                className="rounded-md"
              />
            ))}
          </div>
        </div>
        <ProductInfo />
      </div>
    </section>
  )
}
