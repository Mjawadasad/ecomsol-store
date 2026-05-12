import Link from "next/link";
import type { Subcategory } from "@/data/types";

export default function SubcategoryFilter({
  categorySlug,
  subcategories,
  activeSlug,
}: {
  categorySlug: string;
  subcategories: Subcategory[];
  activeSlug?: string;
}) {
  const populated = subcategories.filter((s) => (s.productCount ?? 0) > 0);

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href={`/category/${categorySlug}`}
        className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
          !activeSlug
            ? "bg-primary text-white border-primary"
            : "bg-white text-fg-secondary border-border hover:border-border-hover hover:text-fg"
        }`}
      >
        All
      </Link>
      {populated.map((sub) => (
        <Link
          key={sub.slug}
          href={`/category/${categorySlug}/${sub.slug}`}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
            activeSlug === sub.slug
              ? "bg-primary text-white border-primary"
              : "bg-white text-fg-secondary border-border hover:border-border-hover hover:text-fg"
          }`}
        >
          {sub.name}
          <span className="ml-1.5 text-xs opacity-70">
            {sub.productCount}
          </span>
        </Link>
      ))}
    </div>
  );
}
