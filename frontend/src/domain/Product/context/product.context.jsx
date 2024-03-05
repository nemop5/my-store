import React, { useState, useContext, useEffect, useCallback } from "react";

import { ProductService } from "../services";
import { useFiltersContext } from "domain/Filters";

const ProductContext = React.createContext();

export function useProductContext() {
  return useContext(ProductContext);
}

export function ProductProvider({ children }) {
  const { applyFilters } = useFiltersContext();
  const [items, setItems] = useState();
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getItem = useCallback(
    async (itemId) => {
      return ProductService.get({ itemId }).then((data) => {
        const { companyId, categoryId, invoiceId, amortizationTypeId, supplierId, ownerId, ...other } = data;

        return {
          ...other,
        };
      });
    },
    []
  );

  const getAllItems = useCallback(
    async (items) => {
      try {
        return await Promise.all(items.map((item) => getItem(item.itemId)));
      } catch (error) {
        alert(error);
      }
    },
    [getItem]
  );

  const updateSelection = (selectionArray) => setSelectedItems(selectionArray);

  useEffect(() => {
    const params = { ...applyFilters, };

    setIsLoading(true);
    ProductService.get(params)
      .then((data) => {
        setItems(data);
      })
      .finally(() => setIsLoading(false));
  }, [applyFilters]);

  return (
    <ProductContext.Provider
      value={{
        items,
        getItem,
        getAllItems,
        selectedItems,
        updateSelection,
        isLoading,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
