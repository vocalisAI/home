// Monthly tiers. Matches production and the 04_Pricing_Structure slide.
export const OVERAGE_PER_MIN = 0.12;

export const PLANS = [
  {
    id: "starter",
    name: "Starter",
    monthly: 299,
    included: 1500,
    target: "Solo or new clinic",
    features: [
      "Voice receptionist",
      "Appointment and callback requests",
      "Calendar integration, scoped during onboarding",
      "Email and chat support",
    ],
  },
  {
    id: "standard",
    name: "Standard",
    monthly: 499,
    included: 3000,
    target: "One to two provider clinic",
    popular: true,
    features: [
      "Everything in Starter",
      "Voice personality tuning",
      "Priority support line",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    monthly: 899,
    included: 6000,
    target: "Multi-provider and larger practices",
    features: [
      "Everything in Standard",
      "Multi-location setup",
      "Dedicated support line",
    ],
  },
];
