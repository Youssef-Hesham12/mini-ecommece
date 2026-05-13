import type { ReactNode } from "react";
import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { CatalogItem, ProductFilters } from "@/types/product.interface";

type ProductFiltersPanelProps = {
  brands: CatalogItem[];
  categories: CatalogItem[];
  filters: ProductFilters;
  isBrandsLoading: boolean;
  isCategoriesLoading: boolean;
  onChange: (filters: ProductFilters) => void;
  onReset: () => void;
};

export default function ProductFiltersPanel({
  brands,
  categories,
  filters,
  isBrandsLoading,
  isCategoriesLoading,
  onChange,
  onReset,
}: ProductFiltersPanelProps) {
  const updateFilter = <Key extends keyof ProductFilters>(key: Key, value: ProductFilters[Key]) => {
    onChange({
      ...filters,
      [key]: value,
      page: 1,
    });
  };

  const toggleCategory = (categoryId: string) => {
    updateFilter("categories", toggleId(filters.categories, categoryId));
  };

  const toggleBrand = (brandId: string) => {
    updateFilter("brands", toggleId(filters.brands, brandId));
  };

  return (
    <aside className="space-y-6 rounded-lg border border-border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-semibold text-card-foreground">Filters</h2>
        <Button className="gap-1.5" onClick={onReset} size="sm" type="button" variant="ghost">
          <RotateCcw className="size-3.5" aria-hidden="true" />
          Reset
        </Button>
      </div>

      <CheckboxSection
        checkedIds={filters.categories}
        isLoading={isCategoriesLoading}
        items={categories}
        onToggle={toggleCategory}
        title="Categories"
      />

      <CheckboxSection
        checkedIds={filters.brands}
        isLoading={isBrandsLoading}
        items={brands}
        onToggle={toggleBrand}
        title="Brands"
      />


      <div className="grid grid-cols-2 gap-3">
        <FilterField label="Min price">
          <input
            className={inputClassName}
            min="0"
            onChange={(event) => updateFilter("minPrice", event.target.value)}
            placeholder="100"
            type="number"
            value={filters.minPrice}
          />
        </FilterField>

        <FilterField label="Max price">
          <input
            className={inputClassName}
            min="0"
            onChange={(event) => updateFilter("maxPrice", event.target.value)}
            placeholder="500"
            type="number"
            value={filters.maxPrice}
          />
        </FilterField>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <FilterField label="Limit">
          <select
            className={inputClassName}
            onChange={(event) => updateFilter("limit", Number(event.target.value))}
            value={filters.limit}
          >
            <option value={4}>4</option>
            <option value={8}>8</option>
            <option value={12}>12</option>
            <option value={20}>20</option>
          </select>
        </FilterField>

        <FilterField label="Sort">
          <select
            className={inputClassName}
            onChange={(event) => updateFilter("sort", event.target.value)}
            value={filters.sort}
          >
            <option value="">Default</option>
            <option value="price">Price low</option>
            <option value="-price">Price high</option>
            <option value="-ratingsAverage">Top rated</option>
          </select>
        </FilterField>
      </div>

    </aside>
  );
}

const inputClassName =
  "h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-3 focus:ring-primary/20";

type CheckboxSectionProps = {
  checkedIds: string[];
  isLoading: boolean;
  items: CatalogItem[];
  onToggle: (id: string) => void;
  title: string;
};

function CheckboxSection({ checkedIds, isLoading, items, onToggle, title }: CheckboxSectionProps) {
  return (
    <section className="border-b border-border pb-5">
      <h3 className="mb-4 text-lg font-semibold text-card-foreground">{title}</h3>

      <div className="max-h-64 space-y-3 overflow-y-auto pr-2">
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading {title.toLowerCase()}...</p>
        ) : null}

        {!isLoading && items.length === 0 ? (
          <p className="text-sm text-muted-foreground">No {title.toLowerCase()} found.</p>
        ) : null}

        {items.map((item) => (
          <label
            className="flex cursor-pointer items-center gap-3 text-sm text-foreground"
            key={item._id}
          >
            <input
              checked={checkedIds.includes(item._id)}
              className="size-5 rounded border-border text-primary accent-primary"
              onChange={() => onToggle(item._id)}
              type="checkbox"
            />
            <span className="truncate">{item.name}</span>
          </label>
        ))}
      </div>
    </section>
  );
}

type FilterFieldProps = {
  children: ReactNode;
  label: string;
};

function FilterField({ children, label }: FilterFieldProps) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-foreground">{label}</span>
      {children}
    </label>
  );
}

function toggleId(ids: string[], id: string) {
  return ids.includes(id) ? ids.filter((currentId) => currentId !== id) : [...ids, id];
}
