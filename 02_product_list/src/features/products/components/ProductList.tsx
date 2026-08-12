import { products } from "../data/products";
import ProductCard from "./ProductCard";
import type { Product } from "../types/product";

type ProductListProps = {
  handleAddToCart: (product: Product) => void;
};
function ProductList({ handleAddToCart }: ProductListProps) {
  return (
    <div>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          handleAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
}

export default ProductList;
