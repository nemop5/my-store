import { PointerUpIcon } from "assets";
import React from "react";
import "./items.scss";
import moment from "moment";
import { common } from "shared/constants/constants";

export const DropdownItems = ({ items, handleClick, isMultipleChoice, isChecked }) => {
  const getInvoiceDetails = (item) =>
    `${item?.number} - ${moment(item?.purchaseDate).format(common.PREFERRED_FE_DATE_FORMAT)} ${
      item?.supplier?.name ? " - " + item.supplier.name : ""
    }`;

  const isEmployee = (item) => {
    return item.email;
  };

  return items.map((item, key) => (
    <li className="dropdown__list-item" key={key}>
      <button className="dropdown__choice" onClick={handleClick(item)}>
        {isMultipleChoice && (
          <div className="dropdown__checkbox">
            {isChecked(item) && <PointerUpIcon className="dropdown__check-icon" />}
          </div>
        )}
        {item.purchaseDate && item.number
          ? getInvoiceDetails(item)
          : item.name
          ? item.name
          : item.fullAddress + " / " + item.floor}
        {isEmployee(item) ? " / " + item.email : ""}
      </button>
    </li>
  ));
};
