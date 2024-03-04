import clsx from "clsx";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./date-input.scss";

export const DateInput = ({ onChange, value, dateError, selected }) => {
  const preventTypingHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="date-input">
      <DatePicker
        onChange={onChange}
        value={value && new Date()}
        className={clsx({ "text-input__error": dateError })}
        selected={selected}
        onKeyDown={preventTypingHandler}
      />
      {dateError && <span className="date-picker__error">{dateError}</span>}
    </div>
  );
};
