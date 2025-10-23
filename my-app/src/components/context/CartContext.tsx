"use client";

import React, { createContext, useContext, useState } from "react";
import type { Product } from "@/interfaces/product.interface";


interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (slug: string) => void;
  updateQuantity: (slug: string, qty: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const exist = prev.find(
        (ci) => ci.slug === item.slug && ci.selectedSize === item.selectedSize
      );
      if (exist) {
        return prev.map((ci) =>
          ci.slug === item.slug && ci.selectedSize === item.selectedSize
            ? { ...ci, quantity: ci.quantity + item.quantity }
            : ci
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (slug: string) => {
    setCart((prev) => prev.filter((ci) => ci.slug !== slug));
  };

  const updateQuantity = (slug: string, qty: number) => {
    setCart((prev) =>
      prev.map((ci) => (ci.slug === slug ? { ...ci, quantity: qty } : ci))
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

//Esto sirve para que no salte error demasiado largo y confuso!
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de CartProvider");
  return context;
};
