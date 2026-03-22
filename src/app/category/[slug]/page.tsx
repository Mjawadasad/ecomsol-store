import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { getProductsByCategory, categoryInfo, type Category } from "@/data/products";
import { breadcrumbSchema, itemListSchema } from "@/lib/schemas";

type Props = {
  params: Promise<{ slug: string }>;
};

const validCategories: Category[] = ["ears", "tails", "sets"];

export async function generateStaticParams() {
  return validCategories.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!validCategories.includes(slug as Category)) return {};
  const info = categoryInfo[slug as Category];

  return {
    title: `${info.name} - Cosplay ${info.name}`,
    description: info.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  if (!validCategories.includes(slug as Category)) notFound();

  const category = slug as Category;
  const info = categoryInfo[category];
  const categoryProducts = getProductsByCategory(category);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Shop", url: "/shop" },
              { name: info.name, url: `/category/${slug}` },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListSchema(categoryProducts)),
        }}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1 text-sm text-foreground-muted mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/shop" className="hover:text-foreground transition-colors">Shop</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{info.name}</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold font-sans">{info.name}</h1>
          <p className="mt-3 text-foreground-muted max-w-2xl leading-relaxed">
            {info.description}
          </p>
        </div>

        {/* Category nav */}
        <div className="flex gap-3 mb-8">
          {validCategories.map((cat) => (
            <Link
              key={cat}
              href={`/category/${cat}`}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                cat === category
                  ? "bg-accent text-white"
                  : "border border-border text-foreground-muted hover:border-accent hover:text-accent"
              }`}
            >
              {categoryInfo[cat].name}
            </Link>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {categoryProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-foreground-muted">No products in this category yet. Check back soon!</p>
          </div>
        )}
      </div>
    </>
  );
}
