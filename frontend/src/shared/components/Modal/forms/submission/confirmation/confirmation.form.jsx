import React from "react";

import "./confirmation.form.scss";
// TODO: Refactor to only contain ConfirmationForm with dynamic title
export const ConfirmationForm = ({ title, onSubmit, onClose }) => {
  return (
    <form className="confirm-ownership__form">
      <p className="confirm-ownership__text">{title}</p>
      <div className="confirm-ownership__btn-wrap">
        <button type="submit" className="btn" onClick={onSubmit}>
          da
        </button>
        <button type="cancel" className="btn" onClick={onClose}>
          ne
        </button>
      </div>
    </form>
  );
};
