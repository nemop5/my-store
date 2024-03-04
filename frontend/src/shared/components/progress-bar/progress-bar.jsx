import React from "react";
import clsx from "clsx";
import "./progress-bar.scss";

export const ProgressBar = ({ progress }) => {
  return (
    <div className="progress-bar">
      <div className="progress" style={{ width: `${progress}%` }}></div>
      <p className={clsx("progress-info", { "white-text": progress > 50 })}>{Math.floor(progress)}%</p>
    </div>
  );
};
