import type { Metadata } from "next";
import { getAllProducts, getAllCategories } from "@/data";
import ProductGrid from "@/components/ProductGrid";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubcategoryFilter from "@/components/SubcategoryFilter";
import { breadcrumbSchema, itemListSchema } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "Shop All Products",
  description:
    "Browse our full catalog of products across all categories. Quality handcrafted items with secure checkout and worldwide shipping.",
};

export default function ShopPage() {
  const products = getAllProducts();
  const categories = getAllCategories();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Shop", url: "/shop" },
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
        <Breadcrumbs items={[{ label: "Shop" }]} />

        <div className="mt-6 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold">All Products</h1>
          <p className="mt-2 text-fg-secondary">
            {products.length} products across {categories.length}{" "}
            {categories.length === 1 ? "category" : "categories"}
          </p>
        </div>

        {/* Category quick links */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <SubcategoryFilter
              key={cat.slug}
              categorySlug={cat.slug}
              subcategories={cat.subcategories}
            />
          ))}
        </div>

        <ProductGrid products={products} />
      </div>
    </>
  );
}
