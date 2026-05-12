import { ExternalLink } from "lucide-react";
import type { Marketplace } from "@/data/types";

const labels: Record<string, string> = {
  etsy: "Buy on Etsy",
  amazon: "Buy on Amazon",
  shopify: "Buy on Shopify",
};

export default function BuyButton({
  marketplace,
}: {
  marketplace: Marketplace;
}) {
  return (
    <a
      href={marketplace.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-cta text-white text-base font-semibold rounded-xl hover:bg-cta-hover transition-colors"
    >
      {labels[marketplace.name] ?? "Buy Now"}
      <ExternalLink className="h-4 w-4" />
    </a>
  );
}
