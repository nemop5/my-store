import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { DropdownItems, ToggleDropdown } from "../..";
import { SearchBar } from "../../../search-bar/search-bar";
import "./dropdown.scss";

export const Dropdown = ({
  choices,
  allSelectedLabel,
  isMultipleChoice,
  onChange,
  defaultValue = [],
  handleBlur,
  dropdownError,
  clearChoices = false,
  name,
  searchId,
  sortingKey,
  onScroll,
  paginationConfig,
  disabled = false,
  onSearchChange,
}) => {
  const [selectedChoices, setSelectedChoices] = useState(defaultValue);
  const [showChoices, setShowChoices] = useState(false);
  const [displayedChoices, setDisplayedChoices] = useState([]);
  const [shouldClear, setShouldClear] = useState(clearChoices);

  const searchRef = useRef();

  const toggleShowChoices = useCallback(() => setShowChoices((value) => !value), []);

  const selectChoice = useCallback(
    (choice) => (isMultipleChoice ? [...selectedChoices, choice] : [choice]),
    [isMultipleChoice, selectedChoices]
  );

  const deselectChoice = useCallback(
    (choice) => (isMultipleChoice ? selectedChoices.filter((c) => c !== choice) : []),
    [isMultipleChoice, selectedChoices]
  );

  const toggleSelectedChoice = useCallback(
    (choice) => () => {
      const newChoices =
        isMultipleChoice && selectedChoices.includes(choice) ? deselectChoice(choice) : selectChoice(choice);
      shouldClear && setShouldClear(false);
      setSelectedChoices(newChoices);
      onChange(newChoices);
    },
    [selectedChoices, isMultipleChoice, deselectChoice, selectChoice, shouldClear, onChange]
  );

  useEffect(() => {
    if (isMultipleChoice) return;
    setShowChoices(false);
  }, [selectedChoices, isMultipleChoice]);

  useEffect(() => {
    setDisplayedChoices(choices);
  }, [choices]);

  useEffect(() => {
    if (showChoices && searchId) searchRef.current.focus();
  }, [showChoices, searchId]);

  useEffect(() => {
    setShouldClear(clearChoices);
    clearChoices && setSelectedChoices([]);
    return () => {
      setShouldClear(false);
    };
  }, [clearChoices]);

  const isChecked = useCallback((choice) => selectedChoices.includes(choice), [selectedChoices]);

  const generateLabel = useMemo(() => {
    let displayValue = allSelectedLabel;
    if (!isMultipleChoice || shouldClear) {
      if (selectedChoices[0]?.name || selectedChoices[0]?.number) {
        displayValue = selectedChoices[0]?.name || selectedChoices[0]?.number;
      }
      if (selectedChoices[0]?.fullAddress && selectedChoices[0]?.floor) {
        displayValue = `${selectedChoices[0]?.fullAddress} / ${selectedChoices[0]?.floor}`;
      }
      return displayValue;
    }
    return selectedChoices.length ? `Odabranih: ${selectedChoices.length}` : allSelectedLabel;
  }, [isMultipleChoice, shouldClear, selectedChoices, allSelectedLabel]);

  const onScrollToBottom = (event) => {
    const element = event.target;
    if (element.scrollHeight - element.scrollTop === element.clientHeight && paginationConfig) {
      onScroll();
    }
  };

  return (
    <div className="dropdown" onScroll={onScrollToBottom}>
      {dropdownError && <span className="dropdown__error-message">{dropdownError}</span>}
      <ToggleDropdown
        error={dropdownError}
        handleClick={toggleShowChoices}
        onBlur={handleBlur}
        name={name}
        label={generateLabel}
        disabled={disabled}
      />
      {showChoices && (
        <>
          <div className="dropdown__backdrop" onClick={toggleShowChoices}></div>
          <div className="dropdown__container">
            {searchId && (
              <SearchBar
                onChange={onSearchChange}
                placeholder="Pretraži"
                autoComplete="off"
                spellCheck="false"
                id={searchId}
                ref={searchRef}
              />
            )}
            <ul className="dropdown__list">
              <DropdownItems
                items={displayedChoices}
                handleClick={toggleSelectedChoice}
                isMultipleChoice={isMultipleChoice}
                isChecked={isChecked}
              />
            </ul>
          </div>
        </>
      )}
    </div>
  );
};
