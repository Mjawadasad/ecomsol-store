import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, ChevronRight, Package, Truck, Shield, Sparkles } from "lucide-react";
import { products, getProductBySlug } from "@/data/products";
import { productSchema, breadcrumbSchema, faqSchema } from "@/lib/schemas";
import ProductCard from "@/components/ProductCard";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [{ url: product.images[0], width: 2000, height: 2000, alt: product.name }],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.categories.some((c) => product.categories.includes(c)))
    .slice(0, 4);

  const productFaqs = [
    { question: `What materials are the ${product.shortName} made of?`, answer: product.materials.join(", ") + ". All materials are 100% cruelty-free and synthetic." },
    { question: `How do I care for my ${product.shortName}?`, answer: product.careTips.join(" ") },
    { question: "How does shipping work?", answer: "We ship within 3-5 business days. International shipping is available worldwide. All orders are processed through our Etsy shop for secure checkout and tracking." },
    { question: "What size will fit me?", answer: "Our headbands are one size fits most and work great over wigs too. Tails attach with adjustable belt straps for a secure, comfortable fit." },
  ];

  const descriptionParagraphs = product.description.split("\n\n");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema(product)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Shop", url: "/shop" },
              { name: product.shortName, url: `/shop/${product.slug}` },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema(productFaqs)),
        }}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1 text-sm text-foreground-muted mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/shop" className="hover:text-foreground transition-colors">Shop</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{product.shortName}</span>
        </nav>

        {/* Product Layout */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-border bg-background-secondary">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.slice(1, 5).map((img, i) => (
                  <div
                    key={i}
                    className="relative aspect-square rounded-lg overflow-hidden border border-border bg-background-secondary"
                  >
                    <Image
                      src={img}
                      alt={`${product.name} - view ${i + 2}`}
                      fill
                      sizes="150px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            {/* Category badge */}
            <Link
              href={`/category/${product.category}`}
              className="inline-flex items-center gap-1 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs text-accent hover:bg-accent/20 transition-colors mb-4"
            >
              {product.category === "sets" ? "Ears & Tail Set" : product.category === "ears" ? "Ears" : "Tail"}
            </Link>

            <h1 className="text-2xl sm:text-3xl font-bold font-sans leading-tight">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mt-4">
              {product.variations ? (
                <div className="space-y-3">
                  <p className="text-sm text-foreground-muted">Available options:</p>
                  {product.variations.map((v) => (
                    <div key={v.name} className="flex items-center justify-between rounded-lg border border-border bg-background-card px-4 py-3">
                      <span className="text-sm font-medium">{v.name}</span>
                      <span className="text-lg font-bold text-accent font-sans">${v.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <span className="text-3xl font-bold text-accent font-sans">${product.price.toFixed(2)}</span>
              )}
            </div>

            {/* Buy button */}
            <a
              href={product.etsyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center justify-center gap-2 rounded-lg bg-cta px-6 py-3.5 text-base font-semibold text-white hover:bg-cta-hover transition-colors w-full"
            >
              <ShoppingBag className="h-5 w-5" />
              Buy on Etsy
            </a>

            {/* Quick info */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="flex flex-col items-center rounded-lg border border-border bg-background-card p-3 text-center">
                <Package className="h-4 w-4 text-accent mb-1" />
                <span className="text-xs text-foreground-muted">Handcrafted</span>
              </div>
              <div className="flex flex-col items-center rounded-lg border border-border bg-background-card p-3 text-center">
                <Truck className="h-4 w-4 text-accent mb-1" />
                <span className="text-xs text-foreground-muted">Ships 3-5 days</span>
              </div>
              <div className="flex flex-col items-center rounded-lg border border-border bg-background-card p-3 text-center">
                <Shield className="h-4 w-4 text-accent mb-1" />
                <span className="text-xs text-foreground-muted">Etsy Protected</span>
              </div>
            </div>

            {/* Description */}
            <div className="mt-8 space-y-4">
              {descriptionParagraphs.map((p, i) => (
                <p key={i} className="text-sm text-foreground-muted leading-relaxed">{p}</p>
              ))}
            </div>

            {/* Features */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold font-sans mb-3 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-accent" />
                What Makes These Special
              </h2>
              <ul className="space-y-2">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Details */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-semibold font-sans mb-2">Materials</h3>
                <ul className="space-y-1">
                  {product.materials.map((m, i) => (
                    <li key={i} className="text-sm text-foreground-muted">{m}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold font-sans mb-2">Colors</h3>
                <ul className="space-y-1">
                  {product.colors.map((c, i) => (
                    <li key={i} className="text-sm text-foreground-muted">{c}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Perfect for */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold font-sans mb-3">Perfect For</h2>
              <ul className="space-y-2">
                {product.perfectFor.map((use, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cta shrink-0" />
                    {use}
                  </li>
                ))}
              </ul>
            </div>

            {/* Care */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold font-sans mb-3">Care Tips</h2>
              <ul className="space-y-2">
                {product.careTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground-muted shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <section className="mt-16 border-t border-border pt-12">
          <h2 className="text-2xl font-bold font-sans mb-6">Frequently Asked Questions</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {productFaqs.map((faq, i) => (
              <div key={i} className="rounded-xl border border-border bg-background-card p-5">
                <h3 className="text-sm font-semibold font-sans mb-2">{faq.question}</h3>
                <p className="text-sm text-foreground-muted leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 border-t border-border pt-12">
            <h2 className="text-2xl font-bold font-sans mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
