import React from "react";

import "./toast-message.scss";
export const ToastMessage = ({ message, icon }) => {
  return (
    <div className="toast">
      <div className="toast-icon">{icon}</div>
      <div className="toast-message">{message}</div>
    </div>
  );
};
