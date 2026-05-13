import { Star } from "lucide-react";

import type { Product } from "@/types/product.interface";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const price = product.priceAfterDiscount ?? product.price;

  return (
    <article className="group overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-colors hover:border-primary/50">
      <div className="aspect-square bg-muted">
        {product.imageCover ? (
          <img
            alt={product.title}
            className="size-full object-contain p-4 transition-transform group-hover:scale-105"
            loading="lazy"
            src={product.imageCover}
          />
        ) : (
          <div className="flex size-full items-center justify-center px-4 text-center text-sm text-muted-foreground">
            No image
          </div>
        )}
      </div>

      <div className="space-y-3 p-4">
        <div className="space-y-1">
          <p className="text-xs font-medium text-primary">
            {product.category?.name ?? product.brand?.name ?? "Product"}
          </p>
          <h2 className="line-clamp-2 min-h-10 text-sm font-semibold text-card-foreground">
            {product.title}
          </h2>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-foreground">{price} EGP</span>
            {product.priceAfterDiscount ? (
              <span className="text-xs text-muted-foreground line-through">
                {product.price} EGP
              </span>
            ) : null}
          </div>

          {product.ratingsAverage ? (
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="size-3 fill-primary text-primary" aria-hidden="true" />
              {product.ratingsAverage}
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
