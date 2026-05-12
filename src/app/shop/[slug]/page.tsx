import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Package, Truck, Shield } from "lucide-react";
import { getAllProducts, getProductBySlug, getRelatedProducts, getCategory, getSubcategory } from "@/data";
import { productSchema, breadcrumbSchema, faqSchema } from "@/lib/schemas";
import ProductCard from "@/components/ProductCard";
import ImageGallery from "@/components/ImageGallery";
import BuyButton from "@/components/BuyButton";
import Breadcrumbs from "@/components/Breadcrumbs";
import MarketplaceBadge from "@/components/MarketplaceBadge";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  const img = product.images[0];
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: img
        ? [{ url: img.src, width: img.width, height: img.height, alt: img.alt }]
        : [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategory(product.categorySlug);
  const subcategory = getSubcategory(product.categorySlug, product.subcategorySlug);
  const related = getRelatedProducts(product, 4);

  const productFaqs = [
    {
      question: `What materials is this made of?`,
      answer: `${product.materials.join(", ")}. All materials are cruelty-free and synthetic.`,
    },
    {
      question: "How does purchasing work?",
      answer: `Click the "Buy on ${product.marketplace.name.charAt(0).toUpperCase() + product.marketplace.name.slice(1)}" button to purchase through our ${product.marketplace.name.charAt(0).toUpperCase() + product.marketplace.name.slice(1)} store. We handle fulfillment and ship directly to you.`,
    },
    {
      question: "How long does shipping take?",
      answer: "Orders ship within 3-5 business days. International shipping is available worldwide.",
    },
  ];

  const breadcrumbItems = [
    { label: "Shop", href: "/shop" },
    ...(category
      ? [{ label: category.name, href: `/category/${category.slug}` }]
      : []),
    ...(subcategory
      ? [
          {
            label: subcategory.name,
            href: `/category/${product.categorySlug}/${subcategory.slug}`,
          },
        ]
      : []),
    { label: product.shortName },
  ];

  const breadcrumbSchemaItems = [
    { name: "Home", url: "/" },
    { name: "Shop", url: "/shop" },
    ...(category
      ? [{ name: category.name, url: `/category/${category.slug}` }]
      : []),
    { name: product.shortName, url: `/shop/${product.slug}` },
  ];

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
          __html: JSON.stringify(breadcrumbSchema(breadcrumbSchemaItems)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema(productFaqs)),
        }}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="mt-8 grid lg:grid-cols-2 gap-10 lg:gap-14">
          {/* Image Gallery */}
          <ImageGallery images={product.images} />

          {/* Product Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MarketplaceBadge
                marketplace={product.marketplace.name}
                size="md"
              />
              {subcategory && (
                <Link
                  href={`/category/${product.categorySlug}/${product.subcategorySlug}`}
                  className="text-xs font-medium text-primary hover:text-primary-hover transition-colors"
                >
                  {subcategory.name}
                </Link>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold leading-tight">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mt-4">
              {product.variations ? (
                <div className="space-y-2">
                  <p className="text-sm text-fg-secondary">
                    Available options:
                  </p>
                  {product.variations.map((v) => (
                    <div
                      key={v.name}
                      className="flex items-center justify-between rounded-lg border border-border px-4 py-3"
                    >
                      <span className="text-sm font-medium">{v.name}</span>
                      <span className="text-lg font-bold">
                        ${v.price.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <span className="text-3xl font-bold">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            {/* Buy button */}
            <div className="mt-6">
              <BuyButton marketplace={product.marketplace} />
            </div>

            {/* Quick info */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { icon: Package, label: "Handcrafted" },
                { icon: Truck, label: "Ships 3-5 days" },
                { icon: Shield, label: "Buyer Protected" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center rounded-lg border border-border p-3 text-center"
                >
                  <item.icon className="h-4 w-4 text-primary mb-1" />
                  <span className="text-xs text-fg-secondary">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="mt-8 space-y-3">
              {product.description
                .split("\n\n")
                .slice(0, 3)
                .map((p, i) => (
                  <p
                    key={i}
                    className="text-sm text-fg-secondary leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
            </div>

            {/* Features */}
            {product.features.length > 0 && (
              <div className="mt-8">
                <h2 className="text-base font-semibold mb-3">Features</h2>
                <ul className="space-y-2">
                  {product.features.map((f, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-fg-secondary"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Materials & Colors */}
            <div className="mt-8 grid grid-cols-2 gap-6">
              {product.materials.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold mb-2">Materials</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {product.materials.map((m, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 text-xs bg-surface rounded-full text-fg-secondary border border-border"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {product.colors.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold mb-2">Colors</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {product.colors.map((c, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 text-xs bg-surface rounded-full text-fg-secondary border border-border"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="mt-8">
                <h3 className="text-sm font-semibold mb-2">Tags</h3>
                <div className="flex flex-wrap gap-1.5">
                  {product.tags.slice(0, 10).map((t, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 text-xs bg-surface rounded-full text-fg-muted border border-border"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* FAQ */}
        <section className="mt-16 border-t border-border pt-12">
          <h2 className="text-2xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {productFaqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border border-border p-5"
              >
                <h3 className="text-sm font-semibold mb-2">{faq.question}</h3>
                <p className="text-sm text-fg-secondary leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-16 border-t border-border pt-12">
            <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
