'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export interface Product {
  id: string;
  title: string;
  badge: string;
  badgeColor: string;
  specs: string[];
  price: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
  priceNumeric: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalArticles: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const parsePrice = (price: string) => {
  const numeric = price.replace(/[^0-9]/g, '');
  return Number(numeric || 0);
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('highteq_cart');
      if (savedCart) {
        const parsed = JSON.parse(savedCart) as CartItem[];
        const normalized = parsed.map((item) => ({
          ...item,
          quantity: item.quantity || 1,
          priceNumeric: item.priceNumeric || parsePrice(item.price || '0'),
        }));
        setCart(normalized);
      }
    } catch (e) {
      console.error('Erreur lecture localStorage:', e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem('highteq_cart', JSON.stringify(cart));
      } catch (e) {
        console.error('Erreur écriture localStorage:', e);
      }
    }
  }, [cart, isInitialized]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity: 1,
          priceNumeric: parsePrice(product.price),
        },
      ];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev.flatMap((item) => {
        if (item.id !== id) return [item];

        const nextQuantity = item.quantity + delta;
        if (nextQuantity <= 0) return [];

        return [{ ...item, quantity: nextQuantity }];
      })
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totals = useMemo(() => {
    const totalArticles = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.priceNumeric * item.quantity, 0);

    return {
      totalItems: totalArticles,
      totalArticles,
      totalPrice,
    };
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        ...totals,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart doit être utilisé dans un CartProvider');
  }
  return context;
};