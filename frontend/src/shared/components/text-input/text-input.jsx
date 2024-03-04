import clsx from "clsx";
import React, { useCallback } from "react";
import { CharLimit } from "shared";

import "./text-input.scss";

export const TextInput = (props) => {
  const { label, maxLength, value = "", inputError, required, disabled = false, hint, ...inputProps } = props;

  const Label = useCallback(() => {
    return label ? (
      <label className="text-input__label">
        {label}
        {required && <span className="text-input__required">*</span>}
      </label>
    ) : null;
  }, [label, required]);

  return (
    <>
      <div
        className={clsx("text-input__wrap", { "text-input__wrap--checkbox": inputProps.type === "checkbox" })}
        onClick={(event) => event.stopPropagation()}
      >
        <Label />
        {hint && <span className="text-input__hint">{hint}</span>}
        <input
          type="text"
          className={clsx("text-input", { "text-input__error": inputError })}
          maxLength={maxLength}
          value={value}
          disabled={disabled}
          {...inputProps}
        />
        {maxLength && <CharLimit charCount={value?.length} maxLength={maxLength} />}
      </div>
      {inputError && <span className="text-input__error-mesage">{inputError}</span>}
    </>
  );
};
