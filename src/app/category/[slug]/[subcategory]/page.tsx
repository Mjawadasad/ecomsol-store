import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllCategories,
  getCategory,
  getSubcategory,
  getProductsBySubcategory,
} from "@/data";
import ProductGrid from "@/components/ProductGrid";
import SubcategoryFilter from "@/components/SubcategoryFilter";
import Breadcrumbs from "@/components/Breadcrumbs";
import { breadcrumbSchema, itemListSchema } from "@/lib/schemas";

type Props = {
  params: Promise<{ slug: string; subcategory: string }>;
};

export async function generateStaticParams() {
  const params: { slug: string; subcategory: string }[] = [];
  for (const cat of getAllCategories()) {
    for (const sub of cat.subcategories) {
      if ((sub.productCount ?? 0) > 0) {
        params.push({ slug: cat.slug, subcategory: sub.slug });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, subcategory: subSlug } = await params;
  const category = getCategory(slug);
  const sub = getSubcategory(slug, subSlug);
  if (!category || !sub) return {};

  return {
    title: `${sub.name} - ${category.name}`,
    description: sub.description,
  };
}

export default async function SubcategoryPage({ params }: Props) {
  const { slug, subcategory: subSlug } = await params;
  const category = getCategory(slug);
  const sub = getSubcategory(slug, subSlug);
  if (!category || !sub) notFound();

  const products = getProductsBySubcategory(slug, subSlug);

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
              { name: sub.name, url: `/category/${slug}/${subSlug}` },
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
            { label: category.name, href: `/category/${slug}` },
            { label: sub.name },
          ]}
        />

        <div className="mt-6 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold">{sub.name}</h1>
          <p className="mt-3 text-fg-secondary max-w-2xl leading-relaxed">
            {sub.description}
          </p>
        </div>

        <div className="mb-8">
          <SubcategoryFilter
            categorySlug={slug}
            subcategories={category.subcategories}
            activeSlug={subSlug}
          />
        </div>

        <ProductGrid products={products} />

        {products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-fg-secondary">
              No products in this subcategory yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </>
  );
}
