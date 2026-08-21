# POS Routing Issue Documentation

## Issue Description

The POS (Point of Sale) page was experiencing routing issues on the deployed site, showing "site doesn't exist" errors and later 500 server errors. The POS functionality was implemented but not accessible through the admin navigation.

## Root Cause

The POS route was implemented in the codebase but:
1. Not linked in the admin navigation menu
2. Vercel deployment configuration was incorrect for TanStack Start SSR framework
3. Multiple attempts to fix Vercel configuration with different output directories

## POS Route Implementation

### File: `src/routes/admin.pos.tsx`

```tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Search,
  Plus,
  Minus,
  Trash2,
  CreditCard,
  Smartphone,
  DollarSign,
  Printer,
  User,
  Maximize2,
  X,
} from "lucide-react";

// POS Route - Point of Sale functionality
import { mockProducts } from "@/data/mock/products";
import { formatPrice } from "@/data/api";
import type { Product, Variant } from "@/data/types";
import { useState } from "react";
import { usePaystackQRPayment } from "@/hooks/usePaystackQRPayment";
import { PaymentQRCode } from "@/components/PaymentQRCode";

interface CartItem {
  variant: Variant;
  product: Product;
  qty: number;
}

export const Route = createFileRoute("/admin/pos")({
  head: () => ({
    meta: [
      { title: "POS — Admin Dashboard" },
      {
        name: "description",
        content: "Point of Sale for Vicky's Place.",
      },
    ],
  }),
  component: AdminPOS,
});

function AdminPOS() {
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<
    "cash" | "card" | "mtn_momo" | "vodafone_cash" | "airteltigo_money"
  >("cash");
  const [amountReceived, setAmountReceived] = useState("");
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const qrPayment = usePaystackQRPayment();

  const filteredProducts = mockProducts.filter(
    (product: Product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.barcode?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const subtotal = cart.reduce(
    (sum, item) => sum + (item.variant.priceOverride || item.product.basePrice) * item.qty,
    0,
  );
  const total = subtotal;
  const change = amountReceived ? parseFloat(amountReceived) - total : 0;

  const addToCart = (product: Product, variant: Variant) => {
    const existingItem = cart.find((item) => item.variant.id === variant.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.variant.id === variant.id ? { ...item, qty: item.qty + 1 } : item,
        ),
      );
    } else {
      setCart([...cart, { variant, product, qty: 1 }]);
    }
  };

  const updateCartQty = (variantId: string, delta: number) => {
    setCart(
      cart
        .map((item) => {
          if (item.variant.id === variantId) {
            const newQty = Math.max(0, item.qty + delta);
            return { ...item, qty: newQty };
          }
          return item;
        })
        .filter((item) => item.qty > 0),
    );
  };

  const removeFromCart = (variantId: string) => {
    setCart(cart.filter((item) => item.variant.id !== variantId));
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }
    if (paymentMethod === "cash" && (!amountReceived || parseFloat(amountReceived) < total)) {
      alert("Please enter a valid amount received");
      return;
    }

    if (paymentMethod === "card") {
      // Start QR payment flow
      const customerEmail = customerPhone
        ? `${customerPhone}@vickysplace.com`
        : "customer@vickysplace.com";
      qrPayment.startPayment(total, customerEmail, customerName || "Guest");
    } else {
      // Cash and mobile money payments
      console.log("Processing sale:", {
        items: cart,
        customer: { name: customerName, phone: customerPhone },
        paymentMethod,
        total,
        amountReceived: paymentMethod === "cash" ? parseFloat(amountReceived) : total,
        change: paymentMethod === "cash" ? change : 0,
      });
      alert("Sale completed successfully!");
      setCart([]);
      setCustomerName("");
      setCustomerPhone("");
      setAmountReceived("");
      setPaymentMethod("cash");
    }
  };

  // ... rest of the component with full POS UI
  return (
    <div className="p-4 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link to="/admin" className="text-sm text-muted-foreground hover:text-foreground">
            Admin
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <h1 className="text-2xl md:text-3xl">Point of Sale</h1>
        </div>
      </div>
      {/* Full POS UI with product grid, cart, payment options */}
    </div>
  );
}
```

## Navigation Fix

### File: `src/components/AdminNav.tsx`

Added POS to the navigation menu:

```tsx
const navItems: NavItem[] = [
  { label: "Dashboard", to: "/admin", module: "" },
  { label: "POS", to: "/admin/pos", module: "inventory" },  // Added this line
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
```

## Route Tree Registration

The POS route is automatically registered in `src/routeTree.gen.ts`:

```typescript
import { Route as AdminPosRouteImport } from './routes/admin.pos'

const AdminPosRoute = AdminPosRouteImport.update({
  id: '/pos',
  path: '/pos',
  getParentRoute: () => AdminRoute,
} as any)
```

## Vercel Configuration Issues

### Initial Configuration (Incorrect)
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Attempted Fixes

1. **First attempt** - Changed to `.output/public`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".output/public",
  "framework": null
}
```

2. **Second attempt** - Changed to `.output`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".output",
  "framework": null
}
```

3. **Current attempt** - Changed to `.output/server`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".output/server",
  "framework": null
}
```

## Framework Details

The project uses **TanStack Start**, which is a React meta-framework that includes:
- React (UI library)
- TanStack Router (routing)
- TanStack Start (SSR framework with Nitro)
- Vite (build tool)

### Package.json Dependencies
```json
{
  "dependencies": {
    "@tanstack/react-router": "1.170.18",
    "@tanstack/react-start": "1.168.32",
    "@tanstack/router-plugin": "1.168.23",
    "react": "^19.2.0",
    "react-dom": "^19.2.0"
  }
}
```

### Vite Configuration
```typescript
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
});
```

## Deployment Status

### Commits Made
1. `6a35f84` - Add POS to navigation and build interactive calendar page
2. `aef1a97` - Trigger deployment for POS routing fix
3. `e1d8999` - Fix vercel.json for TanStack Start SSR build output
4. `9d836c3` - Fix vercel.json output directory for Nitro SSR
5. `b6f7fea` - Update vercel.json for TanStack Start server output

### Current Status
- POS route is properly implemented at `/admin/pos`
- Navigation link added to admin menu
- Route tree regenerated and registered
- Multiple Vercel configuration attempts made
- Awaiting successful deployment to resolve 500 errors

## Resolution Steps Taken

1. ✅ Added POS link to AdminNav.tsx navigation
2. ✅ Verified POS route file exists and is properly configured
3. ✅ Regenerated TanStack Router route tree
4. ✅ Updated Vercel configuration multiple times for TanStack Start
5. ⏳ Waiting for successful Vercel deployment

## Remaining Issues

- 500 server error on deployed site
- Need to verify correct Vercel output directory for TanStack Start Nitro
- May need to check Vercel deployment logs for specific error details

## Notes

- TanStack Start uses Nitro for SSR, which outputs to `.output` directory
- The exact subdirectory structure may vary based on Nitro configuration
- Vercel needs to point to the correct server entry point for SSR to work
- Client-side routing is handled by TanStack Router, not Vercel rewrites
