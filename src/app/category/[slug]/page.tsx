import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllCategories, getCategory, getProductsByCategory } from "@/data";
import ProductGrid from "@/components/ProductGrid";
import SubcategoryFilter from "@/components/SubcategoryFilter";
import Breadcrumbs from "@/components/Breadcrumbs";
import { breadcrumbSchema, itemListSchema } from "@/lib/schemas";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllCategories().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};

  return {
    title: category.name,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const products = getProductsByCategory(slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Shop", url: "/shop" },
              { name: category.name, url: `/category/${slug}` },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListSchema(products)),
        }}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Shop", href: "/shop" },
            { label: category.name },
          ]}
        />

        <div className="mt-6 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold">{category.name}</h1>
          <p className="mt-3 text-fg-secondary max-w-2xl leading-relaxed">
            {category.heroDescription}
          </p>
        </div>

        <div className="mb-8">
          <SubcategoryFilter
            categorySlug={slug}
            subcategories={category.subcategories}
          />
        </div>

        <ProductGrid products={products} />

        {products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-fg-secondary">
              No products in this category yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </>
  );
}
