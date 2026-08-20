import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Vicky's Place" },
      {
        name: "description",
        content: "Frequently asked questions about shipping, returns, and our products.",
      },
    ],
  }),
  component: FAQ,
});

function FAQ() {
  return (
    <div className="border-b border-border bg-card">
      <div className="mx-auto max-w-[88rem] px-5 py-20 sm:px-8">
        <p className="label-caps text-gold">Help</p>
        <h1 className="mt-6 text-4xl md:text-5xl">Frequently Asked Questions</h1>
        <div className="gold-rule my-8" />
        <div className="max-w-3xl space-y-8">
          <div>
            <h3 className="text-lg font-semibold">Shipping & Returns</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              We offer free delivery on orders over ₵100. Orders are typically delivered within 48
              hours. Returns are accepted within 14 days of purchase.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Product Quality</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              All our products are patch-tested by our team before they make it to the shelf. We
              never test on animals and use clean, skin-loving formulas.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Have questions? Reach out to us at hello@vickysplace.com or visit our store at 18
              Rosemary Lane, Accra, Ghana.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
