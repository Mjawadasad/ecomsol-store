// Generic e-commerce types — not tied to any specific product category

export interface ProductImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Variation {
  name: string;
  price: number;
}

export interface Marketplace {
  name: "etsy" | "amazon" | "shopify";
  url: string;
  listingId?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice?: number;
  currency: string;
  categorySlug: string;
  subcategorySlug: string;
  images: ProductImage[];
  tags: string[];
  materials: string[];
  colors: string[];
  features: string[];
  marketplace: Marketplace;
  inStock: boolean;
  views: number;
  favorites: number;
  createdAt: string;
  variations?: Variation[];
}

export interface Subcategory {
  slug: string;
  name: string;
  description: string;
  productCount?: number;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  heroDescription: string;
  heroImage?: string;
  subcategories: Subcategory[];
  products: Product[];
}
