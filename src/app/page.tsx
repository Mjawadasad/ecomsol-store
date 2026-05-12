import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Truck, Shield, Star, ExternalLink } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import {
  getAllCategories,
  getFeaturedProducts,
  getNewArrivals,
} from "@/data";

export default function Home() {
  const categories = getAllCategories();
  const featured = getFeaturedProducts(8);
  const newArrivals = getNewArrivals(4);

  const heroProducts = featured.slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                Quality Products,{" "}
                <span className="text-primary">Trusted</span> Marketplaces
              </h1>
              <p className="mt-6 text-lg text-fg-secondary leading-relaxed max-w-xl">
                Browse our curated catalog of handcrafted products. Find what
                you love here, then purchase with confidence through trusted
                marketplaces like Etsy.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-white hover:bg-primary-hover transition-colors"
                >
                  Browse Our Catalog
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <a
                  href="https://www.etsy.com/shop/ecomsolstore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-6 py-3.5 text-base font-semibold text-fg hover:border-cta hover:text-cta transition-colors"
                >
                  Visit Our Etsy Store
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  {heroProducts[0] && (
                    <div className="relative aspect-square rounded-2xl overflow-hidden border border-border">
                      <Image
                        src={heroProducts[0].images[0]?.src ?? ""}
                        alt={heroProducts[0].images[0]?.alt ?? heroProducts[0].name}
                        fill
                        sizes="300px"
                        className="object-cover"
                        priority
                      />
                    </div>
                  )}
                  {heroProducts[1] && (
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border">
                      <Image
                        src={heroProducts[1].images[0]?.src ?? ""}
                        alt={heroProducts[1].images[0]?.alt ?? heroProducts[1].name}
                        fill
                        sizes="300px"
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
                <div className="space-y-4 pt-8">
                  {heroProducts[2] && (
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border">
                      <Image
                        src={heroProducts[2].images[0]?.src ?? ""}
                        alt={heroProducts[2].images[0]?.alt ?? heroProducts[2].name}
                        fill
                        sizes="300px"
                        className="object-cover"
                      />
                    </div>
                  )}
                  {heroProducts[3] && (
                    <div className="relative aspect-square rounded-2xl overflow-hidden border border-border">
                      <Image
                        src={heroProducts[3].images[0]?.src ?? ""}
                        alt={heroProducts[3].images[0]?.alt ?? heroProducts[3].name}
                        fill
                        sizes="300px"
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-y border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Shop by Category
            </h2>
            <p className="mt-2 text-fg-secondary">
              Browse our growing collection of product categories
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <CategoryCard key={cat.slug} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">
              Trending Products
            </h2>
            <p className="mt-2 text-fg-secondary">
              Our most popular picks right now
            </p>
          </div>
          <Link
            href="/shop"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-hover transition-colors"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover"
          >
            View all products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="bg-surface border-y border-border">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold">
                  New Arrivals
                </h2>
                <p className="mt-2 text-fg-secondary">
                  Recently added to our catalog
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trust Signals */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Star,
                title: "Handcrafted Quality",
                desc: "Every product is carefully made with premium materials and attention to detail.",
              },
              {
                icon: Shield,
                title: "Buyer Protection",
                desc: "Shop through trusted marketplaces with full buyer protection and secure checkout.",
              },
              {
                icon: Truck,
                title: "Worldwide Shipping",
                desc: "We ship internationally. Your order is just a few days away, wherever you are.",
              },
              {
                icon: ArrowRight,
                title: "Easy Returns",
                desc: "Not satisfied? Returns and exchanges handled through marketplace policies.",
              },
            ].map((prop) => (
              <div key={prop.title} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light">
                  <prop.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-sm font-semibold">{prop.title}</h3>
                <p className="mt-2 text-sm text-fg-secondary leading-relaxed">
                  {prop.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-primary p-8 sm:p-12 text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Ready to Find Something You Love?
          </h2>
          <p className="mt-3 text-white/80 max-w-lg mx-auto">
            Browse our full catalog and shop through trusted marketplaces with
            secure checkout and buyer protection.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-base font-semibold text-primary hover:bg-white/90 transition-colors"
            >
              Browse All Products
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
