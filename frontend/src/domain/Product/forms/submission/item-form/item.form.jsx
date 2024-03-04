import React, { useState, useMemo, useCallback, useEffect } from "react";
import clsx from "clsx";
import "./item.form.scss";
import { ApiErrorMessage, Button, useDebounce } from "shared";
import { useInventoryContext } from "domain/Product";
import { useFormik, validateYupSchema, yupToFormErrors } from "formik";
import { formSchema, workStationFormSchema, formSchemaWithAmortizationType } from "./item-form-schema";
import { SimpleInventoryItemTemplate } from "../../templates/simple-inventory-item-template/simple-inventory-item-template";
import { workStationShortName } from "../../../constants";
import { useFiltersContext } from "domain/Filters";

export const ItemForm = ({ onSubmit, onCancel, isBtnLoading, errorMessage, item = undefined }) => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isFieldChanged, setIsFieldChanged] = useState(false);
  const { clearFilters } = useFiltersContext();
  const { getIsItemSmallInventory } = useInventoryContext();
  const { debounce } = useDebounce();

  const isItemUpdate = useMemo(() => item !== undefined, [item]);

  const newItemInitValues = useMemo(
    () => ({
      label: "",
      purchasePrice: "0.00",
      serialNumber: "",
      invoice: null,
      supplier: null,
      company: {},
      owner: {},
      category: {},
      amortizationType: {},
      assignedTo: undefined,
      count: "1",
      isActive: null,
    }),
    []
  );

  const updateItemInitValues = {
    ...item,
  };

  const { setValues, errors, values, setErrors, touched, handleBlur } = useFormik({
    initialValues: isItemUpdate ? updateItemInitValues : newItemInitValues,
  });

  const isPrimaryInventory = !values.isSmallInventory;

  const isCategoryWorkStation = useMemo(() => values?.category?.shortname === workStationShortName, [values]);

  const initValidationSchema = useMemo(() => {
    if (isCategoryWorkStation) return workStationFormSchema;
    return isPrimaryInventory ? formSchemaWithAmortizationType : formSchema;
  }, [isCategoryWorkStation, isPrimaryInventory]);

  useEffect(() => {
    const setIsSmallInventory = async () => {
      const isSmallInventory = await getIsItemSmallInventory({
        inventoryId: item?.id,
        purchasePrice: values.purchasePrice,
        purchaseDate: values.invoice?.purchaseDate,
      });

      setValues((oldData) => ({ ...oldData, isSmallInventory }));
    };
    if (values.purchasePrice) {
      debounce(setIsSmallInventory);
    }
  }, [getIsItemSmallInventory, item?.id, setValues, values.invoice?.purchaseDate, values.purchasePrice, debounce]);

  useEffect(() => {
    const checkIsFormValid = async () => {
      try {
        await validateYupSchema(values, initValidationSchema, false);
        setIsFormValid(true);
      } catch (errors) {
        setIsFormValid(false);
        setErrors(yupToFormErrors(errors));
      }
    };

    checkIsFormValid();
  }, [values, initValidationSchema, errors, setErrors]);

  const onInputChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      setValues((oldData) => ({ ...oldData, [name]: value }));
      setIsFieldChanged(true);
    },
    [setValues]
  );

  const onDropdownChange = useCallback(
    (field) => (values) => {
      const category = values[0];
      if (field === "category" && category.shortname === workStationShortName) {
        setValues({ ...newItemInitValues, [field]: category });
      } else {
        setValues((oldData) => ({ ...oldData, [field]: category }));
      }
      setIsFieldChanged(true);
    },
    [setValues, newItemInitValues]
  );

  const formSubmitHandler = useCallback(
    async (e) => {
      e.preventDefault();
      setIsButtonClicked(true);
      if (isFormValid) {
        const { count, ...rest } = values;
        onSubmit(rest, count);
        clearFilters();
      }
    },
    [clearFilters, isFormValid, onSubmit, values]
  );

  const CancelButton = useCallback(() => <Button buttonText={"Otkaži"} event={onCancel} />, [onCancel]);

  const ConfirmButton = useCallback(
    () => (
      <Button
        type="submit"
        isDisabled={!isFieldChanged}
        buttonText={`${isItemUpdate ? "Izmeni" : "Kreiraj"} inventar`}
        buttonColor={"green"}
        event={formSubmitHandler}
        spinnerColor={"light"}
        isLoading={isBtnLoading}
      />
    ),
    [formSubmitHandler, isBtnLoading, isFieldChanged, isItemUpdate]
  );

  const isFieldDirty = useCallback(
    (field) => {
      const fieldErrorMessage = errors[field];
      if (isButtonClicked && fieldErrorMessage) {
        return fieldErrorMessage;
      }
    },
    [isButtonClicked, errors]
  );

  const isDropdownDirty = useCallback(
    (field) => {
      const fieldErrorMessage = errors[field]?.name;
      if (isButtonClicked && fieldErrorMessage) {
        return fieldErrorMessage;
      }
    },
    [isButtonClicked, errors]
  );

  const inventoryPrice = values.category?.shortname === workStationShortName ? values.totalPrice : values.purchasePrice;

  const showInventoryType = Number(inventoryPrice) > 0;

  return (
    <form>
      <div>
        <h2 className="create-new-item__title">{isItemUpdate ? "Izmena" : "Kreiranje novog"} inventara</h2>
        <div className={clsx("create-new-item__section", { valid: isFormValid })}>
          <div onClick={(event) => event.stopPropagation()}>
            <SimpleInventoryItemTemplate
              values={values}
              setValues={setValues}
              isFieldDirty={isFieldDirty}
              handleBlur={handleBlur}
              touched={touched}
              isDropdownDirty={isDropdownDirty}
              showInventoryType={showInventoryType}
              isPrimaryInventory={isPrimaryInventory}
              onInputChange={onInputChange}
              onDropdownChange={onDropdownChange}
              isItemUpdate={isItemUpdate}
              setIsFieldChanged={setIsFieldChanged}
            />
          </div>
        </div>
      </div>
      <ApiErrorMessage errorMessage={errorMessage} />
      <div className="create-new-item__controls">
        <CancelButton />
        <ConfirmButton />
      </div>
    </form>
  );
};
