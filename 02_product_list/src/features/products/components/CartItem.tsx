import type { Product } from "../types/product";
import type { CartItem } from "../types/cart";
type CartItemProps = {
  product: Product;
  quantity: number;
  handleIncreaseQuantity: (cartItem: CartItem) => void;
  handleDecreaseQuantity: (cartItem: CartItem) => void;
  handleRemoveFromCart: (cartItem: CartItem) => void;
};

function CartItems({
  product,
  quantity,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
  handleRemoveFromCart,
}: CartItemProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>

        <p className="text-sm text-gray-600">
          Price: ₹{product.price.toLocaleString("en-IN")}
        </p>

        <p className="text-sm font-medium text-gray-700">
          Quantity: {quantity}
        </p>
      </div>

      <div className="text-right">
        <p className="text-lg font-bold text-gray-900">
          ₹{(product.price * quantity).toLocaleString("en-IN")}
        </p>

        <p className="text-xs text-gray-500">Total</p>

        <button
          onClick={() => handleIncreaseQuantity({ product, quantity })}
          className="w-8 h-8 rounded-md bg-blue-600 text-white font-bold text-lg flex items-center justify-center hover:bg-blue-700 active:scale-95 transition"
        >
          +
        </button>

        <button
          onClick={() => handleDecreaseQuantity({ product, quantity })}
          className="w-8 h-8 rounded-md bg-blue-600 text-white font-bold text-lg flex items-center justify-center hover:bg-blue-700 active:scale-95 transition"
        >
          -
        </button>

        <button
          onClick={() =>
            handleRemoveFromCart({
              product,
              quantity,
            })
          }
          className="px-4 py-2 rounded-md bg-red-600 text-white font-medium hover:bg-red-700 active:scale-95 transition"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItems;
