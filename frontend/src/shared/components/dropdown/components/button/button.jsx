import { PointerDownIcon } from "assets";
import clsx from "clsx";
import React from "react";
import "./button.scss";

export const ToggleDropdown = ({ error, handleClick, onBlur, name, label, disabled = false }) => {
  return (
    <button
      type="button"
      className={clsx("dropdown__button", { dropdown__error: error })}
      onClick={handleClick}
      onBlur={onBlur}
      name={name}
      disabled={disabled}
    >
      {label}
      <PointerDownIcon className="dropdown__icon" />
    </button>
  );
};
