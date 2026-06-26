import { fieldAndCo, northwindCrm, pulseAnalytics } from "@/lib/demo/brand"

export const chartRevenueMonthly = [
  { month: "Jul", revenue: 31800, orders: 892 },
  { month: "Aug", revenue: 33450, orders: 934 },
  { month: "Sep", revenue: 30120, orders: 878 },
  { month: "Oct", revenue: 36280, orders: 1012 },
  { month: "Nov", revenue: 38940, orders: 1088 },
  { month: "Dec", revenue: 42150, orders: 1164 },
  { month: "Jan", revenue: 39880, orders: 1102 },
  { month: "Feb", revenue: 41560, orders: 1148 },
  { month: "Mar", revenue: 44230, orders: 1196 },
  { month: "Apr", revenue: 46890, orders: 1258 },
  { month: "May", revenue: 45120, orders: 1214 },
  { month: "Jun", revenue: 48290, orders: 1296 },
]

export const chartPerformanceMixed = [
  { month: "Jul", revenue: 31800, visitors: 28400, signups: 412 },
  { month: "Aug", revenue: 33450, visitors: 30120, signups: 438 },
  { month: "Sep", revenue: 30120, visitors: 27680, signups: 391 },
  { month: "Oct", revenue: 36280, visitors: 32450, signups: 467 },
  { month: "Nov", revenue: 38940, visitors: 34890, signups: 502 },
  { month: "Dec", revenue: 42150, visitors: 37210, signups: 548 },
  { month: "Jan", revenue: 39880, visitors: 35640, signups: 521 },
  { month: "Feb", revenue: 41560, visitors: 36180, signups: 536 },
  { month: "Mar", revenue: 44230, visitors: 38420, signups: 571 },
  { month: "Apr", revenue: 46890, visitors: 40180, signups: 604 },
  { month: "May", revenue: 45120, visitors: 39240, signups: 588 },
  { month: "Jun", revenue: 48290, visitors: 41860, signups: 629 },
]

export const pulseStats = [
  {
    title: "Monthly recurring revenue",
    value: "$48,290",
    change: 8.4,
    period: "vs last month",
  },
  {
    title: "Active workspaces",
    value: "1,284",
    change: 5.1,
    period: "vs last month",
  },
  {
    title: "Trial → paid conversion",
    value: "14.2%",
    change: 1.8,
    period: "vs last month",
  },
  {
    title: "Avg. session duration",
    value: "6m 12s",
    change: -2.3,
    period: "vs last month",
  },
]

export const analyticsChannels = [
  { name: "Organic search", sessions: "186k", change: "+14%" },
  { name: "Product-led signup", sessions: "94k", change: "+22%" },
  { name: "Partner referrals", sessions: "41k", change: "+6%" },
  { name: "Paid search", sessions: "38k", change: "+3%" },
  { name: "Direct", sessions: "29k", change: "-4%" },
]

export interface DemoTransaction {
  id: string
  customer: string
  email: string
  plan: string
  status: "paid" | "pending" | "failed" | "refunded"
  amount: number
  date: string
}

export const pulseTransactions: DemoTransaction[] = [
  {
    id: "txn_8f2a",
    customer: "Lumen Systems",
    email: "billing@lumen.systems",
    plan: "Growth",
    status: "paid",
    amount: 249,
    date: "Jun 26, 2026",
  },
  {
    id: "txn_8e91",
    customer: "Harbor Labs",
    email: "ap@harborlabs.io",
    plan: "Scale",
    status: "paid",
    amount: 890,
    date: "Jun 26, 2026",
  },
  {
    id: "txn_8d44",
    customer: "Cedar Works",
    email: "finance@cedarworks.co",
    plan: "Growth",
    status: "pending",
    amount: 249,
    date: "Jun 25, 2026",
  },
  {
    id: "txn_8c12",
    customer: "Northwind Studio",
    email: "ops@northwind.studio",
    plan: "Starter",
    status: "paid",
    amount: 79,
    date: "Jun 25, 2026",
  },
  {
    id: "txn_8b88",
    customer: "Brightline Health",
    email: "subscriptions@brightline.care",
    plan: "Scale",
    status: "failed",
    amount: 890,
    date: "Jun 24, 2026",
  },
  {
    id: "txn_8a31",
    customer: "Atlas Freight",
    email: "billing@atlasfreight.com",
    plan: "Growth",
    status: "paid",
    amount: 249,
    date: "Jun 24, 2026",
  },
  {
    id: "txn_8970",
    customer: "Paper & Pixel",
    email: "hello@paperpixel.design",
    plan: "Starter",
    status: "refunded",
    amount: 79,
    date: "Jun 23, 2026",
  },
  {
    id: "txn_8844",
    customer: "Summit Edu",
    email: "procurement@summitedu.org",
    plan: "Scale",
    status: "paid",
    amount: 890,
    date: "Jun 23, 2026",
  },
]

export const pulseActivity = [
  {
    id: "1",
    user: "Maya Okonkwo",
    action: "upgraded Harbor Labs to Scale",
    time: "4 min ago",
  },
  {
    id: "2",
    user: "Elena Vasquez",
    action: "published funnel report Q2",
    time: "22 min ago",
  },
  {
    id: "3",
    user: "Chris Park",
    action: "invited 4 teammates to Cedar Works",
    time: "1 hr ago",
  },
  {
    id: "4",
    user: "Aisha Rahman",
    action: "connected Stripe revenue source",
    time: "2 hr ago",
  },
  {
    id: "5",
    user: "Tomás Ferreira",
    action: "exported workspace audit log",
    time: "Yesterday",
  },
]

export const crmPipeline = [
  { stage: "Discovery", count: 18, value: "$126k" },
  { stage: "Qualified", count: 11, value: "$198k" },
  { stage: "Proposal", count: 7, value: "$284k" },
  { stage: "Negotiation", count: 4, value: "$156k" },
  { stage: "Won", count: 2, value: "$92k" },
]

export interface CrmContact {
  id: string
  name: string
  company: string
  title: string
  status: "Hot" | "Warm" | "Cold"
  email: string
  deal: string
  value: string
}

export const crmContacts: CrmContact[] = [
  {
    id: "c1",
    name: "Sarah Chen",
    company: "Lumen Systems",
    title: "VP Revenue",
    status: "Hot",
    email: "sarah.chen@lumen.systems",
    deal: "Scale expansion",
    value: "$48k ARR",
  },
  {
    id: "c2",
    name: "Marcus Webb",
    company: "Harbor Labs",
    title: "Head of Ops",
    status: "Warm",
    email: "marcus@harborlabs.io",
    deal: "Multi-seat rollout",
    value: "$22k ARR",
  },
  {
    id: "c3",
    name: "Priya Nair",
    company: "Brightline Health",
    title: "Director of Product",
    status: "Hot",
    email: "priya.nair@brightline.care",
    deal: "Enterprise pilot",
    value: "$96k ARR",
  },
  {
    id: "c4",
    name: "James Okonkwo",
    company: "Atlas Freight",
    title: "CFO",
    status: "Cold",
    email: "j.okonkwo@atlasfreight.com",
    deal: "Renewal discussion",
    value: "$18k ARR",
  },
  {
    id: "c5",
    name: "Elena Marsh",
    company: "Summit Edu",
    title: "Procurement lead",
    status: "Warm",
    email: "e.marsh@summitedu.org",
    deal: "District-wide license",
    value: "$64k ARR",
  },
  {
    id: "c6",
    name: "Noah Kim",
    company: "Paper & Pixel",
    title: "Founder",
    status: "Hot",
    email: "noah@paperpixel.design",
    deal: "Agency bundle",
    value: "$12k ARR",
  },
]

export const fieldAndCoProducts = [
  {
    id: "linen-throw",
    name: "Washed Linen Throw — Stone",
    price: 94,
    category: "Living room",
    description: "Garment-washed European flax, 50×70 in. Gets softer with every wash.",
    accent: "from-chart-1/25 via-chart-2/15 to-muted",
  },
  {
    id: "ceramic-mug",
    name: "Porto Stoneware Mug Set",
    price: 48,
    category: "Kitchen",
    description: "Matte glaze, stackable set of two. Dishwasher and microwave safe.",
    accent: "from-chart-2/20 via-chart-3/10 to-background",
  },
  {
    id: "wool-scarf",
    name: "Merino Herringbone Scarf",
    price: 72,
    category: "Accessories",
    description:
      "17.5 micron merino, charcoal. Lightweight enough for spring evenings.",
    accent: "from-chart-3/25 via-chart-4/15 to-muted",
  },
  {
    id: "desk-lamp",
    name: "Brass Task Lamp",
    price: 138,
    category: "Lighting",
    description: "Adjustable arm, warm 2700K LED, dimmer on cord.",
    accent: "from-chart-4/20 via-chart-5/10 to-background",
  },
  {
    id: "canvas-tote",
    name: "Organic Canvas Tote",
    price: 42,
    category: "Bags",
    description: "14 oz cotton, vegetable-tanned leather handles, interior pocket.",
    accent: "from-primary/20 via-accent/10 to-muted",
  },
  {
    id: "soy-candle",
    name: "Cedar & Vetiver Candle",
    price: 32,
    category: "Home scent",
    description: "Soy wax, cotton wick, 55-hour burn. Refill program available.",
    accent: "from-secondary/30 via-muted to-background",
  },
]

export const materialEditPosts = [
  {
    slug: "linen-care-guide",
    title: "How we wash linen without losing structure",
    excerpt:
      "Our stone throw is garment-washed twice before it ships. Here is the care routine we recommend after two years of customer feedback.",
    category: "Care guides",
    author: "Elena Marsh",
    date: "Jun 18, 2026",
    readTime: "6 min read",
    accent: "from-chart-1/25 via-chart-2/15 to-muted",
  },
  {
    slug: "small-space-styling",
    title: "A 480 sq ft apartment that still feels calm",
    excerpt:
      "Interior stylist Mira Cho layers three textures, two neutrals, and one vintage find — without adding clutter.",
    category: "Interiors",
    author: "James Okonkwo",
    date: "Jun 11, 2026",
    readTime: "5 min read",
    accent: "from-chart-2/20 via-chart-3/10 to-background",
  },
  {
    slug: "ceramic-glazes",
    title: "Inside our Porto kiln partnership",
    excerpt:
      "We spent eighteen months dialing a matte glaze that survives dishwashers and morning coffee rituals alike.",
    category: "Craft",
    author: "Sofia Reyes",
    date: "May 30, 2026",
    readTime: "8 min read",
    accent: "from-chart-3/25 via-chart-4/15 to-muted",
  },
  {
    slug: "sustainable-packaging",
    title: "Plastic-free shipping at scale",
    excerpt:
      "How Field & Co. moved to molded pulp inserts and still keeps breakage under 0.4% on ceramics.",
    category: "Sustainability",
    author: "Elena Marsh",
    date: "May 24, 2026",
    readTime: "4 min read",
    accent: "from-chart-4/20 via-chart-5/10 to-background",
  },
  {
    slug: "seasonal-edit",
    title: "Summer edit: lighter layers for warm evenings",
    excerpt:
      "Breathable throws, linen napkins, and tableware picks from our merchandising team.",
    category: "Seasonal",
    author: "Sofia Reyes",
    date: "May 16, 2026",
    readTime: "3 min read",
    accent: "from-primary/20 via-accent/10 to-muted",
  },
  {
    slug: "merino-basics",
    title: "Why 17.5 micron merino matters",
    excerpt:
      "Soft enough for sensitive skin, structured enough to hold shape season after season.",
    category: "Materials",
    author: "James Okonkwo",
    date: "May 4, 2026",
    readTime: "7 min read",
    accent: "from-secondary/30 via-muted to-background",
  },
]

export const pulseAiThreads = [
  { id: "1", title: "Q3 board metrics summary", active: true },
  { id: "2", title: "Churn post-mortem draft", active: false },
  { id: "3", title: "Onboarding email sequence", active: false },
  { id: "4", title: "SQL: activation funnel", active: false },
]

export const pulseAiMessages = [
  {
    id: "m1",
    role: "user" as const,
    content:
      "Summarize our June activation funnel for the board deck. Focus on trial → paid and time-to-value.",
  },
  {
    id: "m2",
    role: "assistant" as const,
    content:
      "**June activation snapshot**\n\n• Trial signups: 629 (+11% MoM)\n• Trial → paid: 14.2% (+1.8 pts)\n• Median time-to-first-dashboard: 18 minutes\n• Teams inviting ≥2 colleagues in week 1 convert at 2.4× baseline\n\nRecommend highlighting the new onboarding checklist shipped May 28 — correlated with a 9% lift in week-one retention.",
  },
  {
    id: "m3",
    role: "user" as const,
    content: "Give me one slide title and three bullet talking points.",
  },
  {
    id: "m4",
    role: "assistant" as const,
    content:
      "**Slide title:** Activation momentum — faster time-to-value, higher conversion\n\n• Onboarding checklist cut median setup time from 26m → 18m\n• Trial conversion reached 14.2%, highest since March\n• Collaborative workspaces drive 2.4× paid conversion in week one",
  },
]

export const settingsTeam = [
  { name: "Jordan Lee", email: "jordan@pulsehq.io", role: "Owner" },
  { name: "Maya Okonkwo", email: "maya@pulsehq.io", role: "Admin" },
  { name: "Chris Park", email: "chris@pulsehq.io", role: "Analyst" },
  { name: "Aisha Rahman", email: "aisha@pulsehq.io", role: "Member" },
]

export const dashboardCopy = {
  title: "Overview",
  description: `${pulseAnalytics.name} — revenue, retention, and product usage at a glance.`,
}

export const analyticsCopy = {
  title: "Acquisition",
  description: "Channel performance and signup quality across workspaces.",
}

export const crmCopy = {
  title: northwindCrm.name,
  description: "Pipeline, contacts, and open deals synced from Pulse workspaces.",
}

export const storeCopy = {
  name: fieldAndCo.name,
  shippingNote: "Free shipping on orders over $75 · Carbon-neutral delivery",
}

export const blogCopy = {
  publication: "The Material Edit",
  tagline: `Stories on craft, care, and quiet living — from ${fieldAndCo.name}`,
}
