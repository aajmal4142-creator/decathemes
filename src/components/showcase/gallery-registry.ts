import type { CatalogEntry, CategoryMeta } from "@/types/catalog"

export type GalleryCategory =
  | "inputs"
  | "data-display"
  | "navigation"
  | "feedback"
  | "overlay"
  | "layout"

export const galleryCategoryMeta: Record<GalleryCategory, CategoryMeta> = {
  inputs: {
    label: "Inputs",
    description: "Forms, pickers, and interactive controls",
  },
  "data-display": {
    label: "Data Display",
    description: "Tables, cards, charts, and visual data",
  },
  navigation: {
    label: "Navigation",
    description: "Menus, tabs, and wayfinding",
  },
  feedback: {
    label: "Feedback",
    description: "Alerts, toasts, and status indicators",
  },
  overlay: {
    label: "Overlay",
    description: "Dialogs, sheets, and floating surfaces",
  },
  layout: {
    label: "Layout",
    description: "Structure, panels, and spatial primitives",
  },
}

export interface GalleryEntry extends CatalogEntry<GalleryCategory> {
  code: string
  demoKey: keyof typeof import("./gallery-demos").galleryDemos
}

export const galleryEntries: GalleryEntry[] = [
  {
    id: "button",
    name: "Button",
    category: "inputs",
    description: "All variants and sizes",
    demoKey: "button",
    code: `<Button variant="default">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>`,
  },
  {
    id: "input",
    name: "Input",
    category: "inputs",
    description: "Text field with label",
    demoKey: "input",
    code: `<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="you@company.com" />
</div>`,
  },
  {
    id: "textarea",
    name: "Textarea",
    category: "inputs",
    description: "Multi-line text input",
    demoKey: "textarea",
    code: `<Textarea placeholder="Write your message…" rows={4} />`,
  },
  {
    id: "checkbox",
    name: "Checkbox",
    category: "inputs",
    description: "Boolean selection",
    demoKey: "checkbox",
    code: `<div className="flex items-center gap-2">
  <Checkbox id="terms" defaultChecked />
  <Label htmlFor="terms">I agree to the terms</Label>
</div>`,
  },
  {
    id: "switch",
    name: "Switch",
    category: "inputs",
    description: "Toggle setting",
    demoKey: "switch",
    code: `<div className="flex items-center gap-2">
  <Switch id="airplane" defaultChecked />
  <Label htmlFor="airplane">Airplane mode</Label>
</div>`,
  },
  {
    id: "radio-group",
    name: "Radio Group",
    category: "inputs",
    description: "Single choice from options",
    demoKey: "radioGroup",
    code: `<RadioGroup defaultValue="comfortable">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="default" id="r1" />
    <Label htmlFor="r1">Default</Label>
  </div>
</RadioGroup>`,
  },
  {
    id: "select",
    name: "Select",
    category: "inputs",
    description: "Dropdown selection",
    demoKey: "select",
    code: `<Select defaultValue="apple">
  <SelectTrigger><SelectValue placeholder="Fruit" /></SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
  </SelectContent>
</Select>`,
  },
  {
    id: "slider",
    name: "Slider",
    category: "inputs",
    description: "Range value control",
    demoKey: "slider",
    code: `<Slider defaultValue={[42]} max={100} step={1} />`,
  },
  {
    id: "input-otp",
    name: "Input OTP",
    category: "inputs",
    description: "One-time passcode entry",
    demoKey: "inputOtp",
    code: `<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
</InputOTP>`,
  },
  {
    id: "date-picker",
    name: "Date Picker",
    category: "inputs",
    description: "Calendar in a popover",
    demoKey: "datePicker",
    code: `const [date, setDate] = useState<Date>()
<DatePicker date={date} onDateChange={setDate} />`,
  },
  {
    id: "calendar",
    name: "Calendar",
    category: "inputs",
    description: "Date grid picker",
    demoKey: "calendar",
    code: `<Calendar mode="single" selected={date} onSelect={setDate} />`,
  },
  {
    id: "label",
    name: "Label",
    category: "inputs",
    description: "Accessible field label",
    demoKey: "label",
    code: `<Label htmlFor="name">Display name</Label>`,
  },
  {
    id: "form",
    name: "Form",
    category: "inputs",
    description: "Label + input composition",
    demoKey: "form",
    code: `<form className="space-y-4">
  <div className="space-y-2">
    <Label htmlFor="name">Name</Label>
    <Input id="name" defaultValue="Alex Morgan" />
  </div>
  <Button type="submit">Save profile</Button>
</form>`,
  },
  {
    id: "combobox",
    name: "Combobox",
    category: "inputs",
    description: "Searchable select",
    demoKey: "combobox",
    code: `<Combobox items={frameworks}>
  <ComboboxInput placeholder="Select framework" />
  <ComboboxContent>
    <ComboboxList>
      {(item) => <ComboboxItem value={item}>{item}</ComboboxItem>}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`,
  },
  {
    id: "command",
    name: "Command",
    category: "inputs",
    description: "Command palette surface",
    demoKey: "command",
    code: `<Command className="rounded-lg border">
  <CommandInput placeholder="Type a command…" />
  <CommandList>
    <CommandGroup heading="Actions">
      <CommandItem>New file</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`,
  },
  {
    id: "toggle",
    name: "Toggle",
    category: "inputs",
    description: "Single toggle button",
    demoKey: "toggle",
    code: `<Toggle aria-label="Toggle bold"><BoldIcon /></Toggle>`,
  },
  {
    id: "toggle-group",
    name: "Toggle Group",
    category: "inputs",
    description: "Grouped toggle buttons",
    demoKey: "toggleGroup",
    code: `<ToggleGroup type="multiple" variant="outline">
  <ToggleGroupItem value="bold"><BoldIcon /></ToggleGroupItem>
  <ToggleGroupItem value="italic"><ItalicIcon /></ToggleGroupItem>
</ToggleGroup>`,
  },
  {
    id: "table",
    name: "Table",
    category: "data-display",
    description: "Semantic data table",
    demoKey: "table",
    code: `<Table>
  <TableHeader><TableRow><TableHead>Name</TableHead></TableRow></TableHeader>
  <TableBody><TableRow><TableCell>Ada Lovelace</TableCell></TableRow></TableBody>
</Table>`,
  },
  {
    id: "data-table",
    name: "Data Table",
    category: "data-display",
    description: "Sort, filter, paginate",
    demoKey: "dataTable",
    code: `<DataTable columns={columns} data={payments} searchKey="email" />`,
  },
  {
    id: "card",
    name: "Card",
    category: "data-display",
    description: "Content container",
    demoKey: "card",
    code: `<Card>
  <CardHeader><CardTitle>Revenue</CardTitle></CardHeader>
  <CardContent>$12,450</CardContent>
</Card>`,
  },
  {
    id: "badge",
    name: "Badge",
    category: "data-display",
    description: "Status chip variants",
    demoKey: "badge",
    code: `<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>`,
  },
  {
    id: "avatar",
    name: "Avatar",
    category: "data-display",
    description: "User profile image",
    demoKey: "avatar",
    code: `<Avatar>
  <AvatarImage src="/avatar.png" />
  <AvatarFallback>DT</AvatarFallback>
</Avatar>`,
  },
  {
    id: "aspect-ratio",
    name: "Aspect Ratio",
    category: "data-display",
    description: "Responsive media frame",
    demoKey: "aspectRatio",
    code: `<AspectRatio ratio={16/9} className="bg-muted rounded-lg" />`,
  },
  {
    id: "chart",
    name: "Chart",
    category: "data-display",
    description: "Recharts with theme tokens",
    demoKey: "chart",
    code: `<ChartContainer config={chartConfig}>
  <BarChart data={data}>...</BarChart>
</ChartContainer>`,
  },
  {
    id: "skeleton",
    name: "Skeleton",
    category: "data-display",
    description: "Loading placeholder",
    demoKey: "skeleton",
    code: `<Skeleton className="h-10 w-48" />`,
  },
  {
    id: "progress",
    name: "Progress",
    category: "data-display",
    description: "Completion indicator",
    demoKey: "progress",
    code: `<Progress value={66} />`,
  },
  {
    id: "separator",
    name: "Separator",
    category: "layout",
    description: "Visual divider",
    demoKey: "separator",
    code: `<Separator />`,
  },
  {
    id: "accordion",
    name: "Accordion",
    category: "data-display",
    description: "Expandable sections",
    demoKey: "accordion",
    code: `<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it themed?</AccordionTrigger>
    <AccordionContent>Yes — fully token-driven.</AccordionContent>
  </AccordionItem>
</Accordion>`,
  },
  {
    id: "collapsible",
    name: "Collapsible",
    category: "data-display",
    description: "Show/hide content",
    demoKey: "collapsible",
    code: `<Collapsible open={open} onOpenChange={setOpen}>
  <CollapsibleTrigger asChild><Button>Toggle</Button></CollapsibleTrigger>
  <CollapsibleContent>Hidden content</CollapsibleContent>
</Collapsible>`,
  },
  {
    id: "carousel",
    name: "Carousel",
    category: "data-display",
    description: "Swipeable slides",
    demoKey: "carousel",
    code: `<Carousel>
  <CarouselContent>
    <CarouselItem>Slide 1</CarouselItem>
  </CarouselContent>
</Carousel>`,
  },
  {
    id: "breadcrumb",
    name: "Breadcrumb",
    category: "navigation",
    description: "Hierarchy trail",
    demoKey: "breadcrumb",
    code: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbPage>Components</BreadcrumbPage></BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
  },
  {
    id: "navigation-menu",
    name: "Navigation Menu",
    category: "navigation",
    description: "Site navigation",
    demoKey: "navigationMenu",
    code: `<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuLink href="/">Home</NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`,
  },
  {
    id: "menubar",
    name: "Menubar",
    category: "navigation",
    description: "Desktop menu bar",
    demoKey: "menubar",
    code: `<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent><MenubarItem>New</MenubarItem></MenubarContent>
  </MenubarMenu>
</Menubar>`,
  },
  {
    id: "pagination",
    name: "Pagination",
    category: "navigation",
    description: "Page controls",
    demoKey: "pagination",
    code: `<Pagination>
  <PaginationContent>
    <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
    <PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem>
    <PaginationItem><PaginationNext href="#" /></PaginationItem>
  </PaginationContent>
</Pagination>`,
  },
  {
    id: "sidebar",
    name: "Sidebar",
    category: "navigation",
    description: "Collapsible app shell",
    demoKey: "sidebar",
    code: `<SidebarProvider>
  <Sidebar><SidebarContent>...</SidebarContent></Sidebar>
  <main><SidebarTrigger /></main>
</SidebarProvider>`,
  },
  {
    id: "tabs",
    name: "Tabs",
    category: "navigation",
    description: "Tabbed panels",
    demoKey: "tabs",
    code: `<Tabs defaultValue="account">
  <TabsList><TabsTrigger value="account">Account</TabsTrigger></TabsList>
  <TabsContent value="account">Settings</TabsContent>
</Tabs>`,
  },
  {
    id: "alert",
    name: "Alert",
    category: "feedback",
    description: "Inline message banner",
    demoKey: "alert",
    code: `<Alert>
  <AlertCircleIcon />
  <AlertTitle>Heads up</AlertTitle>
  <AlertDescription>Your trial ends in 3 days.</AlertDescription>
</Alert>`,
  },
  {
    id: "sonner",
    name: "Sonner",
    category: "feedback",
    description: "Toast notifications",
    demoKey: "sonner",
    code: `import { toast } from "sonner"
<Button onClick={() => toast.success("Saved!")}>Show toast</Button>`,
  },
  {
    id: "toast",
    name: "Toast",
    category: "feedback",
    description: "Radix toast primitive",
    demoKey: "toast",
    code: `import { toast } from "@/hooks/use-toast"
toast({ title: "Scheduled", description: "Meeting at 3pm" })`,
  },
  {
    id: "tooltip",
    name: "Tooltip",
    category: "feedback",
    description: "Hover hint",
    demoKey: "tooltip",
    code: `<Tooltip>
  <TooltipTrigger asChild><Button variant="outline">Hover</Button></TooltipTrigger>
  <TooltipContent>Add to library</TooltipContent>
</Tooltip>`,
  },
  {
    id: "hover-card",
    name: "Hover Card",
    category: "feedback",
    description: "Rich hover preview",
    demoKey: "hoverCard",
    code: `<HoverCard>
  <HoverCardTrigger>@decathemes</HoverCardTrigger>
  <HoverCardContent>Profile preview</HoverCardContent>
</HoverCard>`,
  },
  {
    id: "dialog",
    name: "Dialog",
    category: "overlay",
    description: "Modal dialog",
    demoKey: "dialog",
    code: `<Dialog>
  <DialogTrigger asChild><Button>Open</Button></DialogTrigger>
  <DialogContent><DialogHeader><DialogTitle>Edit</DialogTitle></DialogHeader></DialogContent>
</Dialog>`,
  },
  {
    id: "alert-dialog",
    name: "Alert Dialog",
    category: "overlay",
    description: "Confirmation modal",
    demoKey: "alertDialog",
    code: `<AlertDialog>
  <AlertDialogTrigger asChild><Button variant="destructive">Delete</Button></AlertDialogTrigger>
  <AlertDialogContent>...</AlertDialogContent>
</AlertDialog>`,
  },
  {
    id: "sheet",
    name: "Sheet",
    category: "overlay",
    description: "Side panel",
    demoKey: "sheet",
    code: `<Sheet>
  <SheetTrigger asChild><Button variant="outline">Open sheet</Button></SheetTrigger>
  <SheetContent><SheetHeader><SheetTitle>Filters</SheetTitle></SheetHeader></SheetContent>
</Sheet>`,
  },
  {
    id: "drawer",
    name: "Drawer",
    category: "overlay",
    description: "Bottom drawer (mobile)",
    demoKey: "drawer",
    code: `<Drawer>
  <DrawerTrigger asChild><Button variant="outline">Open drawer</Button></DrawerTrigger>
  <DrawerContent>...</DrawerContent>
</Drawer>`,
  },
  {
    id: "popover",
    name: "Popover",
    category: "overlay",
    description: "Floating content",
    demoKey: "popover",
    code: `<Popover>
  <PopoverTrigger asChild><Button variant="outline">Open</Button></PopoverTrigger>
  <PopoverContent>Dimensions</PopoverContent>
</Popover>`,
  },
  {
    id: "dropdown-menu",
    name: "Dropdown Menu",
    category: "overlay",
    description: "Action menu",
    demoKey: "dropdownMenu",
    code: `<DropdownMenu>
  <DropdownMenuTrigger asChild><Button variant="outline">Actions</Button></DropdownMenuTrigger>
  <DropdownMenuContent><DropdownMenuItem>Edit</DropdownMenuItem></DropdownMenuContent>
</DropdownMenu>`,
  },
  {
    id: "context-menu",
    name: "Context Menu",
    category: "overlay",
    description: "Right-click menu",
    demoKey: "contextMenu",
    code: `<ContextMenu>
  <ContextMenuTrigger>Right click</ContextMenuTrigger>
  <ContextMenuContent><ContextMenuItem>Copy</ContextMenuItem></ContextMenuContent>
</ContextMenu>`,
  },
  {
    id: "resizable",
    name: "Resizable",
    category: "layout",
    description: "Drag-to-resize panels",
    demoKey: "resizable",
    code: `<ResizablePanelGroup orientation="horizontal">
  <ResizablePanel defaultSize={50}>A</ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize={50}>B</ResizablePanel>
</ResizablePanelGroup>`,
  },
  {
    id: "scroll-area",
    name: "Scroll Area",
    category: "layout",
    description: "Custom scrollbar region",
    demoKey: "scrollArea",
    code: `<ScrollArea className="h-32 w-full rounded-md border p-4">
  {items.map(...)}
</ScrollArea>`,
  },
]

export function getGalleryEntriesByCategory(category: GalleryCategory) {
  return galleryEntries.filter((entry) => entry.category === category)
}
