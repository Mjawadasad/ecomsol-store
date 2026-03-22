import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Truck, Shield, Star, Sparkles } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { getFeaturedProducts, products, categoryInfo } from "@/data/products";

const categories = [
  { ...categoryInfo.ears, icon: "🐱", count: products.filter((p) => p.categories.includes("ears")).length },
  { ...categoryInfo.tails, icon: "🦊", count: products.filter((p) => p.categories.includes("tails")).length },
  { ...categoryInfo.sets, icon: "✨", count: products.filter((p) => p.categories.includes("sets")).length },
];

const valueProps = [
  {
    icon: Star,
    title: "Original Designs",
    description: "Every piece is our own original design - you won't find these anywhere else.",
  },
  {
    icon: Sparkles,
    title: "Premium Materials",
    description: "Soft faux fur, durable headbands, and quality craftsmanship in every detail.",
  },
  {
    icon: Truck,
    title: "International Shipping",
    description: "We ship worldwide. Your next con accessory is just a few days away.",
  },
  {
    icon: Shield,
    title: "Secure Checkout",
    description: "All purchases through Etsy with full buyer protection and secure payments.",
  },
];

export default function Home() {
  const featured = getFeaturedProducts();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-background" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm text-accent mb-6">
                <Sparkles className="h-4 w-4" />
                Convention-Ready Accessories
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] font-sans">
                Handcrafted{" "}
                <span className="text-accent">Cosplay</span>{" "}
                Ears, Tails &amp; Sets
              </h1>
              <p className="mt-6 text-lg text-foreground-muted leading-relaxed max-w-xl">
                Original designs, premium faux fur, built for long con days.
                From poseable bunny ears to full fox sets - find your next
                signature look.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-cta px-6 py-3 text-base font-semibold text-white hover:bg-cta-hover transition-colors"
                >
                  Browse Collection
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <a
                  href="https://www.etsy.com/shop/ecomsolstore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 text-base font-semibold text-foreground hover:border-accent hover:text-accent transition-colors"
                >
                  Shop on Etsy
                </a>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative aspect-square rounded-2xl overflow-hidden border border-border">
                    <Image
                      src={products[0].images[0]}
                      alt={products[0].name}
                      fill
                      sizes="300px"
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border">
                    <Image
                      src={products[3].images[0]}
                      alt={products[3].name}
                      fill
                      sizes="300px"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border">
                    <Image
                      src={products[1].images[0]}
                      alt={products[1].name}
                      fill
                      sizes="300px"
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-square rounded-2xl overflow-hidden border border-border">
                    <Image
                      src={products[6].images[0]}
                      alt={products[6].name}
                      fill
                      sizes="300px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-background-secondary border-y border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold font-sans">Shop by Category</h2>
            <p className="mt-2 text-foreground-muted">Find exactly what you need for your next look</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="group relative rounded-xl border border-border bg-background-card p-6 hover:border-accent hover:shadow-lg hover:shadow-accent-glow transition-all duration-300"
              >
                <span className="text-3xl mb-3 block">{cat.icon}</span>
                <h3 className="text-lg font-semibold font-sans group-hover:text-accent transition-colors">
                  {cat.name}
                </h3>
                <p className="mt-1 text-sm text-foreground-muted">{cat.tagline}</p>
                <p className="mt-3 text-xs text-accent">{cat.count} products →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-sans">Featured Products</h2>
            <p className="mt-2 text-foreground-muted">Our most popular picks this season</p>
          </div>
          <Link
            href="/shop"
            className="hidden sm:inline-flex items-center gap-1 text-sm text-accent hover:text-accent-hover transition-colors"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent-hover"
          >
            View all products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Value Props */}
      <section className="bg-background-secondary border-y border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {valueProps.map((prop) => (
              <div key={prop.title} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                  <prop.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-sm font-semibold font-sans">{prop.title}</h3>
                <p className="mt-2 text-sm text-foreground-muted leading-relaxed">{prop.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/10 to-background-card p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold font-sans">Ready for Your Next Con?</h2>
          <p className="mt-3 text-foreground-muted max-w-lg mx-auto">
            Browse our full collection and find your next signature cosplay
            accessory. Secure checkout through Etsy.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-cta px-6 py-3 text-base font-semibold text-white hover:bg-cta-hover transition-colors"
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
