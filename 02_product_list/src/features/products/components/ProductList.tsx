import ProductCard from "./ProductCard";
import type { Product } from "../types/product";
import { useState, useEffect, useRef, useMemo } from "react";
import type { ProductsResponse } from "../types/productResponse";

type ProductListProps = {
  handleAddToCart: (product: Product) => void;
};

function ProductList({ handleAddToCart }: ProductListProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  async function fetchProducts() {
    let retryCount = 0;
    setLoading(true);
    setError(null);
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      while (retryCount < 4) {
        try {
          const response = await fetch("https://dummyjson.com/products", {
            signal: controller.signal,
          });
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
          return;
        } catch (error) {
          if (error instanceof Error && error.name === "AbortError") {
            return;
          } else if (retryCount < 3) {
            const delayTime = 1000 * 2 ** retryCount;
            retryCount++;
            await delay(delayTime);
          } else if (error instanceof Error) {
            setError(error.message);
            return;
          } else {
            setError("Something went wrong");
            return;
          }
        }
      }
    } finally {
      if (controller === abortControllerRef.current) {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    fetchProducts();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
    );
  }, [debouncedSearchTerm, products]);
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
        <div>
          <p>Something went Wrong {error}</p>
          <button onClick={fetchProducts}>Retry</button>
        </div>
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
