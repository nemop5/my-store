import React, { useState, useContext, useEffect, useCallback } from "react";

import { CartService } from "../services";

const CartContext = React.createContext();

export function useCartContext() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [carts, setCarts] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getItem = useCallback(
    async (itemId) => {
      return CartService.get({ itemId }).then((data) => {
        const { companyId, categoryId, invoiceId, amortizationTypeId, supplierId, ownerId, ...other } = data;

        return {
          ...other,
        };
      });
    },
    []
  );

  const getAllItems = useCallback(
    async () => {
        return CartService.get().then((data) => {
            console.log("Get all carts", data)
            setCarts(data);
        });
    },
    []
  );

  const updateItem = async (item) => {
    return CartService.edit(item).then((cart) => {
      console.log("Update item", item)
    });
  };

  const addItem = async (item) => {
    const { isActive } = item;
  };

  const deleteCart = async (cartId) => {
    // return await InventoryService.deleteInventory(cartId).then(() => {
    //   setItems((prevState) => prevState.filter((item) => item.id !== inventoryId));
    // });
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
        addItem,
        updateItem,
        deleteCart,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
