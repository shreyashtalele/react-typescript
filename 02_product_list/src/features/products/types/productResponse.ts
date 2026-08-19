import type { Product } from "./product";

export type ApiProduct = {
  id: number;
  title: string;
  price: number;
};

export type ProductsResponse = {
  products: ApiProduct[];
  total: number;
  skip: number;
  limit: number;
};
