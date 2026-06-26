/** CodeCanyon license tiers — keep in sync across homepage, FAQ, and docs. */
export const codecanyonLicenses = {
  regular: {
    name: "Regular License",
    price: "$49",
    description:
      "For a single end product where end users are not charged (e.g. internal tools, free SaaS, client sites).",
    features: [
      "One end product",
      "Free to end users",
      "Lifetime updates",
      "9 demo pages + 62 blocks",
      "Standard support",
    ],
    cta: "Buy Regular License",
    highlighted: true,
  },
  extended: {
    name: "Extended License",
    price: "$249",
    description:
      "For a single end product that end users can be charged for (e.g. paid SaaS, marketplace, subscription app).",
    features: [
      "Everything in Regular",
      "Charge end users",
      "Commercial SaaS use",
      "Lifetime updates",
      "Priority support channel",
    ],
    cta: "Buy Extended License",
    highlighted: false,
  },
} as const

export const codecanyonLicenseList = [
  codecanyonLicenses.regular,
  codecanyonLicenses.extended,
] as const
