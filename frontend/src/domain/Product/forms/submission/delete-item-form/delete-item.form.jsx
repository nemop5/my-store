import React, { useState, useEffect } from "react";

import { Dropdown, Button } from "shared";

import { InventoryService } from "domain/Product/services";
import { useInventoryContext } from "domain/Product";

import { ARCHIVED_REASON } from "shared/constants/constants";

import "./delete-item.form.scss";

export const DeleteItemForm = ({ onSubmit, onCancel, inventory, isBtnLoading, handleBlur, touched }) => {
  const { items } = useInventoryContext();
  const [inventories, setInventories] = useState(items);
  const [chosenReason, setChosenReason] = useState();
  const [archivedReasons, setArchivedReasons] = useState();

  useEffect(() => {
    InventoryService.getArchivedReasons().then((reasons) => {
      setArchivedReasons(reasons);
    });
  }, []);

  const onDropdownChange = (value) => {
    const archivedReason = value[0];
    setChosenReason({
      id: archivedReason.id,
      label: archivedReason.name,
      reason: archivedReason.value,
    });
  };

  const onRefInventoryDropdownChange = (inventory) => {
    const { name, value } = inventory[0];
    const itemId = name.split("|")[0].trim();
    setChosenReason({ ...chosenReason, content: { inventory: { id: value, itemId: itemId } } });
  };

  const onConfirm = () => {
    onSubmit(chosenReason);
  };

  const handleInventoriesSearch = (value) => {
    InventoryService.get({ searchTerm: value }).then((data) => {
      setInventories(data);
    });
  };

  const validateInputs = () => {
    if (!chosenReason) {
      return true;
    }
    if (chosenReason.reason === ARCHIVED_REASON.Duplicated) {
      return !chosenReason.content;
    }
    return false;
  };

  const inventoryChoices = () => {
    return inventories.map((item) => {
      return { name: `${item.itemId} | ${item.navigatorId}`, value: item.id };
    });
  };

  const archivedReasonChoices = () => {
    if (!archivedReasons) return [];
    return archivedReasons.map((reason) => {
      return { id: reason.id, name: reason.label, value: reason.reason };
    });
  };

  const handleDeleteReasonContent = () => {
    switch (chosenReason?.reason) {
      case ARCHIVED_REASON.Duplicated:
        return (
          <div className="delete-item__section">
            <label>
              Referenca dupliranog predmeta<span className="text-input__required">*</span>
            </label>
            <Dropdown
              choices={inventoryChoices}
              onChange={onRefInventoryDropdownChange}
              searchId="searchCategory"
              onSearchChange={handleInventoriesSearch}
              allSelectedLabel="Svi inventari"
              dropdownError={!chosenReason.content}
            />
          </div>
        );
      default:
        return <></>;
    }
  };

  return (
    <>
      <div>
        <div className="delete-item">
          <h2 className="delete-item__title">
            <span>Brisanje predmeta</span>
            <br />
            {inventory.label}
          </h2>
          <div>
            <div className="delete-item__section">
              <div>Podaci o predmetu koji će biti obrisan:</div>
              <ul className="delete-item__data">
                <li>Naziv: {inventory.label}</li>
                <li>Evidencioni broj: {inventory.itemId}</li>
                <li>Navigator id: {inventory.navigatorId}</li>
                <li>Kategorija: {inventory.category.name}</li>
              </ul>
            </div>
            <div className="delete-item__section">
              <label>
                Razlog brisanja predmeta<span className="text-input__required">*</span>
              </label>
              <Dropdown
                choices={archivedReasonChoices}
                onChange={onDropdownChange}
                isMultipleChoice={false}
                allSelectedLabel="Odaberite razlog brisanja predmeta"
                touched={touched}
                handleBlur={handleBlur}
                dropdownError={!chosenReason}
              />
            </div>
            {handleDeleteReasonContent()}
          </div>
        </div>
        <div className="delete-item__controls">
          <Button buttonText={"Otkaži"} buttonColor={"gray"} event={onCancel} />
          <Button
            type="submit"
            isDisabled={validateInputs()}
            buttonText={"Obriši"}
            buttonColor={"green"}
            event={onConfirm}
            spinnerColor={"light"}
            isLoading={isBtnLoading}
          />
        </div>
      </div>
    </>
  );
};
