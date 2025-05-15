
export interface Plan {
  id: string;
  name: string;
  price: string;
  features: string[];
  isPopular?: boolean;
  requiresPayment?: boolean;
  paymentMethods?: string[];
}

export const plans: Plan[] = [
  {
    id: "free-plan",
    name: "Free",
    price: "$0",
    features: [
      "Standard Definition (SD)",
      "Watch on one device at a time",
      "Limited content library",
      "Ad-supported streaming",
      "No downloads",
    ],
    requiresPayment: false
  },
  {
    id: "premium-plan",
    name: "Premium",
    price: "$9.99",
    features: [
      "Full HD (1080p)",
      "Watch on two devices at a time",
      "Full content library",
      "Ad-free streaming",
      "Download on one device",
      "Multiple payment methods",
      "Priority support"
    ],
    isPopular: true,
    requiresPayment: true,
    paymentMethods: ["credit-card", "paypal", "digital-wallet"]
  },
  {
    id: "master-plan",
    name: "Master",
    price: "$14.99",
    features: [
      "Ultra HD (4K) and HDR",
      "Watch on four devices at a time",
      "Full content library + exclusive content",
      "Ad-free streaming",
      "Download on four devices",
      "All payment methods",
      "Premium customer support",
      "Early access to new releases"
    ],
    requiresPayment: true,
    paymentMethods: ["credit-card", "paypal", "digital-wallet"]
  }
];
