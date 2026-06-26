"use client"

import * as React from "react"

import { CheckIcon } from "lucide-react"

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
} from "@/components/ui"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { atOr, firstOrThrow } from "@/lib/optional-props"
import { cn } from "@/lib/utils"

const orderSummary = {
  items: [
    { name: "Washed Linen Throw", qty: 1, price: 89 },
    { name: "Stoneware Mug Set", qty: 2, price: 84 },
  ],
  subtotal: 173,
  shipping: 0,
  tax: 13.84,
  total: 186.84,
}

function OrderSummary({ className }: { className?: string }) {
  return (
    <Card className={cn("py-theme-4", className)}>
      <CardHeader className="px-theme-4 pb-theme-3">
        <CardTitle className="text-base">Order summary</CardTitle>
        <CardDescription>2 items · ships in 2–3 business days</CardDescription>
      </CardHeader>
      <CardContent className="space-y-theme-4 px-theme-4">
        <ul className="space-y-theme-3 text-sm">
          {orderSummary.items.map((item) => (
            <li key={item.name} className="flex justify-between gap-theme-2">
              <span className="text-muted-foreground">
                {item.name} × {item.qty}
              </span>
              <span className="shrink-0 tabular-nums">${item.price}</span>
            </li>
          ))}
        </ul>
        <Separator />
        <div className="space-y-theme-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="tabular-nums">${orderSummary.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span className="tabular-nums">Free</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax</span>
            <span className="tabular-nums">${orderSummary.tax.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span className="tabular-nums">${orderSummary.total.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ContactFields() {
  return (
    <FieldSet>
      <FieldLegend className="sr-only">Contact information</FieldLegend>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="checkout-email">Email</FieldLabel>
          <Input id="checkout-email" type="email" placeholder="you@example.com" />
          <FieldDescription>Order confirmation and tracking updates.</FieldDescription>
        </Field>
        <div className="grid gap-theme-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="checkout-first">First name</FieldLabel>
            <Input id="checkout-first" autoComplete="given-name" />
          </Field>
          <Field>
            <FieldLabel htmlFor="checkout-last">Last name</FieldLabel>
            <Input id="checkout-last" autoComplete="family-name" />
          </Field>
        </div>
      </FieldGroup>
    </FieldSet>
  )
}

function ShippingFields() {
  return (
    <FieldSet>
      <FieldLegend className="sr-only">Shipping address</FieldLegend>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="checkout-address">Street address</FieldLabel>
          <Input id="checkout-address" autoComplete="street-address" />
        </Field>
        <Field>
          <FieldLabel htmlFor="checkout-apt">
            Apartment, suite, etc. (optional)
          </FieldLabel>
          <Input id="checkout-apt" />
        </Field>
        <div className="grid gap-theme-4 sm:grid-cols-3">
          <Field>
            <FieldLabel htmlFor="checkout-city">City</FieldLabel>
            <Input id="checkout-city" autoComplete="address-level2" />
          </Field>
          <Field>
            <FieldLabel htmlFor="checkout-state">State</FieldLabel>
            <Select>
              <SelectTrigger id="checkout-state" className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ca">California</SelectItem>
                <SelectItem value="ny">New York</SelectItem>
                <SelectItem value="tx">Texas</SelectItem>
                <SelectItem value="wa">Washington</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <FieldLabel htmlFor="checkout-zip">ZIP code</FieldLabel>
            <Input id="checkout-zip" autoComplete="postal-code" />
          </Field>
        </div>
      </FieldGroup>
    </FieldSet>
  )
}

function PaymentFields() {
  return (
    <FieldSet>
      <FieldLegend className="sr-only">Payment</FieldLegend>
      <FieldGroup>
        <Field>
          <FieldLabel>Payment method</FieldLabel>
          <RadioGroup defaultValue="card" className="flex flex-col gap-theme-3">
            <div className="flex items-center gap-theme-2">
              <RadioGroupItem value="card" id="pay-card" />
              <Label htmlFor="pay-card">Credit or debit card</Label>
            </div>
            <div className="flex items-center gap-theme-2">
              <RadioGroupItem value="paypal" id="pay-paypal" />
              <Label htmlFor="pay-paypal">PayPal</Label>
            </div>
          </RadioGroup>
        </Field>
        <Field>
          <FieldLabel htmlFor="checkout-card">Card number</FieldLabel>
          <Input id="checkout-card" placeholder="4242 4242 4242 4242" />
        </Field>
        <div className="grid gap-theme-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="checkout-exp">Expiration</FieldLabel>
            <Input id="checkout-exp" placeholder="MM / YY" />
          </Field>
          <Field>
            <FieldLabel htmlFor="checkout-cvc">CVC</FieldLabel>
            <Input id="checkout-cvc" placeholder="123" />
          </Field>
        </div>
        <Field orientation="horizontal">
          <Checkbox id="checkout-billing" />
          <FieldLabel htmlFor="checkout-billing" className="font-normal">
            Billing address same as shipping
          </FieldLabel>
        </Field>
      </FieldGroup>
    </FieldSet>
  )
}

export function CheckoutFormSimple({ className }: { className?: string }) {
  return (
    <section className={cn("w-full p-theme-6", className)}>
      <div className="mx-auto grid max-w-5xl gap-theme-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-theme-6">
          <header className="space-y-theme-2">
            <Badge variant="outline">Secure checkout</Badge>
            <h2 className="font-heading text-2xl font-semibold tracking-tight">
              Complete your order
            </h2>
            <p className="text-sm text-muted-foreground">
              All transactions are encrypted. Returns accepted within 30 days.
            </p>
          </header>

          <form className="space-y-theme-8" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-theme-4">
              <h3 className="font-medium">Contact</h3>
              <ContactFields />
            </div>
            <Separator />
            <div className="space-y-theme-4">
              <h3 className="font-medium">Shipping</h3>
              <ShippingFields />
              <Field>
                <FieldLabel htmlFor="checkout-notes">
                  Delivery notes (optional)
                </FieldLabel>
                <Textarea
                  id="checkout-notes"
                  placeholder="Gate code, leave at door, etc."
                  rows={2}
                />
              </Field>
            </div>
            <Separator />
            <div className="space-y-theme-4">
              <h3 className="font-medium">Payment</h3>
              <PaymentFields />
            </div>
            <Button type="submit" size="lg" className="w-full sm:w-auto">
              Pay ${orderSummary.total.toFixed(2)}
            </Button>
          </form>
        </div>

        <aside className="lg:sticky lg:top-theme-8 lg:self-start">
          <OrderSummary />
        </aside>
      </div>
    </section>
  )
}

const steps = [
  { id: "contact", label: "Contact", content: <ContactFields /> },
  { id: "shipping", label: "Shipping", content: <ShippingFields /> },
  { id: "payment", label: "Payment", content: <PaymentFields /> },
]

export function CheckoutFormMultiStep({ className }: { className?: string }) {
  const [step, setStep] = React.useState(0)
  const current = atOr(steps, step, firstOrThrow(steps, "checkout steps required"))
  const isLast = step === steps.length - 1

  return (
    <section className={cn("w-full p-theme-6", className)}>
      <div className="mx-auto grid max-w-5xl gap-theme-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-theme-6">
          <header className="space-y-theme-2">
            <Badge variant="outline">
              Step {step + 1} of {steps.length}
            </Badge>
            <h2 className="font-heading text-2xl font-semibold tracking-tight">
              Checkout
            </h2>
          </header>

          <Tabs value={current.id} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              {steps.map((s, i) => (
                <TabsTrigger
                  key={s.id}
                  value={s.id}
                  disabled={i > step}
                  onClick={() => i <= step && setStep(i)}
                >
                  {i < step ? <CheckIcon className="size-3.5" /> : null}
                  {s.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {steps.map((s) => (
              <TabsContent key={s.id} value={s.id} className="mt-theme-6">
                <form className="space-y-theme-6" onSubmit={(e) => e.preventDefault()}>
                  {s.content}
                  <div className="flex gap-theme-3">
                    {step > 0 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep((prev) => prev - 1)}
                      >
                        Back
                      </Button>
                    )}
                    <Button
                      type="button"
                      className="flex-1 sm:flex-none"
                      onClick={() => {
                        if (isLast) return
                        setStep((prev) => prev + 1)
                      }}
                    >
                      {isLast ? `Pay $${orderSummary.total.toFixed(2)}` : "Continue"}
                    </Button>
                  </div>
                </form>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <aside className="lg:sticky lg:top-theme-8 lg:self-start">
          <OrderSummary />
        </aside>
      </div>
    </section>
  )
}
