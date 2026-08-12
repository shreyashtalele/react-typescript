import { useState } from "react";
import ProductList from "./features/products/components/ProductList";
import type { Product } from "./features/products/types/product";
import CartItemsList from "./features/products/components/CartItemsList";

function App() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  function handleAddToCart(product: Product) {
    setCartItems((prevCartItems) => [...prevCartItems, product]);
  }
  return (
    <div>
      <ProductList handleAddToCart={handleAddToCart} />
      <CartItemsList cartItems={cartItems} />
    </div>
  );
}

export default App;
