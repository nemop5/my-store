import React from "react";
import { NavLink } from "react-router-dom";
import { INDEX, CART_DETAILS } from "router/router.config";
import { HomeIcon, SettingsIcon } from "assets";
import clsx from "clsx";

import "./user-navigation.scss";

const protectedItems = [
  {
    label: "Home",
    icon: HomeIcon,
    link: INDEX,
  },
  {
    label: "Detalji korpe",
    icon: SettingsIcon,
    link: CART_DETAILS,
  },
];

export const UserNavigation = () => {
  return (
    <div className="user__navigation" onClick={(e) => e.stopPropagation()}>
      <ul className="user__link-list">
        {protectedItems.map((item) => (
          <li className="user__list-item">
            <NavLink to={item.link} className={({ isActive }) => clsx("user__link", { active: isActive })}>
              <item.icon className="user__icon" />
              <span className="user__label">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
