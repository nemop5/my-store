import React from "react";

import "./summary.scss";
export const Summary = ({ title, subtitle }) => {
  return (
    <>
      <div className="summary__title">{title}</div>
      <div className="summary__subtitle">{subtitle}</div>
    </>
  );
};
