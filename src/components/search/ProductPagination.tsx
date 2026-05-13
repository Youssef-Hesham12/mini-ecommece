import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { ProductsMetadata } from "@/types/product.interface";

type ProductPaginationProps = {
  metadata?: ProductsMetadata;
  onPageChange: (page: number) => void;
};

export default function ProductPagination({ metadata, onPageChange }: ProductPaginationProps) {
  if (!metadata || metadata.numberOfPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card p-3">
      <Button
        className="gap-1"
        disabled={!metadata.prevPage}
        onClick={() => metadata.prevPage && onPageChange(metadata.prevPage)}
        type="button"
        variant="outline"
      >
        <ChevronLeft className="size-4" aria-hidden="true" />
        Previous
      </Button>

      <p className="text-sm text-muted-foreground">
        Page {metadata.currentPage} of {metadata.numberOfPages}
      </p>

      <Button
        className="gap-1"
        disabled={!metadata.nextPage}
        onClick={() => metadata.nextPage && onPageChange(metadata.nextPage)}
        type="button"
        variant="outline"
      >
        Next
        <ChevronRight className="size-4" aria-hidden="true" />
      </Button>
    </div>
  );
}
