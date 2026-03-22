import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background-secondary">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <Sparkles className="h-5 w-5 text-accent" />
              <span className="text-lg font-bold font-sans">
                EcomSol <span className="text-accent">Store</span>
              </span>
            </Link>
            <p className="text-sm text-foreground-muted leading-relaxed">
              Handcrafted cosplay accessories designed by cosplayers, for cosplayers. Convention-ready ears, tails, and sets.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold mb-3 font-sans">Shop</h3>
            <ul className="space-y-2">
              <li><Link href="/shop" className="text-sm text-foreground-muted hover:text-foreground transition-colors">All Products</Link></li>
              <li><Link href="/category/ears" className="text-sm text-foreground-muted hover:text-foreground transition-colors">Ears</Link></li>
              <li><Link href="/category/tails" className="text-sm text-foreground-muted hover:text-foreground transition-colors">Tails</Link></li>
              <li><Link href="/category/sets" className="text-sm text-foreground-muted hover:text-foreground transition-colors">Ears &amp; Tail Sets</Link></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-sm font-semibold mb-3 font-sans">Info</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-foreground-muted hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link href="/faq" className="text-sm text-foreground-muted hover:text-foreground transition-colors">FAQ</Link></li>
              <li>
                <a
                  href="https://www.etsy.com/shop/ecomsolstore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground-muted hover:text-foreground transition-colors"
                >
                  Etsy Shop
                </a>
              </li>
            </ul>
          </div>

          {/* Buy */}
          <div>
            <h3 className="text-sm font-semibold mb-3 font-sans">Ready to Shop?</h3>
            <p className="text-sm text-foreground-muted mb-4">
              All purchases are made through our Etsy shop for secure checkout and buyer protection.
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

        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-foreground-muted">
          &copy; {new Date().getFullYear()} EcomSol Store. All rights reserved. All products are original designs.
        </div>
      </div>
    </footer>
  );
}
