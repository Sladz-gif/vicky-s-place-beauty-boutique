// Core data types for Vicky's Place - matching future DB schema

export type Product = {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: string;
  description: string;
  ingredients: string;
  howToUse: string;
  basePrice: number; // GHS
  sku: string;
  barcode?: string; // For product scanning
  status: "active" | "draft" | "archived";
  images: string[];
  variants: Variant[];
  tags: string[];
  featured?: boolean;
  popularity?: number;
  createdAt: string;
  supplierId?: string; // Link to supplier
  costPrice?: number; // For profit calculations
  location?: string; // Physical location in store
};

export type Variant = {
  id: string;
  productId: string;
  label: string; // size/shade
  skuSuffix: string;
  priceOverride?: number;
  stockQty: number;
  reorderPoint: number;
  maxStock?: number; // Maximum stock level
  location?: string; // Physical location in store
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  parentId?: string;
  description: string;
  image: string;
};

export type Brand = {
  id: string;
  name: string;
  slug: string;
  description?: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
  createdAt: string;
};

export type Address = {
  id: string;
  label: string; // "Home", "Work", etc.
  region: string; // Ghana region
  city: string;
  digitalGpsAddress: string; // GhanaPost GPS
  landmark: string;
  isDefault: boolean;
};

export type Order = {
  id: string;
  customerId?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  shippingAddress?: Address;
  status: "pending" | "paid" | "fulfilled" | "shipped" | "delivered" | "returned" | "cancelled";
  items: OrderItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  paymentMethod: "card" | "mtn_momo" | "vodafone_cash" | "airteltigo_money" | "cash";
  discountCode?: string;
  placedAt: string;
  updatedAt: string;
  notes?: string;
  orderType?: "online" | "instore"; // Track order source
  staffId?: string; // Staff who processed the order
};

export type OrderItem = {
  variantId: string;
  productId: string;
  productName: string;
  variantLabel: string;
  qty: number;
  priceAtPurchase: number;
};

export type CartItem = {
  variantId: string;
  productId: string;
  qty: number;
};

export type Review = {
  id: string;
  productId: string;
  customerName: string;
  rating: number;
  title: string;
  body: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
};

export type DiscountCode = {
  code: string;
  type: "percent" | "fixed";
  value: number;
  active: boolean;
  minPurchase?: number;
  maxUses?: number;
  usedCount?: number;
  expiresAt?: string;
};

export type Staff = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  loginCode: string;
  role: "admin" | "manager" | "staff";
  moduleAccess: ("inventory" | "finance" | "orders" | "ops" | "reports")[];
  active: boolean;
  createdAt: string;
  hourlyRate?: number; // For payroll calculations
  schedule?: StaffSchedule; // Work schedule
};

export type ActivityLogEntry = {
  id: string;
  staffId: string;
  staffName: string;
  action: string;
  entityType: "product" | "order" | "customer" | "staff" | "discount" | "content" | "finance";
  entityId: string;
  entityName: string;
  before?: Record<string, unknown>;
  after?: Record<string, unknown>;
  timestamp: string;
};

export type FinanceTransaction = {
  id: string;
  type: "revenue" | "expense";
  category: string;
  amount: number;
  relatedOrderId?: string;
  note: string;
  date: string;
  createdAt: string;
};

export type Task = {
  id: string;
  title: string;
  assignedTo: string; // staff ID
  status: "todo" | "doing" | "done";
  dueDate: string;
  createdAt: string;
};

export type CalendarEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  staffIds: string[];
  description?: string;
  createdAt: string;
};

export type ContentPage = {
  slug: string;
  title: string;
  content: string;
  updatedAt: string;
};

// Business Management Types
export type Supplier = {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  paymentTerms: string;
  leadTime: number; // Days
  active: boolean;
  createdAt: string;
};

export type PurchaseOrder = {
  id: string;
  supplierId: string;
  supplierName: string;
  status: "draft" | "ordered" | "received" | "cancelled";
  items: PurchaseOrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  orderDate: string;
  expectedDeliveryDate: string;
  receivedDate?: string;
  notes?: string;
  createdBy: string;
  createdAt: string;
};

export type PurchaseOrderItem = {
  productId: string;
  productName: string;
  variantId?: string;
  variantLabel?: string;
  qty: number;
  costPrice: number;
  total: number;
};

export type StaffSchedule = {
  id: string;
  staffId: string;
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  breakStart?: string;
  breakEnd?: string;
};

export type Shift = {
  id: string;
  staffId: string;
  staffName: string;
  date: string;
  startTime: string;
  endTime: string;
  actualStartTime?: string;
  actualEndTime?: string;
  status: "scheduled" | "clocked_in" | "clocked_out" | "missed";
  salesAmount?: number; // Sales during shift
};

export type CashReconciliation = {
  id: string;
  date: string;
  staffId: string;
  staffName: string;
  openingBalance: number;
  cashSales: number;
  cardSales: number;
  mobileMoneySales: number;
  // posSales: number; // Removed - POS feature discontinued
  totalSales: number;
  cashIn: number;
  cashOut: number;
  expectedCash: number;
  actualCash: number;
  variance: number;
  notes?: string;
  reconciledBy: string;
  reconciledAt: string;
};

export type LoyaltyProgram = {
  id: string;
  name: string;
  pointsPerCedi: number;
  redemptionRate: number; // Points per GHS discount
  active: boolean;
  createdAt: string;
};

export type LoyaltyMember = {
  id: string;
  customerId: string;
  customerName: string;
  programId: string;
  points: number;
  tier: "bronze" | "silver" | "gold" | "platinum";
  joinedAt: string;
  lastActivityAt: string;
};

export type SalesReport = {
  id: string;
  period: "daily" | "weekly" | "monthly" | "yearly";
  startDate: string;
  endDate: string;
  totalRevenue: number;
  totalCost: number;
  grossProfit: number;
  profitMargin: number;
  totalOrders: number;
  averageOrderValue: number;
  topSellingProducts: { productId: string; productName: string; qty: number; revenue: number }[];
  salesByPaymentMethod: { method: string; amount: number; percentage: number }[];
  salesByCategory: { category: string; amount: number; percentage: number }[];
  generatedAt: string;
};
