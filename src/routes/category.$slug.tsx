import { createFileRoute, notFound } from "@tanstack/react-router";

import { Section } from "@/components/Section";
import { ProductBrowser } from "@/routes/shop";
import { getCategory, products } from "@/data/products";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const category = getCategory(params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Category unavailable — Vicky's Place" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { category } = loaderData;
    const title = `${category.name} — Vicky's Place`;
    return {
      meta: [
        { title },
        { name: "description", content: category.blurb },
        { property: "og:title", content: title },
        { property: "og:description", content: category.blurb },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const count = products.filter((p) => p.category === category.slug).length;

  return (
    <>
      <section className="relative border-b border-border">
        <div className="mx-auto grid max-w-[88rem] items-center gap-0 md:grid-cols-[1.1fr_1fr]">
          <div className="px-5 py-16 sm:px-8 md:py-24 lg:pl-20">
            <p className="label-caps text-gold">{count} products</p>
            <h1 className="mt-5 text-4xl md:text-5xl">{category.name}</h1>
            <div className="gold-rule my-6" />
            <p className="max-w-md text-[0.98rem] leading-relaxed text-muted-foreground">
              {category.blurb}
            </p>
          </div>
          <div className="h-64 md:h-full">
            <img
              src={category.image}
              alt={category.name}
              width={900}
              height={900}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <Section width="wide">
        <ProductBrowser scope={category.slug} showCategoryFilter={false} />
      </Section>
    </>
  );
}
