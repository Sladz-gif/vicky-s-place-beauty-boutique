// Data access layer - functions that currently read from mock data
// but are structured to easily swap for real API calls later
// In production, these would be replaced with actual fetch() calls to a backend

import { mockProducts } from "./mock/products";
import { mockCategories } from "./mock/categories";
import { mockBrands } from "./mock/brands";
import { mockCustomers } from "./mock/customers";
import { mockOrders } from "./mock/orders";
import { mockStaff } from "./mock/staff";
import { mockReviews } from "./mock/reviews";
import { mockDiscountCodes } from "./mock/discountCodes";
import { mockFinanceTransactions } from "./mock/finance";
import { mockTasks } from "./mock/tasks";
import { mockCalendarEvents } from "./mock/calendar";
import { mockActivityLog } from "./mock/activityLog";
import { mockContentPages } from "./mock/content";
import type {
  Product,
  Category,
  Brand,
  Customer,
  Order,
  Staff,
  Review,
  DiscountCode,
  FinanceTransaction,
  Task,
  CalendarEvent,
  ActivityLogEntry,
  ContentPage,
  Variant,
} from "./types";

// Simulate network delay for realistic UX (reduced for better responsiveness)
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// PRODUCTS
export async function getProducts(): Promise<Product[]> {
  await delay(10);
  return mockProducts.filter((p) => p.status === "active");
}

export async function getProductById(id: string): Promise<Product | undefined> {
  await delay(5);
  return mockProducts.find((p) => p.id === id);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  await delay(5);
  return mockProducts.find((p) => p.slug === slug);
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  await delay(10);
  return mockProducts.filter((p) => p.category === categorySlug && p.status === "active");
}

export async function getProductsByBrand(brandSlug: string): Promise<Product[]> {
  await delay(10);
  return mockProducts.filter((p) => p.brand === brandSlug && p.status === "active");
}

export async function searchProducts(query: string): Promise<Product[]> {
  await delay(15);
  const lowerQuery = query.toLowerCase();
  return mockProducts.filter(
    (p) =>
      p.status === "active" &&
      (p.name.toLowerCase().includes(lowerQuery) ||
        p.brand.toLowerCase().includes(lowerQuery) ||
        p.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))),
  );
}

export async function getVariantById(variantId: string): Promise<Variant | undefined> {
  await delay(5);
  for (const product of mockProducts) {
    const variant = product.variants.find((v) => v.id === variantId);
    if (variant) return variant;
  }
  return undefined;
}

// CATEGORIES
export async function getCategories(): Promise<Category[]> {
  await delay(5);
  return mockCategories;
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  await delay(5);
  return mockCategories.find((c) => c.slug === slug);
}

// BRANDS
export async function getBrands(): Promise<Brand[]> {
  await delay(5);
  return mockBrands;
}

export async function getBrandBySlug(slug: string): Promise<Brand | undefined> {
  await delay(5);
  return mockBrands.find((b) => b.slug === slug);
}

// CUSTOMERS
export async function getCustomers(): Promise<Customer[]> {
  await delay(10);
  return mockCustomers;
}

export async function getCustomerById(id: string): Promise<Customer | undefined> {
  await delay(5);
  return mockCustomers.find((c) => c.id === id);
}

export async function getCustomerByEmail(email: string): Promise<Customer | undefined> {
  await delay(5);
  return mockCustomers.find((c) => c.email === email);
}

// ORDERS
export async function getOrders(): Promise<Order[]> {
  await delay(10);
  return mockOrders;
}

export async function getOrderById(id: string): Promise<Order | undefined> {
  await delay(5);
  return mockOrders.find((o) => o.id === id);
}

export async function getOrdersByCustomerId(customerId: string): Promise<Order[]> {
  await delay(10);
  return mockOrders.filter((o) => o.customerId === customerId);
}

export async function getOrdersByStatus(status: Order["status"]): Promise<Order[]> {
  await delay(10);
  return mockOrders.filter((o) => o.status === status);
}

// STAFF
export async function getStaff(): Promise<Staff[]> {
  await delay(10);
  return mockStaff.filter((s) => s.active);
}

export async function getStaffById(id: string): Promise<Staff | undefined> {
  await delay(5);
  return mockStaff.find((s) => s.id === id);
}

export async function loginStaff(loginCode: string): Promise<Staff | null> {
  await delay(10);
  const staff = mockStaff.find((s) => s.loginCode === loginCode && s.active);
  return staff || null;
}

// REVIEWS
export async function getReviews(): Promise<Review[]> {
  await delay(10);
  return mockReviews;
}

export async function getReviewsByProductId(productId: string): Promise<Review[]> {
  await delay(5);
  return mockReviews.filter((r) => r.productId === productId);
}

export async function getApprovedReviews(): Promise<Review[]> {
  await delay(10);
  return mockReviews.filter((r) => r.status === "approved");
}

export async function getApprovedReviewsByProductId(productId: string): Promise<Review[]> {
  await delay(5);
  return mockReviews.filter((r) => r.productId === productId && r.status === "approved");
}

// DISCOUNT CODES
export async function getDiscountCodes(): Promise<DiscountCode[]> {
  await delay(10);
  return mockDiscountCodes;
}

export async function getDiscountCodeByCode(code: string): Promise<DiscountCode | undefined> {
  await delay(5);
  return mockDiscountCodes.find((d) => d.code === code && d.active);
}

export async function validateDiscountCode(
  code: string,
  cartTotal: number,
): Promise<DiscountCode | null> {
  await delay(10);
  const discount = mockDiscountCodes.find((d) => d.code === code && d.active);
  if (!discount) return null;
  if (discount.minPurchase && cartTotal < discount.minPurchase) return null;
  if (discount.maxUses && discount.usedCount! >= discount.maxUses) return null;
  if (discount.expiresAt && new Date(discount.expiresAt) < new Date()) return null;
  return discount;
}

// FINANCE
export async function getFinanceTransactions(): Promise<FinanceTransaction[]> {
  await delay(10);
  return mockFinanceTransactions;
}

export async function getFinanceTransactionsByType(
  type: FinanceTransaction["type"],
): Promise<FinanceTransaction[]> {
  await delay(10);
  return mockFinanceTransactions.filter((t) => t.type === type);
}

export async function getFinanceTransactionsByDateRange(
  startDate: Date,
  endDate: Date,
): Promise<FinanceTransaction[]> {
  await delay(10);
  return mockFinanceTransactions.filter((t) => {
    const date = new Date(t.date);
    return date >= startDate && date <= endDate;
  });
}

// TASKS
export async function getTasks(): Promise<Task[]> {
  await delay(10);
  return mockTasks;
}

export async function getTasksByStatus(status: Task["status"]): Promise<Task[]> {
  await delay(5);
  return mockTasks.filter((t) => t.status === status);
}

export async function getTasksByAssignedTo(staffId: string): Promise<Task[]> {
  await delay(5);
  return mockTasks.filter((t) => t.assignedTo === staffId);
}

// CALENDAR
export async function getCalendarEvents(): Promise<CalendarEvent[]> {
  await delay(10);
  return mockCalendarEvents;
}

export async function getCalendarEventsByDate(date: string): Promise<CalendarEvent[]> {
  await delay(5);
  return mockCalendarEvents.filter((e) => e.date === date);
}

export async function getCalendarEventsByStaff(staffId: string): Promise<CalendarEvent[]> {
  await delay(5);
  return mockCalendarEvents.filter((e) => e.staffIds.includes(staffId));
}

// ACTIVITY LOG
export async function getActivityLog(): Promise<ActivityLogEntry[]> {
  await delay(10);
  return mockActivityLog;
}

export async function getActivityLogByStaff(staffId: string): Promise<ActivityLogEntry[]> {
  await delay(5);
  return mockActivityLog.filter((a) => a.staffId === staffId);
}

export async function getActivityLogByEntityType(
  entityType: ActivityLogEntry["entityType"],
): Promise<ActivityLogEntry[]> {
  await delay(5);
  return mockActivityLog.filter((a) => a.entityType === entityType);
}

export async function getActivityLogByDateRange(
  startDate: Date,
  endDate: Date,
): Promise<ActivityLogEntry[]> {
  await delay(10);
  return mockActivityLog.filter((a) => {
    const date = new Date(a.timestamp);
    return date >= startDate && date <= endDate;
  });
}

// CONTENT
export async function getContentPages(): Promise<ContentPage[]> {
  await delay(10);
  return mockContentPages;
}

export async function getContentPageBySlug(slug: string): Promise<ContentPage | undefined> {
  await delay(5);
  return mockContentPages.find((c) => c.slug === slug);
}

// UTILITY FUNCTIONS
export function formatPrice(amount: number): string {
  return `₵${amount.toLocaleString("en-GH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-GH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleString("en-GH", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getStockStatus(variant: Variant): "in-stock" | "low-stock" | "out-of-stock" {
  if (variant.stockQty === 0) return "out-of-stock";
  if (variant.stockQty <= variant.reorderPoint) return "low-stock";
  return "in-stock";
}

export function calculateDiscount(subtotal: number, discountCode: DiscountCode): number {
  if (discountCode.type === "percent") {
    return (subtotal * discountCode.value) / 100;
  }
  return discountCode.value;
}

export function calculateDeliveryFee(subtotal: number): number {
  return subtotal >= 100 ? 0 : 15;
}

// Activity logging helper - called from mutation functions to track changes
// This appends to the mock activity log for session tracking
export function logActivity(entry: Omit<ActivityLogEntry, "id" | "timestamp">): ActivityLogEntry {
  const newEntry: ActivityLogEntry = {
    ...entry,
    id: `act-${Date.now()}`,
    timestamp: new Date().toISOString(),
  };
  mockActivityLog.unshift(newEntry); // Add to beginning of array
  return newEntry;
}
