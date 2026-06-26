"use client"

import * as React from "react"

import dynamic from "next/dynamic"

import { AlertCircleIcon, BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react"
import { toast as sonnerToast } from "sonner"

import { GalleryDemoSkeleton } from "@/components/showcase/gallery-demo-skeleton"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertDescription,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertTitle,
  AspectRatio,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Input,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  Label,
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  RadioGroup,
  RadioGroupItem,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  ScrollArea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Skeleton,
  Slider,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui"
import { toast } from "@/hooks/use-toast"

const buttonVariants = [
  "default",
  "secondary",
  "destructive",
  "outline",
  "ghost",
  "link",
] as const

const buttonSizes = ["xs", "sm", "default", "lg"] as const

const badgeVariants = [
  "default",
  "secondary",
  "destructive",
  "outline",
  "ghost",
  "link",
] as const

const alertVariants = [
  "default",
  "secondary",
  "destructive",
  "outline",
  "ghost",
  "link",
] as const

export function ButtonDemo() {
  return (
    <div className="flex flex-col gap-theme-3">
      <div className="flex flex-wrap gap-theme-2">
        {buttonVariants.map((variant) => (
          <Button key={variant} variant={variant} className="capitalize">
            {variant}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap items-end gap-theme-2">
        {buttonSizes.map((size) => (
          <Button key={size} size={size}>
            {size}
          </Button>
        ))}
      </div>
    </div>
  )
}

export function InputDemo() {
  return (
    <div className="grid max-w-sm gap-theme-3">
      <div className="space-y-theme-2">
        <Label htmlFor="input-email">Email</Label>
        <Input id="input-email" type="email" placeholder="you@example.com" />
      </div>
      <div className="space-y-theme-2">
        <Label htmlFor="input-password">Password</Label>
        <Input id="input-password" type="password" defaultValue="••••••••" />
      </div>
    </div>
  )
}

export function TextareaDemo() {
  return (
    <div className="max-w-sm space-y-theme-2">
      <Label htmlFor="textarea-bio">Bio</Label>
      <Textarea
        id="textarea-bio"
        placeholder="Tell us about yourself"
        defaultValue="Building theme-driven UIs with shadcn/ui."
      />
    </div>
  )
}

export function CheckboxDemo() {
  return (
    <div className="flex flex-col gap-theme-3">
      <div className="flex items-center gap-theme-2">
        <Checkbox id="checkbox-terms" defaultChecked />
        <Label htmlFor="checkbox-terms">Accept terms and conditions</Label>
      </div>
      <div className="flex items-center gap-theme-2">
        <Checkbox id="checkbox-marketing" />
        <Label htmlFor="checkbox-marketing">Receive marketing emails</Label>
      </div>
    </div>
  )
}

export function SwitchDemo() {
  return (
    <div className="flex flex-col gap-theme-3">
      <div className="flex items-center gap-theme-2">
        <Switch id="switch-notifications" defaultChecked />
        <Label htmlFor="switch-notifications">Push notifications</Label>
      </div>
      <div className="flex items-center gap-theme-2">
        <Switch id="switch-2fa" />
        <Label htmlFor="switch-2fa">Two-factor authentication</Label>
      </div>
    </div>
  )
}

export function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="comfortable" className="flex flex-col gap-theme-2">
      <div className="flex items-center gap-theme-2">
        <RadioGroupItem value="default" id="radio-default" />
        <Label htmlFor="radio-default">Default</Label>
      </div>
      <div className="flex items-center gap-theme-2">
        <RadioGroupItem value="comfortable" id="radio-comfortable" />
        <Label htmlFor="radio-comfortable">Comfortable</Label>
      </div>
      <div className="flex items-center gap-theme-2">
        <RadioGroupItem value="compact" id="radio-compact" />
        <Label htmlFor="radio-compact">Compact</Label>
      </div>
    </RadioGroup>
  )
}

export function SelectDemo() {
  return (
    <div className="max-w-xs space-y-theme-2">
      <Label htmlFor="gallery-fruit-select">Fruit</Label>
      <Select defaultValue="apple">
        <SelectTrigger id="gallery-fruit-select" aria-label="Fruit">
          <SelectValue placeholder="Pick a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export function SliderDemo() {
  return (
    <div className="max-w-xs space-y-theme-3">
      <div className="space-y-theme-2">
        <div className="flex justify-between text-sm">
          <Label>Volume</Label>
          <span className="text-muted-foreground">60%</span>
        </div>
        <Slider defaultValue={[60]} max={100} step={1} aria-label="Volume" />
      </div>
    </div>
  )
}

export function InputOtpDemo() {
  return (
    <div className="space-y-theme-2">
      <Label>Verification code</Label>
      <InputOTP maxLength={6} defaultValue="123456">
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  )
}

export function LabelDemo() {
  return (
    <div className="flex flex-col gap-theme-2">
      <Label htmlFor="label-demo">Username</Label>
      <Input id="label-demo" defaultValue="decathemes" />
      <p className="text-xs text-muted-foreground">This is your public display name.</p>
    </div>
  )
}

export function FormDemo() {
  return (
    <form
      className="max-w-sm space-y-theme-4"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="space-y-theme-2">
        <Label htmlFor="form-email">Email</Label>
        <Input
          id="form-email"
          type="email"
          placeholder="you@example.com"
          defaultValue="ada@example.com"
        />
      </div>
      <Button type="submit">Subscribe</Button>
    </form>
  )
}

export function ComboboxDemo() {
  return (
    <div className="max-w-xs space-y-theme-2">
      <Label htmlFor="gallery-framework-combo">Framework</Label>
      <Combobox items={["Next.js", "React", "Tailwind"]}>
        <ComboboxInput
          id="gallery-framework-combo"
          placeholder="Select framework"
          aria-label="Select framework"
        />
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}

export function ToggleDemo() {
  return (
    <Toggle aria-label="Toggle italic" defaultPressed>
      <ItalicIcon className="size-4" />
    </Toggle>
  )
}

export function ToggleGroupDemo() {
  return (
    <ToggleGroup type="multiple" variant="outline" defaultValue={["bold"]}>
      <ToggleGroupItem value="bold" aria-label="Bold">
        <BoldIcon className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Italic">
        <ItalicIcon className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Underline">
        <UnderlineIcon className="size-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

export function TableDemo() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Ada Lovelace</TableCell>
          <TableCell>Engineer</TableCell>
          <TableCell className="text-right">
            <Badge variant="secondary">Active</Badge>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Alan Turing</TableCell>
          <TableCell>Researcher</TableCell>
          <TableCell className="text-right">
            <Badge variant="outline">Away</Badge>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export function CardDemo() {
  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Project overview</CardTitle>
        <CardDescription>Q2 performance summary</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Revenue grew 24% compared to last quarter across all regions.
        </p>
      </CardContent>
      <CardFooter>
        <Button size="sm">View report</Button>
      </CardFooter>
    </Card>
  )
}

export function BadgeDemo() {
  return (
    <div className="flex flex-wrap gap-theme-2">
      {badgeVariants.map((variant) => (
        <Badge key={variant} variant={variant} className="capitalize">
          {variant}
        </Badge>
      ))}
    </div>
  )
}

export function AvatarDemo() {
  return (
    <div className="flex items-center gap-theme-3">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
        <AvatarFallback>DT</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm font-medium">Decathemes</p>
        <p className="text-xs text-muted-foreground">@decathemes</p>
      </div>
    </div>
  )
}

export function AspectRatioDemo() {
  return (
    <AspectRatio
      ratio={16 / 9}
      className="max-w-xs overflow-hidden rounded-md bg-muted"
    >
      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
        16:9
      </div>
    </AspectRatio>
  )
}

export function SkeletonDemo() {
  return (
    <div className="flex items-center gap-theme-4">
      <Skeleton className="size-12 rounded-full" />
      <div className="space-y-theme-2">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[160px]" />
      </div>
    </div>
  )
}

export function ProgressDemo() {
  const [progress, setProgress] = React.useState(45)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((value) => (value >= 100 ? 0 : value + 5))
    }, 1200)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="max-w-xs space-y-theme-2">
      <div className="flex justify-between text-sm">
        <Label>Uploading</Label>
        <span className="text-muted-foreground">{progress}%</span>
      </div>
      <Progress value={progress} aria-label="Upload progress" />
    </div>
  )
}

export function SeparatorDemo() {
  return (
    <div className="max-w-xs">
      <div className="space-y-1">
        <p className="text-sm font-medium">Decathemes</p>
        <p className="text-xs text-muted-foreground">Theme system for shadcn/ui</p>
      </div>
      <Separator className="my-theme-4" />
      <p className="text-sm text-muted-foreground">
        Ten curated themes with token-only styling.
      </p>
    </div>
  )
}

export function AccordionDemo() {
  return (
    <Accordion type="single" collapsible defaultValue="item-1" className="max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to WAI-ARIA design patterns.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>Yes. Every surface uses theme tokens only.</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export function CollapsibleDemo() {
  const [open, setOpen] = React.useState(false)

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="max-w-xs">
      <CollapsibleTrigger asChild>
        <Button variant="outline" size="sm">
          {open ? "Hide details" : "Show details"}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-theme-2 rounded-md border p-theme-4 text-sm text-muted-foreground">
        Collapsible content expands and collapses with a smooth animation.
      </CollapsibleContent>
    </Collapsible>
  )
}

export function BreadcrumbDemo() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Gallery</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink className="px-4 py-2 text-sm font-medium">
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className="px-4 py-2 text-sm font-medium">
            Docs
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className="px-4 py-2 text-sm font-medium">
            Gallery
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export function MenubarDemo() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>New tab</MenubarItem>
          <MenubarItem>New window</MenubarItem>
          <MenubarItem>Share</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Undo</MenubarItem>
          <MenubarItem>Redo</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}

export function PaginationDemo() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export function TabsDemo() {
  return (
    <Tabs defaultValue="account" className="max-w-md">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="rounded-md border p-theme-4 text-sm">
        Make changes to your account settings here.
      </TabsContent>
      <TabsContent value="password" className="rounded-md border p-theme-4 text-sm">
        Change your password here.
      </TabsContent>
    </Tabs>
  )
}

export function AlertDemo() {
  return (
    <div className="grid max-w-lg gap-theme-3">
      {alertVariants.map((variant) => (
        <Alert key={variant} variant={variant}>
          <AlertCircleIcon />
          <AlertTitle className="capitalize">{variant} alert</AlertTitle>
          <AlertDescription>
            Token-driven alert styling for the {variant} variant.
          </AlertDescription>
        </Alert>
      ))}
    </div>
  )
}

export function SonnerDemo() {
  return (
    <Button
      variant="outline"
      onClick={() => sonnerToast.success("Changes saved successfully")}
    >
      Show sonner toast
    </Button>
  )
}

export function ToastDemo() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast({
          title: "Scheduled",
          description: "Your meeting starts in 15 minutes.",
        })
      }
    >
      Show toast
    </Button>
  )
}

export function TooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>Helpful tooltip text</TooltipContent>
    </Tooltip>
  )
}

export function HoverCardDemo() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" className="px-0">
          @decathemes
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-64">
        <div className="space-y-1">
          <p className="text-sm font-medium">Decathemes</p>
          <p className="text-xs text-muted-foreground">
            Ten curated themes for shadcn/ui — token-only styling.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when done.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-theme-2 py-theme-2">
          <Label htmlFor="dialog-name">Name</Label>
          <Input id="dialog-name" defaultValue="Ada Lovelace" />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function AlertDialogDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Delete account</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account and
            remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>Make changes to your profile here.</SheetDescription>
        </SheetHeader>
        <div className="mt-theme-4 space-y-theme-2">
          <Label htmlFor="sheet-name">Name</Label>
          <Input id="sheet-name" defaultValue="Ada Lovelace" />
        </div>
      </SheetContent>
    </Sheet>
  )
}

export function DrawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Move goal</DrawerTitle>
          <DrawerDescription>Set your daily activity goal.</DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-4">
          <Slider defaultValue={[75]} max={100} step={1} />
        </div>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="space-y-2">
          <p className="text-sm font-medium">Dimensions</p>
          <p className="text-xs text-muted-foreground">
            Set the width and height for the layer.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function ContextMenuDemo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-24 w-48 items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Back</ContextMenuItem>
        <ContextMenuItem>Forward</ContextMenuItem>
        <ContextMenuItem>Reload</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export function ResizableDemo() {
  return (
    <ResizablePanelGroup
      orientation="horizontal"
      className="min-h-[140px] max-w-md rounded-lg border"
    >
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-theme-4 text-sm">
          Panel A
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-theme-4 text-sm">
          Panel B
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export function ScrollAreaDemo() {
  return (
    <ScrollArea
      className="h-24 w-full max-w-md rounded-md border p-theme-4"
      tabIndex={0}
      aria-label="Scrollable demo content"
    >
      <div className="space-y-2">
        {Array.from({ length: 12 }).map((_, index) => (
          <p key={index} className="text-sm text-muted-foreground">
            Scrollable row {index + 1}
          </p>
        ))}
      </div>
    </ScrollArea>
  )
}

const LazyDatePickerDemo = dynamic(
  () =>
    import("@/components/showcase/gallery-demos-heavy").then((m) => ({
      default: m.DatePickerDemo,
    })),
  { loading: () => <GalleryDemoSkeleton tall />, ssr: false }
)

const LazyCalendarDemo = dynamic(
  () =>
    import("@/components/showcase/gallery-demos-heavy").then((m) => ({
      default: m.CalendarDemo,
    })),
  { loading: () => <GalleryDemoSkeleton tall />, ssr: false }
)

const LazyCommandDemo = dynamic(
  () =>
    import("@/components/showcase/gallery-demos-heavy").then((m) => ({
      default: m.CommandDemo,
    })),
  { loading: () => <GalleryDemoSkeleton tall />, ssr: false }
)

const LazyDataTableDemo = dynamic(
  () =>
    import("@/components/showcase/gallery-demos-heavy").then((m) => ({
      default: m.DataTableDemo,
    })),
  { loading: () => <GalleryDemoSkeleton tall />, ssr: false }
)

const LazyChartDemo = dynamic(
  () =>
    import("@/components/showcase/gallery-demos-heavy").then((m) => ({
      default: m.ChartDemo,
    })),
  { loading: () => <GalleryDemoSkeleton tall />, ssr: false }
)

const LazyCarouselDemo = dynamic(
  () =>
    import("@/components/showcase/gallery-demos-heavy").then((m) => ({
      default: m.CarouselDemo,
    })),
  { loading: () => <GalleryDemoSkeleton tall />, ssr: false }
)

const LazySidebarDemo = dynamic(
  () =>
    import("@/components/showcase/gallery-demos-heavy").then((m) => ({
      default: m.SidebarDemo,
    })),
  { loading: () => <GalleryDemoSkeleton tall />, ssr: false }
)

export const galleryDemos = {
  button: ButtonDemo,
  input: InputDemo,
  textarea: TextareaDemo,
  checkbox: CheckboxDemo,
  switch: SwitchDemo,
  radioGroup: RadioGroupDemo,
  select: SelectDemo,
  slider: SliderDemo,
  inputOtp: InputOtpDemo,
  datePicker: LazyDatePickerDemo,
  calendar: LazyCalendarDemo,
  label: LabelDemo,
  form: FormDemo,
  combobox: ComboboxDemo,
  command: LazyCommandDemo,
  toggle: ToggleDemo,
  toggleGroup: ToggleGroupDemo,
  table: TableDemo,
  dataTable: LazyDataTableDemo,
  card: CardDemo,
  badge: BadgeDemo,
  avatar: AvatarDemo,
  aspectRatio: AspectRatioDemo,
  chart: LazyChartDemo,
  skeleton: SkeletonDemo,
  progress: ProgressDemo,
  separator: SeparatorDemo,
  accordion: AccordionDemo,
  collapsible: CollapsibleDemo,
  carousel: LazyCarouselDemo,
  breadcrumb: BreadcrumbDemo,
  navigationMenu: NavigationMenuDemo,
  menubar: MenubarDemo,
  pagination: PaginationDemo,
  sidebar: LazySidebarDemo,
  tabs: TabsDemo,
  alert: AlertDemo,
  sonner: SonnerDemo,
  toast: ToastDemo,
  tooltip: TooltipDemo,
  hoverCard: HoverCardDemo,
  dialog: DialogDemo,
  alertDialog: AlertDialogDemo,
  sheet: SheetDemo,
  drawer: DrawerDemo,
  popover: PopoverDemo,
  dropdownMenu: DropdownMenuDemo,
  contextMenu: ContextMenuDemo,
  resizable: ResizableDemo,
  scrollArea: ScrollAreaDemo,
} as const
