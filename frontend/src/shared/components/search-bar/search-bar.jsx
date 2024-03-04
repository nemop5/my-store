import React from "react";
import { useDebounce } from "../../hooks";

import "./search-bar.scss";

export const SearchBar = React.forwardRef(
  ({ onChange, placeholder, autoComplete, spellCheck, delay = 300, id }, ref) => {
    const { debounce } = useDebounce(delay);

    return (
      <div className="filters__form">
        <fieldset>
          <label htmlFor={id}>
            <input
              type="search"
              name={id}
              onChange={(e) => debounce(onChange, e.target.value)}
              placeholder={placeholder}
              className="filters__input"
              autoComplete={autoComplete}
              spellCheck={spellCheck}
              ref={ref}
            />
          </label>
        </fieldset>
      </div>
    );
  }
);
