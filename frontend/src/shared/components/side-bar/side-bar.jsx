import React from "react";
import clsx from "clsx";

import "./side-bar.scss";
export const SideBar = ({ children, isOpen, floatRight, sideBarToggle }) => {
  return (
    <aside
      className={clsx("sidebar", { sidebar__toggle: sideBarToggle }, { right: floatRight }, { opened: isOpen })}
    >
      {children}
    </aside>
  );
};

export default SideBar;
