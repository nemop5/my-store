import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import clsx from "clsx";

import "./nav-button.scss";

export const NavButton = () => {
  const [isNavMenuClicked, setIsNavMenuClicked] = useOutletContext();

  const toggleMenu = () => setIsNavMenuClicked(!isNavMenuClicked);

  useEffect(() => {
    const handleResize = () => setIsNavMenuClicked(false);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsNavMenuClicked]);

  return (
    <button
      className={clsx("nav-button", { "nav-button--active": isNavMenuClicked })}
      type="button"
      aria-label="Menu"
      aria-controls="navigation"
      aria-expanded={isNavMenuClicked}
      onClick={toggleMenu}
    >
      <span className="nav-button__box">
        <span className="nav-button__inner"></span>
      </span>
    </button>
  );
};

export default NavButton;
