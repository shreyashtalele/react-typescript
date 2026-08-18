import { useState, useEffect } from "react";

import type { CartItem } from "../../products/types/cart";
import type { Product } from "../../products/types/product";

export default function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem("cartItems");

    if (!storedCart) {
      return [];
    }
    return JSON.parse(storedCart);
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  function handleAddToCart(product: Product) {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find(
        (cartItem) => cartItem.product.id === product.id,
      );

      if (existingItem) {
        return prevCartItems.map((cartItem) => {
          if (cartItem.product.id === product.id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            };
          }

          return cartItem;
        });
      }

      return [
        ...prevCartItems,
        {
          product: product,
          quantity: 1,
        },
      ];
    });
  }

  function handleIncreaseQuantity(cartItem: CartItem) {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) => {
        if (item.product.id === cartItem.product.id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }

        return item;
      }),
    );
  }

  function handleDecreaseQuantity(cartItem: CartItem) {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) => {
        if (item.product.id === cartItem.product.id && item.quantity > 1) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      }),
    );
  }

  function handleRemoveFromCart(cartItem: CartItem) {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.product.id !== cartItem.product.id),
    );
  }

  function handleClearCart() {
    setCartItems([]);
  }

  const total = cartItems.reduce(
    (total, cartItem) => total + cartItem.product.price * cartItem.quantity,
    0,
  );

  const cartItemCount = cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0,
  );

  return {
    cartItems,
    handleAddToCart,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleRemoveFromCart,
    handleClearCart,
    total,
    cartItemCount,
  };
}
