"use client"

import * as React from "react"

import { MinusIcon, PlusIcon, ShoppingBagIcon, Trash2Icon } from "lucide-react"

import {
  AspectRatio,
  Badge,
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Input,
  Separator,
} from "@/components/ui"
import { cn } from "@/lib/utils"

const initialItems = [
  {
    id: "linen-throw",
    name: "Washed Linen Throw",
    variant: "Stone Grey",
    price: 89,
    quantity: 1,
    accent: "from-muted to-muted-foreground/20",
  },
  {
    id: "ceramic-mug",
    name: "Stoneware Mug Set",
    variant: "Matte White",
    price: 42,
    quantity: 2,
    accent: "from-primary/20 to-primary/5",
  },
]

export function CartDrawer({ className }: { className?: string }) {
  const [items, setItems] = React.useState(initialItems)
  const [promo, setPromo] = React.useState("")

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal >= 75 ? 0 : 8
  const total = subtotal + shipping
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  function updateQuantity(id: string, quantity: number) {
    if (quantity < 1) return
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    )
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <div className={cn("flex items-center justify-center p-theme-8", className)}>
      <Drawer direction="right">
        <DrawerTrigger asChild>
          <Button variant="outline" className="gap-theme-2">
            <ShoppingBagIcon />
            Open cart
            {itemCount > 0 && (
              <Badge
                variant="secondary"
                className="ml-1 rounded-full px-2 py-0 text-xs"
              >
                {itemCount}
              </Badge>
            )}
          </Button>
        </DrawerTrigger>
        <DrawerContent className="data-[vaul-drawer-direction=right]:sm:max-w-md">
          <DrawerHeader className="border-b text-left">
            <DrawerTitle className="font-heading text-lg">Your cart</DrawerTitle>
            <DrawerDescription>
              {itemCount === 0
                ? "Your cart is empty."
                : `${itemCount} item${itemCount === 1 ? "" : "s"} — free shipping over $75`}
            </DrawerDescription>
          </DrawerHeader>

          <div className="flex flex-1 flex-col overflow-y-auto px-theme-4 py-theme-4">
            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-theme-3 py-theme-8 text-center">
                <ShoppingBagIcon className="size-10 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground">
                  Add something you love — we&apos;ll hold it here.
                </p>
                <DrawerClose asChild>
                  <Button variant="outline">Continue shopping</Button>
                </DrawerClose>
              </div>
            ) : (
              <ul className="space-y-theme-4">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-theme-3">
                    <AspectRatio
                      ratio={1}
                      className="w-20 shrink-0 overflow-hidden rounded-md bg-muted"
                    >
                      <div
                        className={cn("size-full bg-gradient-to-br", item.accent)}
                        aria-hidden
                      />
                    </AspectRatio>
                    <div className="flex min-w-0 flex-1 flex-col gap-theme-2">
                      <div className="flex items-start justify-between gap-theme-2">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.variant}
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-xs"
                          aria-label={`Remove ${item.name}`}
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2Icon />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Button
                            type="button"
                            variant="outline"
                            size="icon-xs"
                            aria-label="Decrease quantity"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <MinusIcon />
                          </Button>
                          <span className="w-6 text-center text-xs tabular-nums">
                            {item.quantity}
                          </span>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon-xs"
                            aria-label="Increase quantity"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <PlusIcon />
                          </Button>
                        </div>
                        <span className="text-sm font-medium tabular-nums">
                          ${item.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {items.length > 0 && (
            <DrawerFooter className="border-t">
              <div className="flex gap-theme-2">
                <Input
                  placeholder="Promo code"
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline" type="button">
                  Apply
                </Button>
              </div>

              <div className="space-y-theme-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="tabular-nums">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="tabular-nums">
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span className="tabular-nums">${total.toFixed(2)}</span>
                </div>
              </div>

              <Button size="lg">Checkout</Button>
              <DrawerClose asChild>
                <Button variant="outline">Continue shopping</Button>
              </DrawerClose>
            </DrawerFooter>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  )
}
