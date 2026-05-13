import ProductCard from "@/components/search/ProductCard";
import type { Product } from "@/types/product.interface";

type ProductGridProps = {
  errorMessage?: string;
  isError: boolean;
  isLoading: boolean;
  products: Product[];
};

export default function ProductGrid({
  errorMessage,
  isError,
  isLoading,
  products,
}: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            className="h-80 animate-pulse rounded-lg border border-border bg-muted"
            key={index}
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
        {errorMessage ?? "Could not load products. Please try again."}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center text-sm text-muted-foreground">
        No products matched your search.
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
