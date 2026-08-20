// Session state store - holds data that would normally live server-side
// Uses React Context for simplicity. Could be replaced with Zustand or similar
// State resets on page refresh (could persist to localStorage if desired)

import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from "react";
import type { Product, Variant, Customer, Staff, Order, CartItem, Address } from "@/data/types";
import type { DiscountCode } from "@/data/types";
import { getVariantById, calculateDiscount, calculateDeliveryFee, formatPrice } from "@/data/api";

// Session state types
type SessionState = {
  // Cart
  cart: CartItem[];
  cartOpen: boolean;

  // Customer (storefront)
  customer: Customer | null;
  wishlist: string[]; // product IDs

  // Staff (admin)
  staff: Staff | null;

  // Orders (session-created + mock)
  sessionOrders: Order[];

  // Discount code applied to cart
  appliedDiscount: DiscountCode | null;
};

type SessionContext = {
  state: SessionState;

  // Cart actions
  addToCart: (productId: string, variantId: string, qty?: number) => Promise<void>;
  removeFromCart: (variantId: string) => void;
  updateCartQty: (variantId: string, qty: number) => void;
  clearCart: () => void;
  setCartOpen: (open: boolean) => void;
  applyDiscountCode: (code: string) => Promise<boolean>;
  removeDiscountCode: () => void;

  // Customer actions
  setCustomer: (customer: Customer | null) => void;
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (productId: string) => void;
  addCustomerAddress: (address: Address) => void;
  updateCustomerAddress: (addressId: string, address: Partial<Address>) => void;
  removeCustomerAddress: (addressId: string) => void;
  setDefaultAddress: (addressId: string) => void;

  // Staff actions
  setStaff: (staff: Staff | null) => void;
  logoutStaff: () => void;

  // Order actions
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;
};

const SessionCtx = createContext<SessionContext | null>(null);

// Mock products for cart calculations (in real app, would come from API)
// We'll import these from the mock data
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

  // Cart calculations
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

  // Cart actions
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
    // In real app, would call validateDiscountCode from API
    // For now, mock validation
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

  // Customer actions
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

  // Staff actions
  const setStaff = useCallback((staff: Staff | null) => {
    setState((prev: SessionState) => ({ ...prev, staff }));
  }, []);

  const logoutStaff = useCallback(() => {
    setState((prev: SessionState) => ({ ...prev, staff: null }));
  }, []);

  // Order actions
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

  const value: SessionContext = {
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
  };

  return <SessionCtx.Provider value={value}>{children}</SessionCtx.Provider>;
}

export function useSession() {
  const ctx = useContext(SessionCtx);
  if (!ctx) throw new Error("useSession must be used inside SessionProvider");
  return ctx;
}

// Helper hook for cart calculations
export function useCartCalculations() {
  const { state } = useSession();

  // This would need access to product data to calculate properly
  // For now, return placeholder calculations
  const subtotal = 0;
  const discountAmount = 0;
  const deliveryFee = 0;
  const finalTotal = 0;
  const itemCount = state.cart.reduce((sum: number, item: CartItem) => sum + item.qty, 0);

  return {
    subtotal,
    discountAmount,
    deliveryFee,
    finalTotal,
    itemCount,
    hasDiscount: !!state.appliedDiscount,
    discountCode: state.appliedDiscount?.code,
  };
}
