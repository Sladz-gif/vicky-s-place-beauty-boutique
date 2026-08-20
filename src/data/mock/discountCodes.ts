import type { DiscountCode } from "../types";

export const mockDiscountCodes: DiscountCode[] = [
  {
    code: "WELCOME10",
    type: "percent",
    value: 10,
    active: true,
    minPurchase: 50,
    maxUses: 100,
    usedCount: 45,
    expiresAt: "2024-12-31T23:59:59Z",
  },
  {
    code: "FIRST20",
    type: "percent",
    value: 20,
    active: true,
    minPurchase: 100,
    maxUses: 50,
    usedCount: 12,
    expiresAt: "2024-06-30T23:59:59Z",
  },
  {
    code: "FLAT15",
    type: "fixed",
    value: 15,
    active: true,
    minPurchase: 75,
    maxUses: 75,
    usedCount: 28,
    expiresAt: "2024-09-30T23:59:59Z",
  },
];
