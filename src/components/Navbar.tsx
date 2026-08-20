import { Link } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, User, X, Settings } from "lucide-react";
import { useState } from "react";

import { categories } from "@/data/products";
import { useCart } from "@/lib/cart";
import { SearchModal } from "@/components/SearchModal";
import { AccountModal } from "@/components/AccountModal";

export function Navbar() {
  const { count, setDrawerOpen } = useCart();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const navLinkClass = "label-caps text-muted-foreground transition-colors hover:text-primary-deep";

  const nav = (onClick?: () => void) => (
    <>
      <Link
        to="/shop"
        className={navLinkClass}
        onClick={onClick}
        activeProps={{ className: "text-espresso" }}
      >
        Shop All
      </Link>
      {categories.map((c) => (
        <Link
          key={c.slug}
          to="/category/$slug"
          params={{ slug: c.slug }}
          className={navLinkClass}
          onClick={onClick}
          activeProps={{ className: "text-espresso" }}
        >
          {c.name}
        </Link>
      ))}
      <Link
        to="/about"
        className={navLinkClass}
        onClick={onClick}
        activeProps={{ className: "text-espresso" }}
      >
        About
      </Link>
    </>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <p className="label-caps bg-espresso py-2.5 text-center text-background/90">
        Free delivery on orders over ₵100
      </p>
      <div className="mx-auto flex max-w-[88rem] items-center justify-between gap-6 px-5 py-4 sm:px-8">
        <button
          type="button"
          className="md:hidden"
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <Link to="/" className="shrink-0">
          <span className="font-serif text-xl tracking-tight md:text-2xl">Vicky&rsquo;s Place</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">{nav()}</nav>

        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Search"
            className="hover:text-primary-deep"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="h-[1.15rem] w-[1.15rem]" />
          </button>
          <Link to="/admin" aria-label="Admin" className="hidden hover:text-primary-deep sm:block">
            <Settings className="h-[1.15rem] w-[1.15rem]" />
          </Link>
          <button
            type="button"
            aria-label="Account"
            className="hidden hover:text-primary-deep sm:block"
            onClick={() => setAccountOpen(true)}
          >
            <User className="h-[1.15rem] w-[1.15rem]" />
          </button>
          <button
            type="button"
            aria-label="Open cart"
            onClick={() => setDrawerOpen(true)}
            className="relative hover:text-primary-deep"
          >
            <ShoppingBag className="h-[1.15rem] w-[1.15rem]" />
            {count > 0 ? (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[0.625rem] font-bold text-primary-foreground">
                {count}
              </span>
            ) : null}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="flex flex-col gap-3 border-t border-border px-5 py-5 md:hidden">
          {nav(() => setOpen(false))}
        </nav>
      ) : null}
      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
      <AccountModal open={accountOpen} onOpenChange={setAccountOpen} />
    </header>
  );
}
