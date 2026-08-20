import { Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";

import { Button } from "@/components/Button";
import { formatPrice } from "@/data/products";
import { useCart } from "@/lib/cart";

export function CartDrawer() {
  const { lines, subtotal, setQty, remove, drawerOpen, setDrawerOpen } = useCart();

  if (!drawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-espresso/40 backdrop-blur-[2px]"
        onClick={() => setDrawerOpen(false)}
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background shadow-[var(--shadow-lift)] sm:max-w-md">
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <p className="label-caps">Your Bag</p>
          <button type="button" aria-label="Close cart" onClick={() => setDrawerOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6">
          {lines.length === 0 ? (
            <p className="py-16 text-center text-sm text-muted-foreground">Your bag is empty.</p>
          ) : (
            lines.map((l) => (
              <div key={l.key} className="flex gap-4 border-b border-border py-5">
                <img
                  src={l.product.image}
                  alt={l.product.name}
                  loading="lazy"
                  className="h-24 w-20 rounded-md object-cover"
                />
                <div className="flex-1">
                  <p className="label-caps text-muted-foreground">{l.product.brand}</p>
                  <p className="mt-1 text-sm font-semibold">{l.product.name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{l.variant}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <QtyStepper qty={l.qty} onChange={(q) => setQty(l.key, q)} />
                    <span className="font-serif text-sm text-gold">
                      {formatPrice(l.product.price * l.qty)}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="Remove item"
                  onClick={() => remove(l.key)}
                  className="self-start text-muted-foreground hover:text-primary-deep"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-border px-6 py-6">
          <div className="flex items-center justify-between">
            <span className="label-caps">Subtotal</span>
            <span className="font-serif text-lg">{formatPrice(subtotal)}</span>
          </div>
          <p className="mt-1.5 text-xs text-muted-foreground">
            Taxes and shipping calculated at checkout.
          </p>
          <div className="mt-5 flex flex-col gap-3">
            <Button asChild size="lg" className="w-full">
              <Link to="/checkout" onClick={() => setDrawerOpen(false)}>
                Checkout
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link to="/cart" onClick={() => setDrawerOpen(false)}>
                View full bag
              </Link>
            </Button>
          </div>
        </div>
      </aside>
    </div>
  );
}

export function QtyStepper({ qty, onChange }: { qty: number; onChange: (qty: number) => void }) {
  return (
    <div className="flex items-center rounded-md border border-border">
      <button
        type="button"
        aria-label="Decrease quantity"
        className="px-2.5 py-1.5 hover:text-primary-deep disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => onChange(Math.max(1, qty - 1))}
        disabled={qty <= 1}
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="min-w-7 text-center text-sm">{qty}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        className="px-2.5 py-1.5 hover:text-primary-deep"
        onClick={() => onChange(qty + 1)}
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
