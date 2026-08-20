import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

import { products, type Product } from "@/data/products";
import { formatPrice } from "@/data/api";

export type CartLine = {
  key: string;
  product: Product;
  variant: string;
  qty: number;
};

type CartContext = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (product: Product, variant?: string, qty?: number) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clearCart: () => void;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
};

const Ctx = createContext<CartContext | null>(null);

// Start with empty cart instead of seeded data
const seed = (): CartLine[] => [];

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(seed);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const add = useCallback((product: Product, variant?: string, qty = 1) => {
    const v = variant ?? product.variants[0]!;
    const key = `${product.id}::${v}`;
    setLines((prev: CartLine[]) => {
      const found = prev.find((l: CartLine) => l.key === key);
      if (found) {
        return prev.map((l: CartLine) => (l.key === key ? { ...l, qty: l.qty + qty } : l));
      }
      return [...prev, { key, product, variant: v, qty }];
    });
    setDrawerOpen(true);
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setLines((prev: CartLine[]) =>
      prev.flatMap((l: CartLine) =>
        l.key === key ? (qty <= 0 ? [] : [{ ...l, qty: Math.max(1, qty) }]) : [l],
      ),
    );
  }, []);

  const remove = useCallback((key: string) => {
    setLines((prev: CartLine[]) => prev.filter((l: CartLine) => l.key !== key));
  }, []);

  const clearCart = useCallback(() => {
    setLines([]);
  }, []);

  const value = useMemo<CartContext>(() => {
    const count = lines.reduce((s: number, l: CartLine) => s + l.qty, 0);
    const subtotal = lines.reduce((s: number, l: CartLine) => s + l.qty * l.product.price, 0);
    return { lines, count, subtotal, add, setQty, remove, clearCart, drawerOpen, setDrawerOpen };
  }, [lines, add, setQty, remove, clearCart, drawerOpen]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
