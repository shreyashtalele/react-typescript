import type { Product } from "../types/product";
import CartItems from "./CartItem";

type CartItemsListProps = {
  cartItems: Product[];
};
export default function CartItemsList({ cartItems }: CartItemsListProps) {
  return (
    <div>
      {cartItems.map((cartItem) => (
        <CartItems key={cartItem.id} product={cartItem} />
      ))}
    </div>
  );
}
