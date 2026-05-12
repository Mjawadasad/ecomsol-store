import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/types";
import MarketplaceBadge from "./MarketplaceBadge";

export default function ProductCard({ product }: { product: Product }) {
  const hasVariations = product.variations && product.variations.length > 0;
  const lowestPrice = hasVariations
    ? Math.min(...product.variations!.map((v) => v.price))
    : product.price;
  const primaryImage = product.images[0];

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group block rounded-xl border border-border bg-white overflow-hidden hover:border-border-hover hover:shadow-md transition-all duration-300"
    >
      <div className="relative aspect-square overflow-hidden bg-surface">
        {primaryImage && (
          <Image
            src={primaryImage.src}
            alt={primaryImage.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
        <div className="absolute top-3 left-3">
          <MarketplaceBadge marketplace={product.marketplace.name} />
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-sm font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {product.shortName}
        </h3>
        <p className="mt-1 text-xs text-fg-muted line-clamp-2">
          {product.shortDescription}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-fg">
            {hasVariations
              ? `From $${lowestPrice.toFixed(2)}`
              : `$${product.price.toFixed(2)}`}
          </span>
          <span className="text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
            Shop Now &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}
