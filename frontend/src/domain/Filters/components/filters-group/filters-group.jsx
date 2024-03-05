import React from "react";

import { SearchBar } from "shared";
import { useItemsFilters } from "../../hooks";

import "./filters-group.scss";

export const FiltersGroup = () => {
  const {
    onSearchQueryChange,
  } = useItemsFilters();

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
