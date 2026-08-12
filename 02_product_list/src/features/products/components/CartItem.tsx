import type { Product } from "../types/product";

type CartItemProps = {
  product: Product;
};
function CartItems({ product }: CartItemProps) {
  return (
    <div>
      <h3>{product.name}</h3>
      <p>{product.price}</p>
    </div>
  );
}

export default CartItems;
