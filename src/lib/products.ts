import { api } from "@/lib/axios";
import type { CatalogResponse, ProductFilters, ProductsResponse } from "@/types/product.interface";

export const defaultProductFilters: ProductFilters = {
  brands: [],
  categories: [],
  fields: "title,price,imageCover,ratingsAverage,category,brand",
  keyword: "",
  limit: 8,
  maxPrice: "",
  minPrice: "",
  page: 1,
  sort: "",
};

export async function getProducts(filters: ProductFilters) {
  const params = buildProductSearchParams(filters);
  const { data } = await api.get<ProductsResponse>(`/products?${params.toString()}`);

  return data;
}

export async function getCategories() {
  const { data } = await api.get<CatalogResponse>("/categories?limit=100");

  return data;
}

export async function getBrands() {
  const { data } = await api.get<CatalogResponse>("/brands?limit=100");

  return data;
}

function buildProductSearchParams(filters: ProductFilters) {
  const params = new URLSearchParams();

  params.set("page", String(filters.page));
  params.set("limit", String(filters.limit));

  if (filters.sort) {
    params.set("sort", filters.sort);
  }
  if (filters.fields) {
    params.set("fields", filters.fields);
  }
  if (filters.keyword) {
    params.set("keyword", filters.keyword);
  }
  if (filters.minPrice) {
    params.set("price[gte]", filters.minPrice);
  }
  if (filters.maxPrice) {
    params.set("price[lte]", filters.maxPrice);
  }

  if (filters.brands.length === 1) {
    params.set("brand", filters.brands[0]);
  } else {
    filters.brands.forEach((brand) => params.append("brand[in]", brand));
  }

  filters.categories.forEach((category) => params.append("category[in]", category));

  return params;
}
