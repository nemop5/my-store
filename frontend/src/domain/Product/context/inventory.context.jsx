import React, { useState, useContext, useEffect, useCallback } from "react";

import { InventoryService } from "../services";
import { useFiltersContext } from "domain/Filters";

const InventoryContext = React.createContext();

export function useInventoryContext() {
  return useContext(InventoryContext);
}

export function InventoryProvider({ children }) {
  const { applyFilters } = useFiltersContext();
  const [items, setItems] = useState();
  const [isValidToAddNewItem, setIsValidToAddNewItem] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getItem = useCallback(
    async (itemId) => {
      return InventoryService.get({ itemId }).then((data) => {
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

  const updateItem = async (item) => {
    return InventoryService.update(item).then((inventory) => {
      return inventory.updatedInventory;
    });
  };

  const addItem = async (item, count) => {
    const { isActive } = item;

    item.activationDate = isActive ? new Date() : null;

    try {
      const createdItems = await InventoryService.add(item, count);
      const newItems = createdItems.map((createdItem) => {
        return { ...createdItem };
      });

      setItems((oldItems) => [...oldItems, ...newItems]);

      return newItems;
    } catch (error) {
      console.error("Error adding item:", error);
      throw error;
    }
  };

  const updateSelection = (selectionArray) => setSelectedItems(selectionArray);

  const serialNumberAlreadyExist = (serialNumber) => {
    const params = { serialNumber: serialNumber };
    InventoryService.get(params).then((response) => {
      if (response.length === 0) {
        return setIsValidToAddNewItem(true);
      }
      return setIsValidToAddNewItem(false);
    });
  };

  useEffect(() => {
    const params = { ...applyFilters, };

    setIsLoading(true);
    InventoryService.get(params)
      .then((data) => {
        setItems(data);
      })
      .finally(() => setIsLoading(false));
  }, [applyFilters]);

  const deleteInventory = async (inventoryId, deleteReason) => {
    return await InventoryService.deleteInventory(inventoryId, deleteReason).then(() => {
      setItems((prevState) => prevState.filter((item) => item.id !== inventoryId));
    });
  };

  return (
    <InventoryContext.Provider
      value={{
        items,
        isValidToAddNewItem,
        serialNumberAlreadyExist,
        getItem,
        getAllItems,
        addItem,
        selectedItems,
        updateSelection,
        updateItem,
        deleteInventory,
        isLoading,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
}
