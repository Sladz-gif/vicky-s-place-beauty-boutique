import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import { Button } from "@/components/Button";
import { ProductCard } from "@/components/ProductCard";
import { Section, SectionHeading } from "@/components/Section";
import { categories, products } from "@/data/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vicky's Place — Beauty & Cosmetics Boutique" },
      {
        name: "description",
        content:
          "Glow-first skincare, haircare, bath & body and makeup, curated by Vicky's Place. Warm formulas, gold-touched packaging, everyday rituals.",
      },
      { property: "og:title", content: "Vicky's Place — Beauty & Cosmetics Boutique" },
      {
        property: "og:description",
        content: "Glow-first skincare, haircare, bath & body and makeup, curated by Vicky's Place.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const bestsellers = products.filter((p) => p.bestseller).slice(0, 4);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      console.log("Newsletter signup:", email);
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-[88rem] items-stretch gap-0 md:grid-cols-[1fr_1fr]">
          <div className="flex flex-col justify-center px-5 py-16 sm:px-8 md:py-28 lg:pl-20">
            <p className="label-caps text-gold">Est. 2019 · Small batch beauty</p>
            <h1 className="mt-6 text-[2.6rem] leading-[1.05] md:text-6xl">
              Your glow,
              <br />
              gently practised.
            </h1>
            <p className="mt-6 max-w-md text-[1.02rem] leading-relaxed text-muted-foreground">
              Skin-loving formulas and soft-focus colour, chosen one by one for the shelf we&rsquo;d
              keep at home. No noise, no ten-step promises.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/shop">Shop the edit</Link>
              </Button>
              <Button asChild variant="gold" size="lg">
                <Link to="/category/$slug" params={{ slug: "skincare" }}>
                  Skincare
                </Link>
              </Button>
            </div>
            <div className="mt-12 flex items-center gap-8">
              {[
                ["4.8★", "2,400+ reviews"],
                ["Clean", "Never tested on animals"],
                ["48h", "Local delivery"],
              ].map(([k, v]) => (
                <div key={k}>
                  <p className="font-serif text-lg">{k}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{v}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative min-h-[26rem] bg-blush">
            <img
              src="/hero.jpg"
              alt="Model holding a Vicky's Place foundation bottle"
              width={1200}
              height={1504}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <Section width="wide">
        <SectionHeading
          label="Shop by category"
          title="Four shelves, carefully kept"
          action={
            <Link to="/shop" className="label-caps text-gold underline-offset-8 hover:underline">
              Shop all
            </Link>
          }
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/category/$slug"
              params={{ slug: c.slug }}
              className="group overflow-hidden rounded-lg bg-card shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-lift)]"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  width={900}
                  height={900}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg">{c.name}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{c.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Bestsellers */}
      <Section width="wide" className="pt-0">
        <SectionHeading
          label="Bestsellers"
          title="What keeps selling out"
          description="The five products our regulars re-buy without thinking twice."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {bestsellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </Section>

      {/* Brand story */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 md:grid-cols-2 md:items-center md:py-28">
          <div>
            <p className="label-caps text-gold">About Vicky&rsquo;s Place</p>
            <h2 className="mt-5 text-3xl leading-tight md:text-[2.4rem]">
              It started as a shelf in Vicky&rsquo;s living room.
            </h2>
            <div className="gold-rule my-7" />
            <p className="text-[0.98rem] leading-relaxed text-muted-foreground">
              Friends kept borrowing her serums, so she started ordering doubles. Seven years later
              the shelf is a boutique, and the rule is unchanged: nothing goes on it unless she uses
              it herself.
            </p>
            <p className="mt-4 text-[0.98rem] leading-relaxed text-muted-foreground">
              Every formula is patch-tested by our team, decanted into recyclable glass and packed
              by hand with a note.
            </p>
            <Button asChild variant="outline" className="mt-8">
              <Link to="/about">Read our story</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {categories.slice(0, 4).map((c, i) => (
              <img
                key={c.slug}
                src={c.image}
                alt={c.name}
                loading="lazy"
                width={900}
                height={900}
                className={`w-full rounded-lg object-cover ${
                  i % 3 === 0 ? "aspect-[4/5]" : "aspect-square"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-blush">
        <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8">
          <p className="label-caps text-espresso/70">The Sunday Note</p>
          <h2 className="mt-4 text-3xl md:text-[2.3rem]">Ten percent off, and no spam.</h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            One email a week: new arrivals, restocks and the routines we&rsquo;re testing.
          </p>
          <form
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            onSubmit={handleNewsletterSubmit}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="h-12 flex-1 rounded-md border border-border bg-card px-4 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
            />
            <Button type="submit" variant="dark" className="h-12">
              Sign up
            </Button>
          </form>
          {subscribed && (
            <p className="mt-4 text-sm text-green-600">Thanks for subscribing! Check your inbox.</p>
          )}
        </div>
      </section>
    </>
  );
}
