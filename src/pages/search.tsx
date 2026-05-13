import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import ProductFiltersPanel from "@/components/search/ProductFiltersPanel";
import ProductGrid from "@/components/search/ProductGrid";
import ProductPagination from "@/components/search/ProductPagination";
import ProductSearchHeader from "@/components/search/ProductSearchHeader";
import { defaultProductFilters, getBrands, getCategories, getProducts } from "@/lib/products";
import type { ProductFilters } from "@/types/product.interface";
import { searchParamsSchema } from "@/schemas/params.schema";

type SearchPageParams = z.infer<typeof searchParamsSchema>;

export default function SearchPage({
  search,
  navigate,
}: {
  search: SearchPageParams;
  navigate: (opts: { replace: boolean; search: SearchPageParams }) => void;
}) {

  
  const filters = useMemo<ProductFilters>(() => searchToProductFilters(search), [search]);

  const productsQuery = useQuery({
    queryKey: ["products", filters],
    queryFn: () => getProducts(filters),
  });

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 10,
    select: (data) => data.data,
  });

  const brandsQuery = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
    staleTime: 1000 * 60 * 10,
    select: (data) => data.data,
  });

  const products = useMemo(() => productsQuery.data?.data ?? [], [productsQuery.data?.data]);

  const visibleProducts = useMemo(() => {
    const searchValue = (search.q ?? "").trim().toLowerCase();

    if (!searchValue) {
      return products;
    }

    return products.filter((product) => {
      const searchableText = [product.title, product.category?.name, product.brand?.name]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(searchValue);
    });
  }, [products, search.q]);

  const updateFilters = (nextFilters: ProductFilters) => {
    void navigate({
      replace: true,
      search: productFiltersToSearch(nextFilters, search.q ?? ""),
    });
  };

  const updateClientSearch = (q: string) => {
    void navigate({
      replace: true,
      search: productFiltersToSearch(filters, q),
    });
  };

  const resetFilters = () => {
    void navigate({
      replace: true,
      search: productFiltersToSearch(defaultProductFilters, ""),
    });
  };

  const errorMessage =
    productsQuery.error instanceof Error ? productsQuery.error.message : undefined;

  return (
    <main className="bg-muted/30 px-4 py-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[320px_1fr]">
        <ProductFiltersPanel
          brands={brandsQuery.data ?? []}
          categories={categoriesQuery.data ?? []}
          filters={filters}
          isBrandsLoading={brandsQuery.isLoading}
          isCategoriesLoading={categoriesQuery.isLoading}
          onChange={updateFilters}
          onReset={resetFilters}
        />

        <section className="space-y-5">
          <ProductSearchHeader
            clientSearch={search.q ?? ""}
            onClientSearchChange={updateClientSearch}
            totalProducts={productsQuery.data?.results || null}
            visibleProducts={visibleProducts.length}
          />

          <ProductGrid
            errorMessage={errorMessage}
            isError={productsQuery.isError}
            isLoading={productsQuery.isLoading}
            products={visibleProducts}
          />

          <ProductPagination
            metadata={productsQuery.data?.metadata}
            onPageChange={(page) =>
              updateFilters({
                ...filters,
                page,
              })
            }
          />
        </section>
      </div>
    </main>
  );
}

function searchToProductFilters(search: SearchPageParams): ProductFilters {
  return {
    brands: parseList(search.brand),
    categories: parseList(search.category),
    fields: defaultProductFilters.fields,
    keyword: defaultProductFilters.keyword,
    limit: search.limit ?? defaultProductFilters.limit,
    maxPrice: search.maxPrice ?? defaultProductFilters.maxPrice,
    minPrice: search.minPrice ?? defaultProductFilters.minPrice,
    page: search.page ?? defaultProductFilters.page,
    sort: search.sort ?? defaultProductFilters.sort,
  };
}

function productFiltersToSearch(filters: ProductFilters, q: string): SearchPageParams {
  const search: SearchPageParams = {};
  const brand = filters.brands.join(",");
  const category = filters.categories.join(",");
  const clientSearch = q.trim();

  if (brand) {
    search.brand = brand;
  }
  if (category) {
    search.category = category;
  }
  if (filters.limit !== defaultProductFilters.limit) {
    search.limit = filters.limit;
  }
  if (filters.maxPrice) {
    search.maxPrice = filters.maxPrice;
  }
  if (filters.minPrice) {
    search.minPrice = filters.minPrice;
  }
  if (filters.page !== defaultProductFilters.page) {
    search.page = filters.page;
  }
  if (clientSearch) {
    search.q = clientSearch;
  }
  if (filters.sort) {
    search.sort = filters.sort;
  }

  return search;
}

function parseList(value?: string) {
  return value?.split(",").filter((item) => item !== "") || [];
}
