import { useFiltersContext } from "../context";

export function useItemsFilters() {
  const { saveFilter, removeFilter } = useFiltersContext();

  const handleFilterBySearch = (term, filterName = "searchTerm") => {
    console.log("handleFIlterBySearch", term, filterName)
    if (term === "") {
      removeFilter(filterName);
    } else {
      saveFilter({
        name: filterName,
        values: [term],
      });
    }
  };

  return {
    onSearchQueryChange: (term) => handleFilterBySearch(term),
  };
}
