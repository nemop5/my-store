import React from "react";
import clsx from "clsx";

import "./item-small-inventory-label.scss";
import { common } from "shared/constants/constants";

export const ItemSmallInventoryLabel = ({ isChecked, isAcronym = false }) => {
  const fullText = isChecked ? common.SITAN_INVENTAR : common.OSNOVNO_SREDSTVO;
  return (
    <span className={clsx("item-small-inventory-label ", { positive: isChecked })} title={fullText}>
      {isAcronym ? (isChecked ? "SI" : "OS") : fullText}
    </span>
  );
};
