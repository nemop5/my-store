import React, { useState, useContext, useCallback } from "react";
import { useLocalStorage } from "../../App/hooks/useLocalStorage";

const FiltersContext = React.createContext();
const DEFAULT_ITEMS_PER_VIEW = 100;
const ITEMS_PER_VIEW = "itemsPerView";

export function useFiltersContext() {
  return useContext(FiltersContext);
}

export function FiltersProvider({ children }) {
  const [applyFilters, setApplyFilters] = useState({});
  const [pendingFilters, setPendingFilters] = useState({});

  const saveFilter = useCallback(
    (filter) => {
      setPendingFilters((existing) => {
        if (filter.values.length === 0) return existing;

        return {
          ...existing,
          [filter.name]: filter.values.join(","),
        };
      });
    },
    [setPendingFilters]
  );

  const removeFilter = useCallback(
    (filterName) => {
      setPendingFilters((existing) => {
        if (Object.keys(existing).length === 0 && typeof existing === "object" && existing != null) return {};

        const cleanedFilters = { ...existing };
        delete cleanedFilters[filterName];
        return cleanedFilters;
      });
    },
    [setPendingFilters]
  );

  const clearFilters = () => {
    setApplyFilters({});
    setPendingFilters({});
  };

  const applyPendingFilters = useCallback(() => {
    setApplyFilters(pendingFilters);
  }, [pendingFilters]);

  const [itemsPerView, setItemsPerView] = useLocalStorage(ITEMS_PER_VIEW, DEFAULT_ITEMS_PER_VIEW);

  return (
    <FiltersContext.Provider
      value={{
        applyFilters,
        setApplyFilters,
        removeFilter,
        clearFilters,
        saveFilter,
        itemsPerView,
        setItemsPerView,
        applyPendingFilters,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}
