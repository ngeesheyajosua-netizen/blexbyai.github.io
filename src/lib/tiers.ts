export const TIERS = [
  {
    id: "basic" as const,
    name: "Basic",
    price: 3.99,
    tagline: "Try it out",
    features: [
      "1 trade pair only",
      "Standard execution speed",
      "No risk or profit boosters",
      "Community support",
    ],
  },
  {
    id: "bronze" as const,
    name: "Bronze Premium",
    price: 8.99,
    tagline: "Very limited benefits",
    features: [
      "Up to 2/3 open trades",
      "Basic risk filter",
      "3 asset pairs",
      "Email support",
    ],
  },
  {
    id: "silver" as const,
    name: "Silver Premium",
    price: 19.99,
    tagline: "Reduced benefits",
    features: [
      "Up to 8 open trades",
      "Reduced profit boosters",
      "Enhanced risk mitigation",
      "Priority support",
    ],
  },
  {
    id: "gold" as const,
    name: "Gold Premium",
    price: 29.99,
    tagline: "Full platform access",
    highlight: true,
    features: [
      "Unlimited open trades",
      "Full profit boosters suite",
      "Full risk management toolkit",
      "All asset pairs unlocked",
      "24/7 dedicated expert",
      "Beta feature access",
    ],
  },
];

export type TierDef = typeof TIERS[number];
