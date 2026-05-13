export type ProductOwner = {
  _id: string;
  name: string;
  slug?: string;
  image?: string;
};

export type Product = {
  _id: string;
  title: string;
  slug?: string;
  description?: string;
  price: number;
  priceAfterDiscount?: number;
  imageCover?: string;
  ratingsAverage?: number;
  ratingsQuantity?: number;
  category?: ProductOwner;
  brand?: ProductOwner;
};

export type ProductsMetadata = {
  currentPage: number;
  limit: number;
  numberOfPages: number;
  nextPage?: number;
  prevPage?: number;
};

export type ProductsResponse = {
  results: number;
  metadata: ProductsMetadata;
  data: Product[];
};

export type ProductFilters = {
  brands: string[];
  categories: string[];
  fields: string;
  keyword: string;
  limit: number;
  maxPrice: string;
  minPrice: string;
  page: number;
  sort: string;
};

export type CatalogItem = {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
};

export type CatalogResponse = {
  results: number;
  metadata: ProductsMetadata;
  data: CatalogItem[];
};
