import Link from "next/link";
import Image from "next/image";
import type { Category } from "@/data/types";
import { ArrowRight } from "lucide-react";

export default function CategoryCard({ category }: { category: Category }) {
  const productCount = category.products.length;
  const heroImage = category.products[0]?.images[0];

  return (
    <Link
      href={`/category/${category.slug}`}
      className="group relative block rounded-xl border border-border bg-white overflow-hidden hover:border-border-hover hover:shadow-md transition-all duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface">
        {heroImage && (
          <Image
            src={heroImage.src}
            alt={category.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-lg font-bold text-white">{category.name}</h3>
          <p className="mt-1 text-sm text-white/80">
            {productCount} {productCount === 1 ? "product" : "products"}
          </p>
        </div>
      </div>
      <div className="p-4 flex items-center justify-between">
        <p className="text-sm text-fg-secondary line-clamp-1">
          {category.description}
        </p>
        <ArrowRight className="h-4 w-4 text-fg-muted group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 ml-2" />
      </div>
    </Link>
  );
}
