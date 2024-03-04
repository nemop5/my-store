import { useFiltersContext } from "../context";

export function useItemsFilters() {
  const { saveFilter, removeFilter } = useFiltersContext();

  const handleFilterBySearch = (term, filterName = "searchTerm") => {
    if (term === "") {
      removeFilter(filterName);
    } else {
      saveFilter({
        name: filterName,
        values: [term],
      });
    }
  };

  const handleFilterByBoolean = (filterValue, filterName) => {
    if (!filterValue) {
      removeFilter(filterName);
    } else {
      saveFilter({
        name: filterName,
        values: [filterValue],
      });
    }
  };

  const handleFilterByProperty = (filterItems, filterName, property) => {
    if (!Array.isArray(filterItems) || !filterItems.length) {
      removeFilter(filterName);
    } else {
      const filterValues = [];
      filterItems.forEach((filter) => {
        filterValues.push(filter[property]);
      });

      saveFilter({
        name: filterName,
        values: filterValues,
      });
    }
  };

  return {
    onSearchQueryChange: (term) => handleFilterBySearch(term),
    onSmallInventoryValueFilterChange: (smallInventories) =>
      handleFilterByProperty(smallInventories, "isSmallInventory", "value"),
    onCategoriesFilterChange: (categories) => handleFilterByProperty(categories, "categoryId", "id"),
    onCompanyFilterChange: (companies) => handleFilterByProperty(companies, "companyId", "id"),
    onLocationFilterChange: (locations) => handleFilterByProperty(locations, "locationId", "id"),
    onEmployeeFilterChange: (employees) => handleFilterByProperty(employees, "employeeEmails", "email"),
    onAssignedFilterChange: (assignedCheckedStatus) => handleFilterByBoolean(assignedCheckedStatus, "isAssigned"),
    onOwnershipFilterChange: (companies) => handleFilterByProperty(companies, "ownerId", "id"),
  };
}
