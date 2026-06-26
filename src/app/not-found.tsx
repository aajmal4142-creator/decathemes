import Link from "next/link"

import { ArrowLeftIcon, LayersIcon } from "lucide-react"

import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <LayersIcon className="size-7" aria-hidden />
      </div>
      <h1 className="font-heading text-3xl font-semibold tracking-tight">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        This route is not part of the Decathemes preview. Check the URL or explore the
        live demo gallery.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link href="/">
            <ArrowLeftIcon className="size-4" />
            Home
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/preview">Live preview</Link>
        </Button>
      </div>
    </Container>
  )
}
