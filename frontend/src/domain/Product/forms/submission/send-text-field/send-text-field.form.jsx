import { XIcon } from "assets";
import React from "react";
import "./send-text-field.scss";
import { Button } from "shared";

export const SendTextField = ({ text, handleChange, handleClose, handleSubmit }) => {
  const handleSend = () => {
    handleSubmit();
  };

  return (
    <>
      <div className="modal__top-line">
        <div className="modal__close-btn">
          <Button buttonIcon={<XIcon className="modal__close-icon" />} event={handleClose} />
        </div>
      </div>
      <form className="send-text">
        <label className="send-text__label" htmlFor="incorrectInfo">
          Molimo Vas da napišete koji podaci nisu tačni.
        </label>
        <textarea className="send-text__text" id="incorrectInfo" value={text} onChange={handleChange} />
        <button onClick={handleSend} className="btn btn--blue">
          Pošalji
        </button>
      </form>
    </>
  );
};
