import React from "react";
import { ItemSmallInventoryLabel } from "domain/Product";
import { ItemDisplayValue } from "../item-display-value/item-display-value";
import moment from "moment";
import { Button } from "shared";
import { common } from "shared/constants/constants";
import { workStationShortName } from "../../constants";

import "./item-display-info.scss";

export const ItemDisplayInfo = ({ item, openDeleteModal, isDeleteButtonVisible = false, openActivationModal }) => {
  const isAssigned = item.assignedTo && item.assignedTo !== "empty";
  const showActivationDateSection = !item.isSmallInventory && item.category.shortname !== workStationShortName;
  const isActivationDateAvailable = showActivationDateSection && item?.activationDate;

  const activationDateSection = showActivationDateSection && !item?.activationDate && (
    <Button buttonText={"Aktiviraj predmet"} buttonColor={"blue"} event={openActivationModal} />
  );

  const isWorkStation = () => item.category.shortname === workStationShortName;

  const formatStringToNumber = (number) => {
    return parseFloat(number).toFixed(2);
  };
  const totalWorkStationPrice = (parts) => {
    let totalPrice = 0;
    parts.forEach((part) => (totalPrice += +part.totalPrice));
    return formatStringToNumber(totalPrice);
  };

  return (
    <>
      <ItemDisplayValue label="Naziv predmeta" value={item.label} />
      {isWorkStation() && (
        <>
          <ItemDisplayValue label="Ukupna cena konfiguracije" value={totalWorkStationPrice(item.parts)} />
          {item.currentPrice > 0 && (
            <ItemDisplayValue label="Trenutna cena" value={formatStringToNumber(item.currentPrice)} />
          )}
        </>
      )}
      <>
        {!isWorkStation() && (
          <>
            <ItemDisplayValue label="Nabavna cena" value={item.purchasePrice} />

            {!isNaN(item.currentPrice) && (
              <>
                <ItemDisplayValue label="Trenutna cena" value={formatStringToNumber(item.currentPrice)} />
                <ItemDisplayValue
                  label="Stopa potrošenosti predmeta (%)"
                  value={formatStringToNumber(item.percentageSpent)}
                />
              </>
            )}
          </>
        )}
      </>

      {!isWorkStation() && (
        <>
          <ItemDisplayValue label="Serijski broj" value={item.serialNumber} />
          {isActivationDateAvailable && (
            <ItemDisplayValue
              label="Datum aktivacije"
              value={moment(item.activationDate).format(common.PREFERRED_FE_DATE_FORMAT)}
            />
          )}
        </>
      )}
      <div className="item-info-holder">
        <ItemSmallInventoryLabel isChecked={item.isSmallInventory} />
        {activationDateSection}
      </div>
      <hr />
      <ItemDisplayValue label="Dodeljeno kolegi" value={isAssigned ? item.assignedTo : "Nije dodeljeno"} />
      <hr />
      <ItemDisplayValue label="Kategorija" value={item.category.name} />
      <ItemDisplayValue label="Vlasnik" value={item?.owner?.name} />
      <ItemDisplayValue label="Korisnik" value={item?.company?.name} />
      {isDeleteButtonVisible && (
        <Button buttonText={"Obriši deo predmeta"} buttonColor={"red"} event={openDeleteModal} />
      )}
    </>
  );
};
