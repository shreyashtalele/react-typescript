import ProductCard from "./ProductCard";
import type { Product } from "../types/product";
import { useState, useEffect } from "react";
import type { ProductsResponse } from "../types/ProductResponse";

type ProductListProps = {
  handleAddToCart: (product: Product) => void;
};

function ProductList({ handleAddToCart }: ProductListProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");

  async function fetchProducts() {
    try {
      const response = await fetch("https://dummyjson.com/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = (await response.json()) as ProductsResponse;

      const products: Product[] = data.products.map((product) => ({
        id: product.id,
        name: product.title,
        price: product.price,
      }));

      setProducts(products);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
  );

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search Product"
      ></input>
      {loading ? (
        <p>Products are loading</p>
      ) : error ? (
        <p>Something went Wrong {error}</p>
      ) : filteredProducts.length === 0 ? (
        <p>No Product Found</p>
      ) : (
        filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
          />
        ))
      )}
    </div>
  );
}

export default ProductList;
