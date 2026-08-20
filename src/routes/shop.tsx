import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronDown, Filter, X } from "lucide-react";

import { ProductCard } from "@/components/ProductCard";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { brands, categories, concerns, products, type CategorySlug } from "@/data/products";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop All — Vicky's Place" },
      {
        name: "description",
        content:
          "Browse every product at Vicky's Place: skincare, haircare, bath & body and makeup, filterable by brand, price and skin concern.",
      },
      { property: "og:title", content: "Shop All — Vicky's Place" },
      {
        property: "og:description",
        content: "Every skincare, haircare, body and makeup product we stock.",
      },
    ],
  }),
  component: ShopAll,
});

export type Sort = "popularity" | "newest" | "price-asc" | "price-desc";

export function ProductBrowser({
  scope,
  showCategoryFilter = true,
}: {
  scope?: CategorySlug;
  showCategoryFilter?: boolean;
}) {
  const [cats, setCats] = useState<CategorySlug[]>([]);
  const [brandSel, setBrandSel] = useState<string[]>([]);
  const [concernSel, setConcernSel] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(70);
  const [sort, setSort] = useState<Sort>("popularity");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const toggle = <T,>(list: T[], v: T, set: (x: T[]) => void) =>
    set(list.includes(v) ? list.filter((i) => i !== v) : [...list, v]);

  const results = useMemo(() => {
    let list = products.filter((p) => (scope ? p.category === scope : true));
    if (cats.length) list = list.filter((p) => cats.includes(p.category));
    if (brandSel.length) list = list.filter((p) => brandSel.includes(p.brand));
    if (concernSel.length)
      list = list.filter((p) => p.concerns.some((c) => concernSel.includes(c)));
    list = list.filter((p) => p.price <= maxPrice);
    const sorted = [...list];
    sorted.sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "newest") return Number(!!b.isNew) - Number(!!a.isNew);
      return b.popularity - a.popularity;
    });
    return sorted;
  }, [scope, cats, brandSel, concernSel, maxPrice, sort]);

  const reset = () => {
    setCats([]);
    setBrandSel([]);
    setConcernSel([]);
    setMaxPrice(70);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[16rem_1fr] lg:gap-14">
      {/* Mobile filter button */}
      <button
        type="button"
        onClick={() => setMobileFiltersOpen(true)}
        className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-md border border-border hover:bg-muted"
      >
        <Filter className="h-4 w-4" />
        <span className="text-sm">Filters</span>
      </button>

      {/* Mobile filter overlay */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-background p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <p className="label-caps">Filters</p>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="p-2 hover:bg-muted rounded-md"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mb-6">
              <button
                type="button"
                onClick={reset}
                className="text-xs text-muted-foreground underline underline-offset-4 hover:text-primary-deep"
              >
                Clear all
              </button>
            </div>
            <MobileFilterContent
              cats={cats}
              setCats={setCats}
              brandSel={brandSel}
              setBrandSel={setBrandSel}
              concernSel={concernSel}
              setConcernSel={setConcernSel}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              showCategoryFilter={showCategoryFilter}
              toggle={toggle}
            />
            <Button
              className="w-full mt-6"
              onClick={() => setMobileFiltersOpen(false)}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      )}

      <aside className="hidden lg:block h-fit lg:sticky lg:top-32">
        <div className="flex items-center justify-between">
          <p className="label-caps">Filters</p>
          <button
            type="button"
            onClick={reset}
            className="text-xs text-muted-foreground underline underline-offset-4 hover:text-primary-deep"
          >
            Clear
          </button>
        </div>

        <MobileFilterContent
          cats={cats}
          setCats={setCats}
          brandSel={brandSel}
          setBrandSel={setBrandSel}
          concernSel={concernSel}
          setConcernSel={setConcernSel}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          showCategoryFilter={showCategoryFilter}
          toggle={toggle}
        />
      </aside>

      <div>
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
          <p className="text-sm text-muted-foreground">
            {results.length} product{results.length === 1 ? "" : "s"}
          </p>
          <label className="flex items-center gap-3 text-sm">
            <span className="label-caps text-muted-foreground">Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="h-10 rounded-md border border-border bg-card px-3 text-sm outline-none focus:border-primary"
            >
              <option value="popularity">Popularity</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </label>
        </div>

        {results.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border py-24 text-center">
            <p className="text-sm text-muted-foreground">Nothing matches those filters yet.</p>
            <Button variant="outline" className="mt-5" onClick={reset}>
              Clear filters
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mt-8 border-t border-border pt-6">
      <button
        type="button"
        className="flex w-full items-center justify-between font-serif text-base hover:text-primary-deep"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && <div className="mt-4 flex flex-col gap-3">{children}</div>}
    </div>
  );
}

function Check({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-sm text-muted-foreground hover:text-foreground">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded-sm border-border accent-[var(--primary)]"
      />
      {label}
    </label>
  );
}

function MobileFilterContent({
  cats,
  setCats,
  brandSel,
  setBrandSel,
  concernSel,
  setConcernSel,
  maxPrice,
  setMaxPrice,
  showCategoryFilter,
  toggle,
}: {
  cats: CategorySlug[];
  setCats: (x: CategorySlug[]) => void;
  brandSel: string[];
  setBrandSel: (x: string[]) => void;
  concernSel: string[];
  setConcernSel: (x: string[]) => void;
  maxPrice: number;
  setMaxPrice: (x: number) => void;
  showCategoryFilter: boolean;
  toggle: <T>(list: T[], v: T, set: (x: T[]) => void) => void;
}) {
  return (
    <div className="space-y-6">
      {showCategoryFilter && (
        <FilterGroup title="Category">
          {categories.map((c) => (
            <Check
              key={c.slug}
              label={c.name}
              checked={cats.includes(c.slug)}
              onChange={() => toggle(cats, c.slug, setCats)}
            />
          ))}
        </FilterGroup>
      )}

      <FilterGroup title="Brand">
        {brands.map((b) => (
          <Check
            key={b}
            label={b}
            checked={brandSel.includes(b)}
            onChange={() => toggle(brandSel, b, setBrandSel)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Price">
        <input
          type="range"
          min={20}
          max={70}
          step={2}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-[var(--primary)]"
        />
        <p className="mt-2 text-xs text-muted-foreground">Up to ₵{maxPrice}</p>
      </FilterGroup>

      <FilterGroup title="Skin type / concern">
        {concerns.map((c) => (
          <Check
            key={c}
            label={c}
            checked={concernSel.includes(c)}
            onChange={() => toggle(concernSel, c, setConcernSel)}
          />
        ))}
      </FilterGroup>
    </div>
  );
}

function ShopAll() {
  return (
    <>
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-[88rem] px-5 py-14 sm:px-8">
          <p className="label-caps text-gold">Shop all</p>
          <h1 className="mt-4 text-4xl md:text-5xl">The full shelf</h1>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Sixteen products, four categories, zero filler. Filter your way to the one you&rsquo;ll
            actually finish.
          </p>
        </div>
      </div>
      <Section width="wide">
        <ProductBrowser />
      </Section>
    </>
  );
}
