export default function MarketplaceBadge({
  marketplace,
  size = "sm",
}: {
  marketplace: string;
  size?: "sm" | "md";
}) {
  const colors: Record<string, string> = {
    etsy: "bg-badge-etsy",
    amazon: "bg-badge-amazon",
    shopify: "bg-success",
  };

  const sizeClasses = size === "md" ? "px-3 py-1 text-xs" : "px-2 py-0.5 text-[10px]";

  return (
    <span
      className={`${colors[marketplace] ?? "bg-fg-muted"} ${sizeClasses} text-white font-semibold rounded-full uppercase tracking-wide`}
    >
      {marketplace}
    </span>
  );
}
