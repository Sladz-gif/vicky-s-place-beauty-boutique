import { useState } from "react";
import { Search } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { products } from "@/data/products";
import { formatPrice } from "@/data/products";

export function SearchModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [query, setQuery] = useState("");

  const results = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.brand.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl w-full mx-4">
        <DialogHeader>
          <DialogTitle>Search products</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, brand, or description..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
            autoFocus
          />
        </div>
        <div className="max-h-[60vh] overflow-y-auto">
          {query === "" ? (
            <p className="text-center text-sm text-muted-foreground py-8">
              Start typing to search products
            </p>
          ) : results.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground py-8">
              No products found for "{query}"
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {results.map((p) => (
                <Link
                  key={p.id}
                  to="/product/$id"
                  params={{ id: p.id }}
                  className="flex gap-4 rounded-lg border border-border p-4 hover:border-primary transition-colors"
                  onClick={() => onOpenChange(false)}
                >
                  <img src={p.image} alt={p.name} className="h-20 w-20 rounded-md object-cover" />
                  <div className="flex-1">
                    <p className="label-caps text-muted-foreground">{p.brand}</p>
                    <p className="mt-1 text-sm font-semibold">{p.name}</p>
                    <p className="mt-2 font-serif text-sm text-gold">{formatPrice(p.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
