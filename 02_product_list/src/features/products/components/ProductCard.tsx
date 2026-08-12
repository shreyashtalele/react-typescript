import type { Product } from "../types/product";

type ProductCardProp = {
  product: Product;
  handleAddToCart: (product: Product) => void;
};
function ProductCard({ product, handleAddToCart }: ProductCardProp) {
  return (
    <div>
      <h3>{product.name}</h3>
      <p>{product.price}</p>
      <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
    </div>
  );
}

export default ProductCard;
