import ProductList from "./features/products/components/ProductList";

import CartItemsList from "./features/products/components/CartItemsList";
import useCart from "./features/cart/hooks/useCart";

function App() {
  const {
    cartItems,
    handleAddToCart,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleRemoveFromCart,
    handleClearCart,
    total,
    cartItemCount,
  } = useCart();

  return (
    <div>
      <ProductList handleAddToCart={handleAddToCart} />
      {cartItems.length === 0 ? (
        <h3>Add Some Items To Get Started</h3>
      ) : (
        <>
          <CartItemsList
            cartItems={cartItems}
            handleIncreaseQuantity={handleIncreaseQuantity}
            handleDecreaseQuantity={handleDecreaseQuantity}
            handleRemoveFromCart={handleRemoveFromCart}
            handleClearCart={handleClearCart}
          />

          <h3>Total: ₹{total.toLocaleString("en-IN")}</h3>
          <h3>Cart ({cartItemCount})</h3>
        </>
      )}
    </div>
  );
}

export default App;
