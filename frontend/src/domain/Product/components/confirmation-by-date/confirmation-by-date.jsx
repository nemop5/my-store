import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./confirmation-by-date.scss";

const ConfirmationByDateForm = ({ title, onSubmit, onClose }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleYesButtonClick = () => {
    if (selectedDate) {
      onSubmit(selectedDate);
    }
  };

  return (
    <form className="confirm-ownership-by-date__form">
      <p className="confirm-ownership-by-date__text">{title}</p>
      <div className="confirm-date-picker_datepicker">
        <DatePicker
          placeholderText="Izaberi datum!"
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
        />
      </div>
      <div className="confirm-ownership-by-date__btn-wrap">
        <button type="submit" className="btn" onClick={handleYesButtonClick}>
          DA
        </button>
        <button type="button" className="btn" onClick={onClose}>
          NE
        </button>
      </div>
    </form>
  );
};

export default ConfirmationByDateForm;
