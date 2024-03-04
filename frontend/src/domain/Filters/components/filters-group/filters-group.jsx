import React, { useEffect, useState } from "react";

import { Button, Dropdown, SearchBar } from "shared";
import { BsFilter } from "react-icons/bs";
import { IoClose } from "react-icons/io5";

import { useItemsFilters } from "../../hooks";

import "./filters-group.scss";
import { useFiltersContext } from "../../context";
import clsx from "clsx";

export const FiltersGroup = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [clearChoices, setClearChoices] = useState(false);
  const { applyPendingFilters, clearFilters } = useFiltersContext();
  const {
    onSearchQueryChange,
  } = useItemsFilters();

  const toggleFiltersHandler = () => {
    setShowFilters(!showFilters);
  };

  const closeFiltersHandler = () => {
    setShowFilters(false);
  };

  const clearFiltersHandler = () => {
    clearFilters();
    setClearChoices(true);
  };

  const updateClearHandler = () => {
    setClearChoices(false);
  };

  const applyFiltersHandler = () => {
    applyPendingFilters();
    closeFiltersHandler();
  };

  const categories = [];
  const onCategoryValueFilterChange = () => {
    console.log("filter changed");
  }

  useEffect(() => {
    if (showFilters) return;
    applyPendingFilters();
  }, [showFilters, applyPendingFilters]);

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
        <button
          className={clsx("filters__btn", { "filters__btn--active": showFilters })}
          onClick={toggleFiltersHandler}
        >
          <BsFilter />
        </button>
      </div>
      <div className={clsx("filters__container", { "filters__container--active": showFilters })}>
        <div className="filters__wrap">
          <div className="filters__close">
            <Button
              buttonIcon={<IoClose className="filters__close-icon" />}
              buttonColor={"red"}
              event={closeFiltersHandler}
            />
          </div>
          <div className="filters__options">
            <div className="filters__field">
            <p className="filters__name">Kategorije</p>
              <Dropdown
                choices={categories}
                onChange={onCategoryValueFilterChange}
                isMultipleChoice
                allSelectedLabel="Izaberi kategoriju"
                clearChoices={clearChoices}
                onSelection={updateClearHandler}
              />
            </div>
          </div>
          <div className="filters__bottom">
            <div className="filters__ctas">
              <Button buttonText={"Potvrdi"} buttonColor={"blue"} event={applyFiltersHandler} />
              <Button buttonText={"Poništi"} buttonColor={"red"} event={clearFiltersHandler} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
