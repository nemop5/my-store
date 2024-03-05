import React, { useEffect } from "react";

import { SearchBar } from "shared";
import { useItemsFilters } from "../../hooks";
import { useFiltersContext } from "../..";

import "./filters-group.scss";

export const FiltersGroup = () => {
  const { applyPendingFilters } = useFiltersContext();
  const {
    onSearchQueryChange,
  } = useItemsFilters();

  useEffect(() => {
    applyPendingFilters();
  }, [applyPendingFilters]);

  return (
    <div className="filters">
      <div className="filters__search">
        <SearchBar
          onChange={onSearchQueryChange}
          placeholder="Pretraži"
          autoComplete="off"
          spellCheck="false"
          id="searchQuery"
        ></SearchBar>
      </div>
    </div>
  );
};
