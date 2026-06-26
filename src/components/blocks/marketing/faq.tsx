"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

const faqItems = [
  {
    question: "What is DecaThemes?",
    answer:
      "DecaThemes is a design system platform that provides production-ready themes, components, and marketing blocks for React and Next.js applications. You get full source code ownership with no runtime dependencies.",
  },
  {
    question: "Can I use DecaThemes for commercial projects?",
    answer:
      "Yes. All paid plans include a commercial license. You can use DecaThemes components in client work, SaaS products, and internal tools without attribution requirements.",
  },
  {
    question: "How does theming work?",
    answer:
      "Themes are built on CSS custom properties (design tokens). Switch themes by swapping a single CSS file or using our theme provider. All components automatically adapt to the active theme.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We offer a 14-day money-back guarantee on all paid plans. If DecaThemes isn't the right fit, contact support within 14 days of purchase for a full refund.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes. Pro and Team plans include a 14-day free trial with full access to all features. No credit card is required to start the Starter plan.",
  },
  {
    question: "How do I get support?",
    answer:
      "Starter users can access our community Discord. Pro users get priority email support with 24-hour response times. Enterprise customers receive a dedicated success manager.",
  },
]

function FaqAccordion() {
  return (
    <section className="bg-background py-24 sm:py-32" id="faq">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Badge variant="secondary" className="mb-4">
            FAQ
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Can&apos;t find what you&apos;re looking for? Reach out to our support team.
          </p>
        </div>
        <Accordion type="single" collapsible className="mt-12 w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={item.question} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-foreground">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

function FaqTwoColumn() {
  const midpoint = Math.ceil(faqItems.length / 2)
  const leftColumn = faqItems.slice(0, midpoint)
  const rightColumn = faqItems.slice(midpoint)

  return (
    <section className="bg-muted/30 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Questions &amp; answers
            </h2>
            <p className="mt-4 text-muted-foreground">
              Everything you need to know about DecaThemes. Still have questions?{" "}
              <a
                href="#contact"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Get in touch
              </a>
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-2">
            {[leftColumn, rightColumn].map((column, colIndex) => (
              <dl key={colIndex} className="space-y-8">
                {column.map((item) => (
                  <div key={item.question}>
                    <dt className="text-base font-semibold text-foreground">
                      {item.question}
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.answer}
                    </dd>
                  </div>
                ))}
              </dl>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export { FaqAccordion, FaqTwoColumn }
