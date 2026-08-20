import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";

import { formatPrice, type Product } from "@/data/products";
import { useCart } from "@/lib/cart";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();

  return (
    <article className="group relative">
      <Link
        to="/product/$id"
        params={{ id: product.id }}
        className="block overflow-hidden rounded-lg bg-card"
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          {product.isNew ? (
            <span className="label-caps absolute left-3 top-3 rounded-sm bg-background/90 px-2.5 py-1 text-espresso">
              New
            </span>
          ) : null}
        </div>
      </Link>

      <button
        type="button"
        aria-label={`Add ${product.name} to cart`}
        onClick={() => add(product)}
        className="absolute right-3 top-[calc(100%-7.5rem)] h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-background text-espresso opacity-0 shadow-[var(--shadow-soft)] transition-all duration-300 hover:bg-primary hover:text-primary-foreground group-hover:translate-y-0 group-hover:opacity-100"
      >
        <Plus className="h-4 w-4" />
      </button>

      <div className="pt-4">
        <p className="label-caps text-muted-foreground">{product.brand}</p>
        <h3 className="mt-1.5 font-sans text-[0.95rem] font-semibold leading-snug tracking-tight">
          <Link to="/product/$id" params={{ id: product.id }}>
            {product.name}
          </Link>
        </h3>
        <p className="mt-1.5 font-serif text-[0.95rem] text-gold">{formatPrice(product.price)}</p>
      </div>
    </article>
  );
}
