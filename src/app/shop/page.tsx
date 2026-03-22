import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { breadcrumbSchema, itemListSchema } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "Shop All Cosplay Accessories",
  description:
    "Browse our full collection of handcrafted cosplay accessories. Cat ears, bunny ears, fox ears, tails, and matched sets. Premium faux fur, original designs.",
};

export default function ShopPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Shop", url: "/shop" },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListSchema(products)),
        }}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold font-sans">All Products</h1>
          <p className="mt-2 text-foreground-muted">
            {products.length} handcrafted cosplay accessories - ears, tails, and sets
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
