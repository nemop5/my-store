import React from "react";
import { Spinner } from "../spinner/spinner";
import "./button.scss";

export const Button = ({
  buttonText,
  buttonColor = "",
  event,
  buttonPrefixIcon,
  buttonIcon,
  spinnerColor,
  isDisabled = false,
  isLoading = false,
  altText = "",
  type = "button",
}) => {
  return (
    <button
      className={`btn${buttonColor && " btn--" + buttonColor}`}
      onClick={event}
      disabled={isLoading || isDisabled}
      title={altText ? altText : buttonText}
      type={type}
    >
      {buttonPrefixIcon && !buttonIcon && <span className="btn__icon-prefix">{buttonPrefixIcon}</span>}
      {isLoading && <Spinner borderColor={spinnerColor} />}
      {buttonText && <span className="btn__text">{buttonText}</span>}
      {!buttonPrefixIcon && buttonIcon && <span className="btn__icon-suffix">{buttonIcon}</span>}
    </button>
  );
};

export default Button;
