"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShoppingBag, ChevronDown } from "lucide-react";
import { getAllCategories } from "@/data";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const categories = getAllCategories();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <ShoppingBag className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold tracking-tight">ECOMSOL</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/shop"
              className="px-3 py-2 text-sm font-medium text-fg-secondary hover:text-fg rounded-md hover:bg-surface transition-colors"
            >
              Shop All
            </Link>
            {categories.map((cat) => (
              <div key={cat.slug} className="relative group">
                <Link
                  href={`/category/${cat.slug}`}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-fg-secondary hover:text-fg rounded-md hover:bg-surface transition-colors"
                >
                  {cat.name}
                  <ChevronDown className="h-3.5 w-3.5" />
                </Link>
                <div className="absolute left-0 top-full pt-1 hidden group-hover:block">
                  <div className="bg-white rounded-lg shadow-lg border border-border py-2 min-w-48">
                    {cat.subcategories
                      .filter((s) => (s.productCount ?? 0) > 0)
                      .map((sub) => (
                        <Link
                          key={sub.slug}
                          href={`/category/${cat.slug}/${sub.slug}`}
                          className="block px-4 py-2 text-sm text-fg-secondary hover:text-fg hover:bg-surface transition-colors"
                        >
                          {sub.name}
                          <span className="ml-2 text-fg-muted text-xs">
                            ({sub.productCount})
                          </span>
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            ))}
            <Link
              href="/about"
              className="px-3 py-2 text-sm font-medium text-fg-secondary hover:text-fg rounded-md hover:bg-surface transition-colors"
            >
              About
            </Link>
            <Link
              href="/faq"
              className="px-3 py-2 text-sm font-medium text-fg-secondary hover:text-fg rounded-md hover:bg-surface transition-colors"
            >
              FAQ
            </Link>
          </nav>

          <a
            href="https://www.etsy.com/shop/ecomsolstore"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-cta text-white text-sm font-semibold rounded-lg hover:bg-cta-hover transition-colors"
          >
            Visit Etsy Store
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-fg-secondary hover:text-fg"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-white">
          <div className="px-4 py-4 space-y-1">
            <Link
              href="/shop"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 text-sm font-medium text-fg-secondary hover:text-fg rounded-md hover:bg-surface"
            >
              Shop All
            </Link>
            {categories.map((cat) => (
              <div key={cat.slug}>
                <Link
                  href={`/category/${cat.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 text-sm font-medium text-fg-secondary hover:text-fg rounded-md hover:bg-surface"
                >
                  {cat.name}
                </Link>
                <div className="ml-4">
                  {cat.subcategories
                    .filter((s) => (s.productCount ?? 0) > 0)
                    .map((sub) => (
                      <Link
                        key={sub.slug}
                        href={`/category/${cat.slug}/${sub.slug}`}
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2 text-sm text-fg-muted hover:text-fg-secondary"
                      >
                        {sub.name}
                      </Link>
                    ))}
                </div>
              </div>
            ))}
            <Link
              href="/about"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 text-sm font-medium text-fg-secondary hover:text-fg rounded-md hover:bg-surface"
            >
              About
            </Link>
            <Link
              href="/faq"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 text-sm font-medium text-fg-secondary hover:text-fg rounded-md hover:bg-surface"
            >
              FAQ
            </Link>
            <div className="pt-2">
              <a
                href="https://www.etsy.com/shop/ecomsolstore"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-4 py-2.5 bg-cta text-white text-sm font-semibold rounded-lg hover:bg-cta-hover transition-colors"
              >
                Visit Etsy Store
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
