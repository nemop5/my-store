import React, { useState, useContext, useEffect, useCallback } from "react";

import { CartService } from "../services";

const CartContext = React.createContext();

export function useCartContext() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [carts, setCarts] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getAllItems = useCallback(
    async () => {
      return CartService.get().then((data) => {
          setCarts(data);
      });
    },
    []
  );

  const updateCart = async (item) => {
    return CartService.edit(item).then((cart) => {
      console.log("Update item", item)
    });
  };

  const addCart = async (products) => {
    return await CartService.addCart(products).then((item) => {
      console.log("Created item", item);
      setCarts([...carts, item])
    })
  };

  const deleteCart = async (cartId) => {
    return await CartService.deleteCart(cartId).then(() => {
      setCarts((prevState) => prevState.filter((item) => item.id !== cartId));
    });
  };

  useEffect(() => {
    setIsLoading(true);
    CartService.get()
      .then((data) => {
        setCarts(data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <CartContext.Provider
      value={{
        carts,
        getAllItems,
        addCart,
        updateCart,
        deleteCart,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
