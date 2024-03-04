import React, { useState } from "react";
import clsx from "clsx";

import "./input-switch.scss";

export const InputSwitch = ({
  disabled,
  name,
  onChange,
  isChecked = false,
  checkedLabel = "Da",
  uncheckedLabel = "Ne",
  small = false,
  hideLabels = false,
  description = "",
  className,
}) => {
  const [checked, setChecked] = useState(isChecked);

  const toggleOnSpace = (e) => {
    if (e.nativeEvent.code !== "Space") return;
    e.preventDefault();
    onChange(!checked);
    setChecked(!checked);
  };

  const toggleOnClick = () => {
    onChange(!checked);
    setChecked(!checked);
  };

  return (
    <div
      className={clsx(
        `input-switch__container`,
        {
          "input-switch__container--description": description?.length > 0,
        },
        className
      )}
    >
      <div
        className={clsx("input-switch", { "input-switch--small": small }, { "input-switch--hide-labels": hideLabels })}
      >
        <input
          disabled={disabled}
          type="checkbox"
          id={name}
          name={name}
          className="input-switch__checkbox"
          checked={checked}
          onChange={toggleOnClick}
        />
        {name && (
          <label
            htmlFor={name}
            className="input-switch__label"
            tabIndex={0}
            onKeyDown={toggleOnSpace}
            role="switch"
            aria-checked={checked}
            aria-label={name}
          >
            <span
              aria-hidden="true"
              className="input-switch__wrapper"
              data-true={checkedLabel}
              data-false={uncheckedLabel}
              tabIndex={-1}
            />
            <span aria-hidden="true" className="input-switch__button" tabIndex={-1} />
          </label>
        )}
      </div>
      {description?.length > 0 && <span className="input-switch__description">{description}</span>}
    </div>
  );
};
