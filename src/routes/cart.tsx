import { createFileRoute } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";

import { formatPrice } from "@/data/products";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/Button";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Bag — Vicky's Place" },
      {
        name: "description",
        content: "View your shopping bag and checkout.",
      },
    ],
  }),
  component: Cart,
});

function Cart() {
  const { lines, subtotal, setQty, remove } = useCart();

  return (
    <div className="border-b border-border bg-card">
      <div className="mx-auto max-w-[88rem] px-5 py-20 sm:px-8">
        <p className="label-caps text-gold">Your Bag</p>
        <h1 className="mt-6 text-4xl md:text-5xl">Shopping Bag</h1>
        <div className="gold-rule my-8" />
        {lines.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted-foreground">Your bag is empty.</p>
        ) : (
          <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
            <div className="space-y-6">
              {lines.map((l) => (
                <div key={l.key} className="flex gap-6 border-b border-border pb-6">
                  <img
                    src={l.product.image}
                    alt={l.product.name}
                    className="h-32 w-28 rounded-md object-cover"
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex flex-1 justify-between">
                      <div>
                        <p className="label-caps text-muted-foreground">{l.product.brand}</p>
                        <p className="mt-1 text-sm font-semibold">{l.product.name}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">{l.variant}</p>
                      </div>
                      <span className="font-serif text-sm text-gold">
                        {formatPrice(l.product.price * l.qty)}
                      </span>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center rounded-md border border-border">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          className="px-3 py-2 hover:text-primary-deep"
                          onClick={() => setQty(l.key, l.qty - 1)}
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-8 text-center text-sm">{l.qty}</span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          className="px-3 py-2 hover:text-primary-deep"
                          onClick={() => setQty(l.key, l.qty + 1)}
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button
                        type="button"
                        aria-label="Remove item"
                        onClick={() => remove(l.key)}
                        className="text-sm text-muted-foreground underline underline-offset-4 hover:text-primary-deep"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="h-fit space-y-6 rounded-lg border border-border p-6">
              <div className="flex items-center justify-between">
                <span className="label-caps">Subtotal</span>
                <span className="font-serif text-lg">{formatPrice(subtotal)}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Taxes and shipping calculated at checkout.
              </p>
              <Button asChild size="lg" className="w-full">
                <a href="/checkout">Checkout</a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
