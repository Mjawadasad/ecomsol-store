import type { Category, Product, Subcategory } from "./types";
import { faux_fur_category } from "./categories/faux-fur-accessories";

// ── Category registry ────────────────────────────────────────────────
// Add new categories here — the rest of the site auto-adapts.
const categories: Category[] = [faux_fur_category];

// ── Public API ───────────────────────────────────────────────────────

export function getAllCategories(): Category[] {
  return categories;
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getSubcategory(
  categorySlug: string,
  subcategorySlug: string
): Subcategory | undefined {
  const cat = getCategory(categorySlug);
  return cat?.subcategories.find((s) => s.slug === subcategorySlug);
}

export function getAllProducts(): Product[] {
  return categories.flatMap((c) => c.products);
}

export function getProductBySlug(slug: string): Product | undefined {
  return getAllProducts().find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  const cat = getCategory(categorySlug);
  return cat?.products ?? [];
}

export function getProductsBySubcategory(
  categorySlug: string,
  subcategorySlug: string
): Product[] {
  return getProductsByCategory(categorySlug).filter(
    (p) => p.subcategorySlug === subcategorySlug
  );
}

export function getFeaturedProducts(limit = 8): Product[] {
  return getAllProducts()
    .filter((p) => p.inStock)
    .sort((a, b) => b.favorites - a.favorites || b.views - a.views)
    .slice(0, limit);
}

export function getNewArrivals(limit = 8): Product[] {
  return getAllProducts()
    .filter((p) => p.inStock)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, limit);
}

export function getRelatedProducts(
  product: Product,
  limit = 4
): Product[] {
  return getAllProducts()
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.subcategorySlug === product.subcategorySlug ||
          p.categorySlug === product.categorySlug)
    )
    .sort((a, b) => b.favorites - a.favorites)
    .slice(0, limit);
}

export function searchProducts(
  query: string,
  filters?: {
    categorySlug?: string;
    subcategorySlug?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: "price-asc" | "price-desc" | "newest" | "popular";
  }
): Product[] {
  let results = getAllProducts();

  if (filters?.categorySlug) {
    results = results.filter((p) => p.categorySlug === filters.categorySlug);
  }
  if (filters?.subcategorySlug) {
    results = results.filter(
      (p) => p.subcategorySlug === filters.subcategorySlug
    );
  }
  if (filters?.minPrice !== undefined) {
    results = results.filter((p) => p.price >= filters.minPrice!);
  }
  if (filters?.maxPrice !== undefined) {
    results = results.filter((p) => p.price <= filters.maxPrice!);
  }

  if (query) {
    const q = query.toLowerCase();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.shortDescription.toLowerCase().includes(q)
    );
  }

  switch (filters?.sort) {
    case "price-asc":
      results.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      results.sort((a, b) => b.price - a.price);
      break;
    case "newest":
      results.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      break;
    case "popular":
    default:
      results.sort(
        (a, b) => b.favorites - a.favorites || b.views - a.views
      );
  }

  return results;
}
