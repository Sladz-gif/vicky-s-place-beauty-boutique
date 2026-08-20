import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube } from "lucide-react";

import { categories } from "@/data/products";

export function Footer() {
  return (
    <footer className="bg-espresso text-background/80">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <span className="font-serif text-2xl text-background">Vicky&rsquo;s Place</span>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            A small beauty boutique built on slow rituals, honest formulas and a little bit of gold.
          </p>
          <div className="mt-6 flex gap-4 text-gold">
            <a href="#" aria-label="Instagram">
              <Instagram className="h-[1.15rem] w-[1.15rem]" />
            </a>
            <a href="#" aria-label="Facebook">
              <Facebook className="h-[1.15rem] w-[1.15rem]" />
            </a>
            <a href="#" aria-label="YouTube">
              <Youtube className="h-[1.15rem] w-[1.15rem]" />
            </a>
          </div>
        </div>

        <FooterCol title="Shop">
          <Link to="/shop">Shop All</Link>
          {categories.map((c) => (
            <Link key={c.slug} to="/category/$slug" params={{ slug: c.slug }}>
              {c.name}
            </Link>
          ))}
        </FooterCol>

        <FooterCol title="Help">
          <Link to="/faq">Shipping &amp; Returns</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/cart">Your Bag</Link>
        </FooterCol>

        <FooterCol title="Visit">
          <span>18 Rosemary Lane</span>
          <span>Accra, Ghana</span>
          <span>GPS: AK-039-5028</span>
          <span>hello@vickysplace.com</span>
          <span>Mon–Sat, 10am–7pm</span>
        </FooterCol>
      </div>

      <div className="border-t border-background/15">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-xs sm:flex-row sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} Vicky&rsquo;s Place. All rights reserved.</p>
          <p>Privacy · Terms · Accessibility</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="label-caps mb-5 text-gold">{title}</p>
      <div className="flex flex-col gap-3 text-sm [&>a:hover]:text-background">{children}</div>
    </div>
  );
}
