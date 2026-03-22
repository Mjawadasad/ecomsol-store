import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  const hasVariations = product.variations && product.variations.length > 0;
  const lowestPrice = hasVariations
    ? Math.min(...product.variations!.map((v) => v.price))
    : product.price;

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group block rounded-xl border border-border bg-background-card overflow-hidden hover:border-border-hover hover:shadow-lg hover:shadow-accent-glow transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-background-secondary">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Category badge */}
        <span className="absolute top-3 left-3 rounded-full bg-accent/90 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {product.category === "sets" ? "Set" : product.category === "ears" ? "Ears" : "Tail"}
        </span>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-sm font-semibold leading-snug line-clamp-2 group-hover:text-accent transition-colors font-sans">
          {product.shortName}
        </h3>
        <p className="mt-1 text-xs text-foreground-muted line-clamp-2">
          {product.shortDescription}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-accent font-sans">
            {hasVariations ? `From $${lowestPrice.toFixed(2)}` : `$${product.price.toFixed(2)}`}
          </span>
          <span className="text-xs text-foreground-muted group-hover:text-accent transition-colors">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
}
