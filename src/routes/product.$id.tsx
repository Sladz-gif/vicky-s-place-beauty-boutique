import { createFileRoute, notFound } from "@tanstack/react-router";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

import { getProduct, formatPrice, type Product } from "@/data/products";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/Button";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Product unavailable — Vicky's Place" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { product } = loaderData;
    const title = `${product.name} — Vicky's Place`;
    return {
      meta: [
        { title },
        { name: "description", content: product.description },
        { property: "og:title", content: title },
        { property: "og:description", content: product.description },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="border-b border-border bg-card">
      <div className="mx-auto grid max-w-[88rem] items-start gap-12 px-5 py-20 sm:px-8 md:grid-cols-2 lg:gap-20">
        <div className="aspect-square overflow-hidden rounded-lg bg-muted">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        </div>
        <div className="space-y-8">
          <div>
            <p className="label-caps text-gold">{product.brand}</p>
            <h1 className="mt-3 text-3xl md:text-4xl">{product.name}</h1>
            <p className="mt-4 font-serif text-2xl text-gold">{formatPrice(product.price)}</p>
          </div>
          <div className="gold-rule" />
          <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="label-caps text-sm">Quantity</label>
              <div className="flex items-center rounded-md border border-border">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  className="px-3 py-2 hover:text-primary-deep"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="min-w-8 text-center text-sm">{quantity}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  className="px-3 py-2 hover:text-primary-deep"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
            <Button
              size="lg"
              className="w-full"
              onClick={() => {
                for (let i = 0; i < quantity; i++) {
                  add(product);
                }
              }}
            >
              Add to bag
            </Button>
          </div>
          <div className="space-y-4 text-sm text-muted-foreground">
            <div>
              <p className="label-caps">Concerns</p>
              <p className="mt-1">{product.concerns.join(", ")}</p>
            </div>
            <div>
              <p className="label-caps">Rating</p>
              <p className="mt-1">
                {product.rating}★ ({product.reviews} reviews)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
