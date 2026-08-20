import { createFileRoute } from "@tanstack/react-router";
import { categories } from "@/data/products";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Vicky's Place" },
      {
        name: "description",
        content:
          "Learn about Vicky's Place, a small beauty boutique built on slow rituals, honest formulas and a little bit of gold.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-[88rem] px-5 py-20 sm:px-8">
          <p className="label-caps text-gold">About Vicky&rsquo;s Place</p>
          <h1 className="mt-6 text-4xl md:text-5xl">Our story</h1>
          <div className="gold-rule my-8" />
          <div className="grid gap-12 md:grid-cols-2">
            <div className="max-w-3xl space-y-6">
              <p className="text-[0.98rem] leading-relaxed text-muted-foreground">
                It started as a shelf in Vicky&rsquo;s living room. Friends kept borrowing her
                serums, so she started ordering doubles. Seven years later the shelf is a boutique,
                and the rule is unchanged: nothing goes on it unless she uses it herself.
              </p>
              <p className="text-[0.98rem] leading-relaxed text-muted-foreground">
                Every formula is patch-tested by our team, decanted into recyclable glass and packed
                by hand with a note. We believe in slow rituals, honest formulas and a little bit of
                gold.
              </p>
              <p className="text-[0.98rem] leading-relaxed text-muted-foreground">
                We source from small-batch producers who share our values: clean ingredients,
                sustainable packaging, and formulas that actually work. No ten-step routines, no
                miracle claims—just products we trust and use daily.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {categories.slice(0, 4).map((c, i) => (
                <img
                  key={c.slug}
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  className={`w-full rounded-lg object-cover ${
                    i % 3 === 0 ? "aspect-[4/5]" : "aspect-square"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="border-b border-border">
        <div className="mx-auto max-w-[88rem] px-5 py-20 sm:px-8">
          <h2 className="text-3xl md:text-4xl">Our values</h2>
          <div className="gold-rule my-8" />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Clean formulas",
                description:
                  "No parabens, sulfates, or synthetic fragrances. Just skin-loving ingredients that work.",
              },
              {
                title: "Cruelty-free",
                description:
                  "Never tested on animals. We partner with suppliers who share our commitment to ethical beauty.",
              },
              {
                title: "Sustainable",
                description:
                  "Recyclable glass packaging, minimal plastic, and carbon-neutral shipping where possible.",
              },
              {
                title: "Small batch",
                description:
                  "Limited production runs ensure freshness and reduce waste. Quality over quantity, always.",
              },
            ].map((value) => (
              <div key={value.title}>
                <h3 className="font-serif text-lg">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blush">
        <div className="mx-auto max-w-[88rem] px-5 py-20 sm:px-8">
          <h2 className="text-3xl md:text-4xl">Visit our boutique</h2>
          <div className="gold-rule my-8" />
          <div className="grid gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-lg">Location</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  18 Rosemary Lane
                  <br />
                  Accra, Ghana
                  <br />
                  GPS: AK-039-5028
                </p>
              </div>
              <div>
                <h3 className="font-serif text-lg">Hours</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Monday – Saturday
                  <br />
                  10am – 7pm
                </p>
              </div>
              <div>
                <h3 className="font-serif text-lg">Contact</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  hello@vickysplace.com
                  <br />
                  +233 20 123 4567
                </p>
              </div>
            </div>
            <div className="aspect-video rounded-lg bg-muted" />
          </div>
        </div>
      </section>
    </>
  );
}
