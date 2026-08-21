# Admin Page Freezing Issue

## Problem Description

The admin dashboard page (`/admin`) freezes after staying on it for a short period (seconds to minutes). The browser becomes unresponsive, and the user cannot even inspect the page to view console logs. The browser displays a message asking the user to either wait for the page to become responsive or exit.

**Timeline:**
- Initial report: Page freezes after staying on admin page for a while
- First attempt: Added `useMemo` to activity log slice - **FAILED**
- Second attempt: Added `useMemo` and `useCallback` to AdminNav and store - **FAILED** (froze faster)
- Third attempt: Added `useMemo` and `useCallback` to AdminLayout - **FAILED** (froze even faster)

## Routing Structure

### Route Hierarchy
```
/admin (admin.tsx) - Layout wrapper
  ├── /admin/ (admin.index.tsx) - Dashboard (FREEZES HERE)
  ├── /admin/pos (admin.pos.tsx) - Point of Sale
  ├── /admin/products (admin.products.tsx) - Products management
  ├── /admin/categories (admin.categories.tsx) - Categories management
  ├── /admin/orders (admin.orders.tsx) - Orders management
  ├── /admin/customers (admin.customers.tsx) - Customers management
  ├── /admin/finance (admin.finance.tsx) - Finance section
  ├── /admin/suppliers (admin.suppliers.tsx) - Suppliers management
  ├── /admin/purchase-orders (admin.purchase-orders.tsx) - Purchase orders
  ├── /admin/reports (admin.reports.tsx) - Reports
  ├── /admin/loyalty (admin.loyalty.tsx) - Loyalty program
  ├── /admin/reconciliation (admin.reconciliation.tsx) - Reconciliation
  ├── /admin/ops/tasks (admin.ops.tasks.tsx) - Tasks
  ├── /admin/ops/calendar (admin.ops.calendar.tsx) - Calendar
  ├── /admin/ops/staff (admin.ops.staff.tsx) - Staff management
  ├── /admin/ops/activity (admin.ops.activity.tsx) - Activity log
  └── /admin/ops/content (admin.ops.content.tsx) - Content management
```

### Route Files

#### `src/routes/admin.tsx`
This is the layout wrapper that uses `AdminLayout` component.

```tsx
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { Package, ShoppingCart, Users, TrendingUp, ArrowRight } from "lucide-react";
import { AdminLayout } from "@/components/AdminLayout";
import { mockActivityLog } from "@/data/mock/activityLog";
import { formatDateTime } from "@/data/api";
import type { ActivityLogEntry } from "@/data/types";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Vicky's Place" },
      {
        name: "description",
        content: "Manage products, orders, and customers for Vicky's Place.",
      },
    ],
  }),
  component: AdminDashboard,
});

function AdminDashboard() {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}
```

#### `src/routes/admin.index.tsx`
This is the actual dashboard component that freezes.

```tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { Package, ShoppingCart, Users, TrendingUp, ArrowRight } from "lucide-react";
import { mockActivityLog } from "@/data/mock/activityLog";
import { formatDateTime } from "@/data/api";
import type { ActivityLogEntry } from "@/data/types";
import { useMemo } from "react";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Vicky's Place" },
      {
        name: "description",
        content: "Manage products, orders, and customers for Vicky's Place.",
      },
    ],
  }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const recentActivity = useMemo(() => mockActivityLog.slice(0, 5), []);

  return (
    <div className="p-4 lg:p-8 w-full max-w-full overflow-x-hidden">
      <div className="flex items-center justify-between mb-6 lg:mb-8 w-full">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl lg:text-2xl md:text-3xl truncate">Dashboard</h1>
        </div>
        <Link
          to="/"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground shrink-0 ml-2"
        >
          Back to store
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full">
        <DashboardCard
          title="Total Revenue"
          value="₵45,230"
          change="+12.5%"
          icon={TrendingUp}
          positive
        />
        <DashboardCard
          title="Total Orders"
          value="234"
          change="+8.2%"
          icon={ShoppingCart}
          positive
        />
        <DashboardCard title="Products" value="16" change="Active" icon={Package} />
        <DashboardCard title="Customers" value="89" change="+15" icon={Users} positive />
      </div>

      <div className="mt-8 lg:mt-12 grid gap-6 lg:gap-8 grid-cols-1 lg:grid-cols-2 w-full">
        <SectionCard title="Recent Orders" link="/admin/orders" linkText="View all orders">
          <div className="space-y-4">
            {[
              { id: "ORD-001", customer: "Ama Mensah", total: "₵120", status: "Pending" },
              { id: "ORD-002", customer: "Kofi Asante", total: "₵85", status: "Shipped" },
              { id: "ORD-003", customer: "Abena Osei", total: "₵210", status: "Delivered" },
              { id: "ORD-004", customer: "Kwame Boateng", total: "₵45", status: "Pending" },
            ].map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between rounded-lg border border-border bg-card p-4 w-full"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-semibold truncate">{order.id}</p>
                  <p className="text-sm text-muted-foreground truncate">{order.customer}</p>
                </div>
                <div className="text-right shrink-0 ml-2">
                  <p className="font-semibold">{order.total}</p>
                  <p className="text-sm text-muted-foreground">{order.status}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Low Stock Alerts" link="/admin/products" linkText="Manage products">
          <div className="space-y-4">
            {[
              { name: "Glow Serum", stock: 3, threshold: 5 },
              { name: "Hydrating Mist", stock: 2, threshold: 5 },
              { name: "Night Cream", stock: 4, threshold: 5 },
            ].map((product) => (
              <div
                key={product.name}
                className="flex items-center justify-between rounded-lg border border-border bg-card p-4 w-full"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-semibold truncate">{product.name}</p>
                  <p className="text-sm text-muted-foreground truncate">
                    {product.stock} left (threshold: {product.threshold})
                  </p>
                </div>
                <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600 shrink-0 ml-2">
                  Low Stock
                </span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="Recent Activity"
          link="/admin/ops/activity"
          linkText="View all activity"
        >
          <div className="space-y-4">
            {recentActivity.map((entry: ActivityLogEntry) => (
              <div
                key={entry.id}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 w-full"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm break-words">
                    <span className="font-semibold">{entry.staffName}</span>
                    <span className="text-muted-foreground"> {entry.action} </span>
                    <span className="font-semibold">{entry.entityName}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDateTime(entry.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

function DashboardCard({
  title,
  value,
  change,
  icon: Icon,
  positive,
}: {
  title: string;
  value: string;
  change: string;
  icon: React.ComponentType<{ className?: string }>;
  positive?: boolean;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <Icon className="h-5 w-5 text-muted-foreground" />
        <span
          className={`text-xs font-semibold ${
            positive ? "text-green-600" : "text-muted-foreground"
          }`}
        >
          {change}
        </span>
      </div>
      <p className="mt-4 text-2xl font-semibold">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{title}</p>
    </div>
  );
}

function SectionCard({
  title,
  link,
  linkText,
  children,
}: {
  title: string;
  link: string;
  linkText: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-lg">{title}</h3>
        <Link to={link} className="text-sm text-primary hover:underline">
          {linkText} →
        </Link>
      </div>
      <div className="mt-6">{children}</div>
    </div>
  );
}
```

## Components Involved

### `src/components/AdminLayout.tsx`

The layout component that wraps all admin pages. Contains sidebar navigation and mobile menu.

```tsx
import { Link, useLocation, useRouter } from "@tanstack/react-router";
import {
  LogOut,
  Menu,
  X,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  Calendar,
  CheckSquare,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Star,
  DollarSign,
} from "lucide-react";
import { useState, useMemo, useCallback } from "react";

interface NavItem {
  label: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboard },
  { label: "POS", to: "/admin/pos", icon: ShoppingCart },
  { label: "Products", to: "/admin/products", icon: Package },
  { label: "Categories", to: "/admin/categories", icon: Package },
  { label: "Orders", to: "/admin/orders", icon: ShoppingCart },
  { label: "Customers", to: "/admin/customers", icon: Users },
  { label: "Finance", to: "/admin/finance", icon: TrendingUp },
  { label: "Suppliers", to: "/admin/suppliers", icon: Users },
  { label: "Purchase Orders", to: "/admin/purchase-orders", icon: Package },
  { label: "Reports", to: "/admin/reports", icon: TrendingUp },
  { label: "Loyalty", to: "/admin/loyalty", icon: Star },
  { label: "Reconciliation", to: "/admin/reconciliation", icon: DollarSign },
  { label: "Tasks", to: "/admin/ops/tasks", icon: CheckSquare },
  { label: "Calendar", to: "/admin/ops/calendar", icon: Calendar },
  { label: "Staff", to: "/admin/ops/staff", icon: Users },
  { label: "Activity", to: "/admin/ops/activity", icon: FileText },
  { label: "Content", to: "/admin/ops/content", icon: FileText },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  const toggleSidebarCollapsed = useCallback(() => {
    setSidebarCollapsed((prev) => !prev);
  }, []);

  const expandSidebar = useCallback(() => {
    setSidebarCollapsed(false);
  }, []);

  const sidebarClassName = useMemo(() => {
    return `hidden lg:block border-r border-border bg-background h-screen fixed top-0 left-0 flex-shrink-0 transition-all duration-300 z-30 ${sidebarCollapsed ? "w-16" : "w-64"}`;
  }, [sidebarCollapsed]);

  const mainContentClassName = useMemo(() => {
    return `flex-1 overflow-auto lg:ml-0 ${sidebarCollapsed ? "lg:ml-16" : "lg:ml-64"}`;
  }, [sidebarCollapsed]);

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      {/* Mobile header */}
      <div className="lg:hidden flex items-center justify-between border-b border-border bg-background px-4 py-3 sticky top-0 z-40">
        <span className="font-semibold text-gold">Vicky's Place Admin</span>
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-muted rounded-md"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={closeSidebar} />
          <div className="absolute left-0 top-0 h-full w-72 max-w-[85vw] bg-background border-r border-border shadow-lg overflow-y-auto">
            <div className="p-6">
              <h1 className="font-serif text-xl text-gold">Vicky's Place</h1>
              <p className="text-sm text-muted-foreground mt-1">Admin Console</p>
            </div>
            <AdminSidebarContent
              location={location}
              closeSidebar={closeSidebar}
              collapsed={false}
            />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className={sidebarClassName}>
        <div className="p-6 flex items-center justify-between flex-shrink-0">
          <h1 className={`font-serif text-gold ${sidebarCollapsed ? "text-lg" : "text-xl"}`}>
            {sidebarCollapsed ? "VP" : "Vicky's Place"}
          </h1>
          <button
            onClick={toggleSidebarCollapsed}
            className="p-2 hover:bg-muted rounded-md text-muted-foreground hover:text-foreground"
            aria-label="Toggle sidebar"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
        </div>
        {!sidebarCollapsed && (
          <p className="text-sm text-muted-foreground mt-1 px-6 flex-shrink-0">Admin Console</p>
        )}
        <div className="flex flex-col h-[calc(100vh-80px)]">
          <AdminSidebarContent
            location={location}
            collapsed={sidebarCollapsed}
            onExpand={expandSidebar}
          />
        </div>
      </div>

      {/* Main content */}
      <div className={mainContentClassName}>{children}</div>
    </div>
  );
}

function AdminSidebarContent({
  location,
  closeSidebar,
  collapsed,
  onExpand,
}: {
  location: { pathname: string };
  closeSidebar?: () => void;
  collapsed?: boolean;
  onExpand?: () => void;
}) {
  const router = useRouter();

  const handleNavigate = useCallback((to: string) => {
    router.navigate({ to: to as any });
    closeSidebar?.();
  }, [router, closeSidebar]);

  const handleExitAdmin = useCallback(() => {
    router.navigate({ to: "/" });
  }, [router]);

  return (
    <nav className="px-4 py-2 flex flex-col h-full">
      <ul className="space-y-1 flex-1 overflow-y-auto py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.to === "/admin"
              ? location.pathname === "/admin"
              : location.pathname === item.to || location.pathname.startsWith(item.to + "/");
          return (
            <li key={item.to}>
              <button
                onClick={() => handleNavigate(item.to)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors text-left ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                } ${collapsed ? "justify-center" : ""}`}
                title={collapsed ? item.label : undefined}
              >
                <Icon className={`${collapsed ? "h-5 w-5" : "h-4 w-4"}`} />
                {!collapsed && <span>{item.label}</span>}
              </button>
            </li>
          );
        })}
      </ul>
      {collapsed && (
        <div className="mt-6 pt-6 border-t border-border flex justify-center">
          <button
            onClick={onExpand}
            className="p-2 hover:bg-muted rounded-md text-muted-foreground hover:text-foreground"
            aria-label="Expand sidebar"
            title="Expand sidebar"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
      <div className="mt-6 pt-6 border-t border-border">
        <button
          onClick={handleExitAdmin}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors text-left ${collapsed ? "justify-center" : ""}`}
          title={collapsed ? "Exit Admin" : undefined}
        >
          <LogOut className={`${collapsed ? "h-5 w-5" : "h-4 w-4"}`} />
          {!collapsed && <span>Exit Admin</span>}
        </button>
      </div>
    </nav>
  );
}
```

### `src/components/AdminNav.tsx`

Alternative navigation component (not currently used in admin layout, but present in codebase).

```tsx
import { Link, useLocation } from "@tanstack/react-router";
import { useAdminAuth } from "@/lib/admin";
import { LogOut, Menu } from "lucide-react";
import { useState, useMemo, useCallback } from "react";

interface NavItem {
  label: string;
  to: string;
  module: string;
}

const navItems: NavItem[] = [
  { label: "Dashboard", to: "/admin", module: "" },
  { label: "POS", to: "/admin/pos", module: "inventory" },
  { label: "Products", to: "/admin/products", module: "inventory" },
  { label: "Categories", to: "/admin/categories", module: "inventory" },
  { label: "Orders", to: "/admin/orders", module: "orders" },
  { label: "Customers", to: "/admin/customers", module: "orders" },
  { label: "Finance", to: "/admin/finance", module: "finance" },
  { label: "Tasks", to: "/admin/ops/tasks", module: "ops" },
  { label: "Calendar", to: "/admin/ops/calendar", module: "ops" },
  { label: "Staff", to: "/admin/ops/staff", module: "ops" },
  { label: "Activity", to: "/admin/ops/activity", module: "ops" },
  { label: "Content", to: "/admin/ops/content", module: "ops" },
];

export function AdminNav() {
  const { staff, hasModuleAccess, logout } = useAdminAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredNavItems = useMemo(() => {
    return navItems.filter((item) => {
      if (item.module === "") return true;
      return hasModuleAccess(item.module);
    });
  }, [hasModuleAccess]);

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <nav className="flex items-center gap-6 border-b border-border bg-background px-5 py-4 sm:px-8">
      <div className="flex items-center gap-4">
        <span className="label-caps text-gold">Admin</span>
        <div className="hidden sm:flex items-center gap-4">
          {filteredNavItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`label-caps text-sm transition-colors hover:text-primary-deep ${
                location.pathname === item.to ? "text-espresso" : "text-muted-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="ml-auto flex items-center gap-4">
        {staff && (
          <span className="hidden sm:inline text-sm text-muted-foreground">{staff.name}</span>
        )}
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
        <button
          onClick={toggleMobileMenu}
          className="sm:hidden p-2 hover:bg-muted rounded-md"
        >
          <Menu className="h-5 w-5" />
        </button>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 sm:hidden">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={closeMobileMenu}
            />
            <div className="absolute right-0 top-0 h-full w-64 bg-background p-6 shadow-lg">
              <div className="flex flex-col gap-4">
                {staff && <span className="text-sm text-muted-foreground">{staff.name}</span>}
                {filteredNavItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={closeMobileMenu}
                    className={`label-caps text-sm transition-colors hover:text-primary-deep ${
                      location.pathname === item.to ? "text-espresso" : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
```

### `src/lib/store.tsx`

Session state management using React Context. This is a critical component that manages cart, customer, staff, and orders state.

```tsx
import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from "react";
import type { Product, Variant, Customer, Staff, Order, CartItem, Address } from "@/data/types";
import type { DiscountCode } from "@/data/types";
import { getVariantById, calculateDiscount, calculateDeliveryFee, formatPrice } from "@/data/api";

type SessionState = {
  cart: CartItem[];
  cartOpen: boolean;
  customer: Customer | null;
  wishlist: string[];
  staff: Staff | null;
  sessionOrders: Order[];
  appliedDiscount: DiscountCode | null;
};

type SessionContext = {
  state: SessionState;
  addToCart: (productId: string, variantId: string, qty?: number) => Promise<void>;
  removeFromCart: (variantId: string) => void;
  updateCartQty: (variantId: string, qty: number) => void;
  clearCart: () => void;
  setCartOpen: (open: boolean) => void;
  applyDiscountCode: (code: string) => Promise<boolean>;
  removeDiscountCode: () => void;
  setCustomer: (customer: Customer | null) => void;
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (productId: string) => void;
  addCustomerAddress: (address: Address) => void;
  updateCustomerAddress: (addressId: string, address: Partial<Address>) => void;
  removeCustomerAddress: (addressId: string) => void;
  setDefaultAddress: (addressId: string) => void;
  setStaff: (staff: Staff | null) => void;
  logoutStaff: () => void;
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;
};

const SessionCtx = createContext<SessionContext | null>(null);

const mockProductsForCart: Product[] = [];

export function SessionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SessionState>({
    cart: [],
    cartOpen: false,
    customer: null,
    wishlist: [],
    staff: null,
    sessionOrders: [],
    appliedDiscount: null,
  });

  const cartTotal = useMemo(() => {
    let total = 0;
    state.cart.forEach((item: CartItem) => {
      const variant = mockProductsForCart.find((p: Product) =>
        p.variants.some((v: Variant) => v.id === item.variantId),
      );
      if (variant) {
        const v = variant.variants.find((v: Variant) => v.id === item.variantId);
        const price = v?.priceOverride || variant.basePrice;
        total += price * item.qty;
      }
    });
    return total;
  }, [state.cart]);

  const discountAmount = useMemo(() => {
    if (!state.appliedDiscount) return 0;
    return calculateDiscount(cartTotal, state.appliedDiscount);
  }, [cartTotal, state.appliedDiscount]);

  const deliveryFee = useMemo(() => {
    return calculateDeliveryFee(cartTotal - discountAmount);
  }, [cartTotal, discountAmount]);

  const finalTotal = useMemo(() => {
    return cartTotal - discountAmount + deliveryFee;
  }, [cartTotal, discountAmount, deliveryFee]);

  const addToCart = useCallback(async (productId: string, variantId: string, qty = 1) => {
    setState((prev: SessionState) => {
      const existing = prev.cart.find((item: CartItem) => item.variantId === variantId);
      if (existing) {
        return {
          ...prev,
          cart: prev.cart.map((item: CartItem) =>
            item.variantId === variantId ? { ...item, qty: item.qty + qty } : item,
          ),
          cartOpen: true,
        };
      }
      return {
        ...prev,
        cart: [...prev.cart, { variantId, productId, qty }],
        cartOpen: true,
      };
    });
  }, []);

  const removeFromCart = useCallback((variantId: string) => {
    setState((prev: SessionState) => ({
      ...prev,
      cart: prev.cart.filter((item: CartItem) => item.variantId !== variantId),
    }));
  }, []);

  const updateCartQty = useCallback((variantId: string, qty: number) => {
    setState((prev: SessionState) => {
      if (qty <= 0) {
        return {
          ...prev,
          cart: prev.cart.filter((item: CartItem) => item.variantId !== variantId),
        };
      }
      return {
        ...prev,
        cart: prev.cart.map((item: CartItem) =>
          item.variantId === variantId ? { ...item, qty } : item,
        ),
      };
    });
  }, []);

  const clearCart = useCallback(() => {
    setState((prev: SessionState) => ({
      ...prev,
      cart: [],
      appliedDiscount: null,
    }));
  }, []);

  const setCartOpen = useCallback((open: boolean) => {
    setState((prev: SessionState) => ({ ...prev, cartOpen: open }));
  }, []);

  const applyDiscountCode = useCallback(async (code: string) => {
    const validCodes = ["WELCOME10", "FIRST20", "FLAT15"];
    if (validCodes.includes(code.toUpperCase())) {
      const discount: DiscountCode = {
        code: code.toUpperCase(),
        type: code === "FLAT15" ? "fixed" : "percent",
        value: code === "FLAT15" ? 15 : code === "FIRST20" ? 20 : 10,
        active: true,
      };
      setState((prev: SessionState) => ({ ...prev, appliedDiscount: discount }));
      return true;
    }
    return false;
  }, []);

  const removeDiscountCode = useCallback(() => {
    setState((prev: SessionState) => ({ ...prev, appliedDiscount: null }));
  }, []);

  const setCustomer = useCallback((customer: Customer | null) => {
    setState((prev: SessionState) => ({ ...prev, customer }));
  }, []);

  const addToWishlist = useCallback((productId: string) => {
    setState((prev: SessionState) => ({
      ...prev,
      wishlist: [...prev.wishlist, productId],
    }));
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    setState((prev: SessionState) => ({
      ...prev,
      wishlist: prev.wishlist.filter((id: string) => id !== productId),
    }));
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    setState((prev: SessionState) => ({
      ...prev,
      wishlist: prev.wishlist.includes(productId)
        ? prev.wishlist.filter((id: string) => id !== productId)
        : [...prev.wishlist, productId],
    }));
  }, []);

  const addCustomerAddress = useCallback((address: Address) => {
    setState((prev: SessionState) => {
      if (!prev.customer) return prev;
      return {
        ...prev,
        customer: {
          ...prev.customer,
          addresses: [...prev.customer.addresses, address],
        },
      };
    });
  }, []);

  const updateCustomerAddress = useCallback((addressId: string, address: Partial<Address>) => {
    setState((prev: SessionState) => {
      if (!prev.customer) return prev;
      return {
        ...prev,
        customer: {
          ...prev.customer,
          addresses: prev.customer.addresses.map((a: Address) =>
            a.id === addressId ? { ...a, ...address } : a,
          ),
        },
      };
    });
  }, []);

  const removeCustomerAddress = useCallback((addressId: string) => {
    setState((prev: SessionState) => {
      if (!prev.customer) return prev;
      return {
        ...prev,
        customer: {
          ...prev.customer,
          addresses: prev.customer.addresses.filter((a: Address) => a.id !== addressId),
        },
      };
    });
  }, []);

  const setDefaultAddress = useCallback((addressId: string) => {
    setState((prev: SessionState) => {
      if (!prev.customer) return prev;
      return {
        ...prev,
        customer: {
          ...prev.customer,
          addresses: prev.customer.addresses.map((a: Address) => ({
            ...a,
            isDefault: a.id === addressId,
          })),
        },
      };
    });
  }, []);

  const setStaff = useCallback((staff: Staff | null) => {
    setState((prev: SessionState) => ({ ...prev, staff }));
  }, []);

  const logoutStaff = useCallback(() => {
    setState((prev: SessionState) => ({ ...prev, staff: null }));
  }, []);

  const addOrder = useCallback((order: Order) => {
    setState((prev: SessionState) => ({
      ...prev,
      sessionOrders: [...prev.sessionOrders, order],
    }));
  }, []);

  const updateOrderStatus = useCallback((orderId: string, status: Order["status"]) => {
    setState((prev: SessionState) => ({
      ...prev,
      sessionOrders: prev.sessionOrders.map((o: Order) =>
        o.id === orderId ? { ...o, status, updatedAt: new Date().toISOString() } : o,
      ),
    }));
  }, []);

  const value: SessionContext = useMemo(() => ({
    state,
    addToCart,
    removeFromCart,
    updateCartQty,
    clearCart,
    setCartOpen,
    applyDiscountCode,
    removeDiscountCode,
    setCustomer,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    addCustomerAddress,
    updateCustomerAddress,
    removeCustomerAddress,
    setDefaultAddress,
    setStaff,
    logoutStaff,
    addOrder,
    updateOrderStatus,
  }), [state, addToCart, removeFromCart, updateCartQty, clearCart, setCartOpen, applyDiscountCode, removeDiscountCode, setCustomer, addToWishlist, removeFromWishlist, toggleWishlist, addCustomerAddress, updateCustomerAddress, removeCustomerAddress, setDefaultAddress, setStaff, logoutStaff, addOrder, updateOrderStatus]);

  return <SessionCtx.Provider value={value}>{children}</SessionCtx.Provider>;
}

export function useSession() {
  const ctx = useContext(SessionCtx);
  if (!ctx) throw new Error("useSession must be used inside SessionProvider");
  return ctx;
}
```

### `src/lib/admin.ts`

Admin authentication helpers.

```tsx
import { useSession } from "./store";
import type { Staff } from "@/data/types";

export function useAdminAuth() {
  const { state, setStaff, logoutStaff } = useSession();

  return {
    staff: state.staff,
    login: (staff: Staff) => setStaff(staff),
    logout: () => logoutStaff(),
    isAuthenticated: !!state.staff,
    hasModuleAccess: (module: string) =>
      state.staff?.moduleAccess?.includes(module as Staff["moduleAccess"][number]) || false,
  };
}
```

### `src/data/mock/activityLog.ts`

Mock activity log data used in the dashboard.

```tsx
import type { ActivityLogEntry } from "../types";

export const mockActivityLog: ActivityLogEntry[] = [
  {
    id: "act-1",
    staffId: "staff-1",
    staffName: "Vicky Addo",
    action: "updated",
    entityType: "order",
    entityId: "ORD-2024-003",
    entityName: "ORD-2024-003",
    before: { status: "pending" },
    after: { status: "paid" },
    timestamp: "2024-03-25T14:35:00Z",
  },
  {
    id: "act-2",
    staffId: "staff-2",
    staffName: "Kofi Osei",
    action: "updated",
    entityType: "product",
    entityId: "prod-1",
    entityName: "CeraVe Hydrating Cleanser",
    before: { stockQty: 50 },
    after: { stockQty: 45 },
    timestamp: "2024-03-25T10:00:00Z",
  },
  {
    id: "act-3",
    staffId: "staff-3",
    staffName: "Abena Boateng",
    action: "created",
    entityType: "finance",
    entityId: "fin-10",
    entityName: "Packaging expense",
    after: { amount: 320, category: "Packaging" },
    timestamp: "2024-03-24T15:30:00Z",
  },
  {
    id: "act-4",
    staffId: "staff-2",
    staffName: "Kofi Osei",
    action: "updated",
    entityType: "order",
    entityId: "ORD-2024-002",
    entityName: "ORD-2024-002",
    before: { status: "paid" },
    after: { status: "shipped" },
    timestamp: "2024-03-22T11:45:00Z",
  },
  {
    id: "act-5",
    staffId: "staff-4",
    staffName: "Emmanuel Darko",
    action: "updated",
    entityType: "content",
    entityId: "about",
    entityName: "About page",
    before: { title: "About Us" },
    after: { title: "About Vicky's Place" },
    timestamp: "2024-03-20T09:00:00Z",
  },
  {
    id: "act-6",
    staffId: "staff-1",
    staffName: "Vicky Addo",
    action: "created",
    entityType: "discount",
    entityId: "FIRST20",
    entityName: "FIRST20 discount code",
    after: { code: "FIRST20", value: 20, type: "percent" },
    timestamp: "2024-03-18T14:00:00Z",
  },
  {
    id: "act-7",
    staffId: "staff-3",
    staffName: "Abena Boateng",
    action: "updated",
    entityType: "order",
    entityId: "ORD-2024-006",
    entityName: "ORD-2024-006",
    before: { status: "pending" },
    after: { status: "cancelled" },
    timestamp: "2024-03-18T10:30:00Z",
  },
  {
    id: "act-8",
    staffId: "staff-2",
    staffName: "Kofi Osei",
    action: "created",
    entityType: "product",
    entityId: "prod-18",
    entityName: "Neutrogena Norwegian Formula Hand Cream",
    after: { name: "Neutrogena Norwegian Formula Hand Cream", basePrice: 55 },
    timestamp: "2024-03-10T11:00:00Z",
  },
];
```

## Attempted Solutions and Results

### Attempt 1: useMemo on activity log
**Change:** Added `useMemo(() => mockActivityLog.slice(0, 5), [])` to prevent re-creating the array on every render.
**Result:** **FAILED** - Page still froze

### Attempt 2: useMemo and useCallback on AdminNav and store
**Changes:**
- Added `useMemo` for `filteredNavItems` in AdminNav
- Added `useCallback` for all event handlers in AdminNav
- Added `useMemo` for the entire `SessionContext` value in store.tsx
**Result:** **FAILED** - Page froze even faster

### Attempt 3: useMemo and useCallback on AdminLayout
**Changes:**
- Added `useCallback` for all event handlers in AdminLayout
- Added `useMemo` for dynamic className strings
- Added `useCallback` for navigation handlers
**Result:** **FAILED** - Page froze even faster than before

## Potential Root Causes

### 1. Infinite Re-render Loop
The `useMemo` on the SessionContext value might be causing an infinite loop:
- The value object includes all the callback functions
- Each callback is memoized with dependencies
- The value object is recreated when any dependency changes
- This causes all consumers to re-render
- Which might trigger state updates
- Which recreates the value object again

### 2. TanStack Router Location Updates
The `useLocation()` hook might be triggering frequent updates:
- Router location might be updating continuously
- This causes AdminLayout to re-render
- Which cascades to all children

### 3. Session State Updates
The SessionProvider might be receiving frequent state updates:
- Some component might be calling setState in a loop
- The `cartTotal` calculation runs on every cart change
- This might be triggering cascading updates

### 4. Memory Leak
There might be a memory leak causing the browser to run out of memory:
- Event listeners not being cleaned up
- Subscriptions not being unsubscribed
- Large objects being retained in memory

### 5. Date Formatting
The `formatDateTime` function is called on every render for activity log items:
- This creates new Date objects on every render
- Might be causing performance degradation

## Recommended Next Steps

1. **Remove all useMemo/useCallback optimizations** - They might be making the problem worse
2. **Add React DevTools Profiler** - To identify which components are re-rendering excessively
3. **Add console.log debugging** - To track when components re-render
4. **Check for infinite loops** - Look for any setInterval, useEffect without proper dependencies
5. **Simplify the dashboard** - Remove the activity log section temporarily to see if that's the cause
6. **Check TanStack Router configuration** - There might be a router configuration issue
7. **Test other admin pages** - See if the freezing happens on other admin pages or just the dashboard
8. **Check browser console** - Even though the page freezes, try to check for errors before it freezes
9. **Disable SessionProvider temporarily** - To see if the context is the issue
10. **Use React.memo on child components** - To prevent unnecessary re-renders

## Environment

- **Framework:** React 19.2.0 with Vite 8.2.0
- **Router:** @tanstack/react-router 1.170.18
- **State Management:** React Context (custom SessionProvider)
- **Styling:** Tailwind CSS 4.2.1
- **Build:** Static SPA (no SSR)
- **Deployment:** Vercel
