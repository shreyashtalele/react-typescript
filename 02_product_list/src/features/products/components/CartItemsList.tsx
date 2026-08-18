import type { CartItem } from "../types/cart";
import CartItems from "./CartItem";

type CartItemsListProps = {
  cartItems: CartItem[];
  handleIncreaseQuantity: (cartItem: CartItem) => void;
  handleDecreaseQuantity: (cartItem: CartItem) => void;
  handleRemoveFromCart: (cartItem: CartItem) => void;
  handleClearCart: () => void;
};

export default function CartItemsList({
  cartItems,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
  handleRemoveFromCart,
  handleClearCart,
}: CartItemsListProps) {
  return (
    <div className="flex w-full max-w-2xl flex-col gap-4">
      {cartItems.map((cartItem) => (
        <CartItems
          key={cartItem.product.id}
          product={cartItem.product}
          quantity={cartItem.quantity}
          handleIncreaseQuantity={handleIncreaseQuantity}
          handleDecreaseQuantity={handleDecreaseQuantity}
          handleRemoveFromCart={handleRemoveFromCart}
        />
      ))}

      <button onClick={handleClearCart}> clear cart </button>
    </div>
  );
}
