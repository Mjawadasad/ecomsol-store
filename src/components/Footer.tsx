import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { getAllCategories } from "@/data";

export default function Footer() {
  const categories = getAllCategories();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <ShoppingBag className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold">ECOMSOL</span>
            </Link>
            <p className="text-sm text-fg-secondary leading-relaxed">
              Quality products curated from trusted marketplaces. Browse our
              catalog and shop with confidence.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/shop"
                  className="text-sm text-fg-secondary hover:text-fg transition-colors"
                >
                  All Products
                </Link>
              </li>
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="text-sm text-fg-secondary hover:text-fg transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-fg-secondary hover:text-fg transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-fg-secondary hover:text-fg transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <a
                  href="https://www.etsy.com/shop/ecomsolstore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-fg-secondary hover:text-fg transition-colors"
                >
                  Etsy Shop
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3">Ready to Shop?</h3>
            <p className="text-sm text-fg-secondary mb-4">
              All purchases are handled through trusted marketplaces with buyer
              protection.
            </p>
            <a
              href="https://www.etsy.com/shop/ecomsolstore"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-cta px-4 py-2 text-sm font-semibold text-white hover:bg-cta-hover transition-colors"
            >
              Shop on Etsy
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-fg-muted">
          &copy; {new Date().getFullYear()} ECOMSOL. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
