import { Search } from "lucide-react";

type ProductSearchHeaderProps = {
  clientSearch: string;
  onClientSearchChange: (value: string) => void;
  totalProducts: number |null;
  visibleProducts: number;
};

export default function ProductSearchHeader({
  clientSearch,
  onClientSearchChange,
  totalProducts,
  visibleProducts,
}: ProductSearchHeaderProps) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4 shadow-sm md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-card-foreground">Search Products</h1>
        <p className="text-sm text-muted-foreground">
          {totalProducts&&<>Showing {visibleProducts??""} of {totalProducts}</>}
        </p>
      </div>

      <div className="relative w-full md:max-w-sm">
        <Search
          className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <input
          className="h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-3 focus:ring-primary/20"
          onChange={(event) => onClientSearchChange(event.target.value)}
          placeholder="Search loaded products"
          type="search"
          value={clientSearch}
        />
      </div>
    </div>
  );
}
