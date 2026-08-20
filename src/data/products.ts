// Re-export from new mock data structure for backward compatibility
// This file maintains the old interface while using the new data structure

import { mockProducts } from "./mock/products";
import { mockCategories } from "./mock/categories";
import { mockBrands } from "./mock/brands";
import { formatPrice as formatPriceApi } from "./api";
import type { Product as NewProduct } from "./types";

export type CategorySlug = "skincare" | "haircare" | "bath-body" | "makeup";

// Legacy product type for backward compatibility
export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: CategorySlug;
  image: string;
  description: string;
  variants: string[];
  concerns: string[];
  rating: number;
  reviews: number;
  popularity: number;
  isNew?: boolean;
  bestseller?: boolean;
};

// Convert new product format to legacy format
export const products: Product[] = mockProducts.map((p) => ({
  id: p.id,
  name: p.name,
  brand: p.brand,
  price: p.basePrice,
  category: p.category as CategorySlug,
  image: p.images[0] || "",
  description: p.description,
  variants: p.variants.map((v) => v.label),
  concerns: p.tags,
  rating: 4.5, // Would be calculated from reviews
  reviews: 0, // Would come from reviews data
  popularity: p.popularity || 0,
  isNew: false,
  bestseller: p.featured || false,
}));

export const categories = mockCategories.map((c) => ({
  slug: c.slug as CategorySlug,
  name: c.name,
  image: c.image,
  blurb: c.description,
}));

export const brands = mockBrands.map((b) => b.name);

export const concerns = ["Dry", "Oily", "Sensitive", "Combination", "Anti-ageing", "Brightening"];

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);

export const formatPrice = (n: number) => formatPriceApi(n);
