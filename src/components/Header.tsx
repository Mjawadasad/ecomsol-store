"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShoppingBag, Sparkles } from "lucide-react";

const navLinks = [
  { href: "/shop", label: "Shop All" },
  { href: "/category/ears", label: "Ears" },
  { href: "/category/tails", label: "Tails" },
  { href: "/category/sets", label: "Sets" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Sparkles className="h-6 w-6 text-accent group-hover:text-accent-hover transition-colors" />
          <span className="text-lg font-bold tracking-tight font-sans">
            EcomSol <span className="text-accent">Store</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-foreground-muted hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://www.etsy.com/shop/ecomsolstore"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg bg-cta px-4 py-2 text-sm font-semibold text-white hover:bg-cta-hover transition-colors"
          >
            <ShoppingBag className="h-4 w-4" />
            Visit Etsy Shop
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-foreground-muted hover:text-foreground"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background-secondary">
          <nav className="flex flex-col px-4 py-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-foreground-muted hover:text-foreground hover:bg-background-card transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://www.etsy.com/shop/ecomsolstore"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-cta px-4 py-2.5 text-sm font-semibold text-white hover:bg-cta-hover transition-colors"
            >
              <ShoppingBag className="h-4 w-4" />
              Visit Etsy Shop
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
