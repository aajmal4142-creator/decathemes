import {
  DocCallout,
  DocH1,
  DocH2,
  DocH3,
  DocInlineCode,
  DocLink,
  DocP,
  DocPre,
  DocRouteLink,
  DocUl,
} from "@/components/docs/doc-elements"
import { Badge } from "@/components/ui/badge"
import type { DocTocItem } from "@/docs/types"

export const componentsToc: DocTocItem[] = [
  { id: "gallery", title: "Component gallery", level: 2 },
  { id: "importing", title: "Importing components", level: 2 },
  { id: "barrel-imports", title: "Barrel imports", level: 3 },
  { id: "common-patterns", title: "Common patterns", level: 2 },
  { id: "forms", title: "Forms", level: 3 },
  { id: "data-display", title: "Data display", level: 3 },
  { id: "overlays", title: "Overlays", level: 3 },
  { id: "adding-components", title: "Adding more components", level: 2 },
]

const formsExampleCode = [
  'import { zodResolver } from "@hookform/resolvers/zod"',
  'import { useForm } from "react-hook-form"',
  'import { z } from "zod"',
  'import { Button, Form, FormField, FormItem, FormLabel, Input } from "@/components/ui"',
  "",
  "const schema = z.object({ email: z.string().email() })",
  "",
  "function EmailForm() {",
  "  const form = useForm({ resolver: zodResolver(schema) })",
  "  return (",
  "    <Form {...form}>",
  '      <form onSubmit={form.handleSubmit((data) => { /* send data */ })}>',
  '        <FormField name="email" render={({ field }) => (',
  "          <FormItem>",
  "            <FormLabel>Email</FormLabel>",
  '            <Input {...field} type="email" />',
  "          </FormItem>",
  "        )} />",
  '        <Button type="submit">Submit</Button>',
  "      </form>",
  "    </Form>",
  "  )",
  "}",
].join("\n")

const dataTableExampleCode = [
  'import { type ColumnDef } from "@tanstack/react-table"',
  'import { DataTable } from "@/components/ui/data-table"',
  "",
  "const columns: ColumnDef<Row>[] = [",
  '  { accessorKey: "email", header: "Email" },',
  '  { accessorKey: "role", header: "Role" },',
  "]",
  "",
  '<DataTable columns={columns} data={rows} searchKey="email" />',
].join("\n")

export function ComponentsPage() {
  return (
    <article className="space-y-8">
      <header className="space-y-4">
        <Badge variant="outline">Components</Badge>
        <DocH1>Using components</DocH1>
        <DocP>
          Decathemes ships the full shadcn/ui library (new-york style) with 50+
          primitives in <DocInlineCode>src/components/ui/</DocInlineCode>. Every
          component reads theme tokens — they restyle automatically when you change{" "}
          <DocInlineCode>data-theme</DocInlineCode> or toggle dark mode.
        </DocP>
      </header>

      <section className="space-y-4">
        <DocH2 id="gallery">Component gallery</DocH2>
        <DocP>
          Browse every component with live demos, code peek, and theme switching at the{" "}
          <DocRouteLink href="/components" label="component gallery" />. Use ⌘F to search
          and jump between categories: inputs, feedback, navigation, data, and more.
        </DocP>
        <DocCallout variant="tip">
          The gallery is the fastest way to see how a component looks across all 10
          themes before pasting it into your app.
        </DocCallout>
      </section>

      <section className="space-y-4">
        <DocH2 id="importing">Importing components</DocH2>
        <DocP>Import from the barrel file or individual modules:</DocP>
        <DocPre title="Recommended">{`import { Button, Card, CardContent, CardHeader, CardTitle } from "@/components/ui"`}</DocPre>
        <DocPre title="Individual module">{`import { Button } from "@/components/ui/button"`}</DocPre>

        <DocH3 id="barrel-imports">Barrel imports</DocH3>
        <DocP>
          <DocInlineCode>src/components/ui/index.ts</DocInlineCode> re-exports all
          primitives. Sonner and Radix toasters are aliased as{" "}
          <DocInlineCode>SonnerToaster</DocInlineCode> and{" "}
          <DocInlineCode>RadixToaster</DocInlineCode> to avoid name collisions.
        </DocP>
      </section>

      <section className="space-y-4">
        <DocH2 id="common-patterns">Common patterns</DocH2>

        <DocH3 id="forms">Forms</DocH3>
        <DocP>
          Use <DocInlineCode>Form</DocInlineCode> with react-hook-form and zod for
          validated inputs. The gallery includes Field, Input, Select, Checkbox, Switch,
          and DatePicker demos.
        </DocP>
        <DocPre>{formsExampleCode}</DocPre>

        <DocH3 id="data-display">Data display</DocH3>
        <DocP>
          <DocInlineCode>DataTable</DocInlineCode> wraps TanStack Table with sorting,
          filtering, and pagination. <DocInlineCode>Chart</DocInlineCode> wraps Recharts
          with theme-aware colors via <DocInlineCode>--chart-1</DocInlineCode> tokens.
        </DocP>
        <DocPre title="DataTable">{dataTableExampleCode}</DocPre>

        <DocH3 id="overlays">Overlays</DocH3>
        <DocP>
          Dialog, Sheet, Drawer (Vaul), Popover, and AlertDialog share Radix focus
          management. Prefer Sheet on mobile for navigation; Dialog for confirmations;
          Drawer for cart-style panels.
        </DocP>
      </section>

      <section className="space-y-4">
        <DocH2 id="adding-components">Adding more components</DocH2>
        <DocP>
          Decathemes uses shadcn CLI v4. Add new primitives without breaking themes:
        </DocP>
        <DocPre>{`npx shadcn@latest add dialog
# Confirm style: new-york, CSS variables: yes`}</DocPre>
        <DocUl>
          <li>
            Components land in <DocInlineCode>src/components/ui/</DocInlineCode>
          </li>
          <li>
            Add the export to <DocInlineCode>index.ts</DocInlineCode> if needed
          </li>
          <li>
            Register a gallery demo in{" "}
            <DocInlineCode>gallery-registry.ts</DocInlineCode> (optional)
          </li>
          <li>Never hardcode colors — use semantic Tailwind tokens</li>
        </DocUl>
      </section>
    </article>
  )
}
