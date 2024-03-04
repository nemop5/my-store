import React from "react";
import "./spinner.scss";

export const Spinner = ({ text, borderColor = "dark", size = "small" }) => {
  return (
    <div className="spinner">
      <h2 className="spinner__title">{text}</h2>
      <span className={`spinner__arc spinner__arc--${size} spinner__arc--${borderColor}`}></span>
    </div>
  );
};
