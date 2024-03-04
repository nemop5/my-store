import { useCallback, useState, useEffect } from "react";
import clsx from "clsx";
import { DateInput, TextInput, Dropdown } from "shared";
import { INPUT_FIELD_MAX_LENGTH } from "environment";
import "./simple-inventory-item-template.scss";
import { PRICE_FIELD_MAX_LENGTH } from "environment";
import { useInventoryContext, ItemSmallInventoryLabel } from "domain/Product";
import { usePaginatedData } from "shared/hooks/usePaginatedData";
import { Tabs } from "shared";
import { common } from "shared/constants/constants";
import moment from "moment";

export const SimpleInventoryItemTemplate = ({
  values,
  setValues,
  isFieldDirty,
  handleBlur,
  touched,
  isDropdownDirty,
  showInventoryType,
  isPrimaryInventory,
  onInputChange,
  onDropdownChange,
  isItemUpdate,
  setIsFieldChanged,
}) => {
  const { getWorkspaceLocations } = useInventoryContext();
  const [locations, setLocations] = useState([]);
  const { resetPage, limit, currentPage, nextPage } = usePaginatedData();
  const [searchTerm, setSearchTerm] = useState("");

  const onPriceChange = useCallback(
    (event) => {
      const { value } = event.target;
      if (value.length > PRICE_FIELD_MAX_LENGTH) return;
      setValues((oldState) => ({
        ...oldState,
        amortizationType: {},
        purchasePrice: value,
        totalPrice: value,
      }));
      setIsFieldChanged(true);
    },
    [setValues, setIsFieldChanged]
  );

  const onDateChange = useCallback(
    (purchaseDate) => {
      setValues((oldState) => ({ ...oldState, invoice: { ...oldState.invoice, purchaseDate } }));
      setIsFieldChanged(true);
    },
    [setValues, setIsFieldChanged]
  );

  const onCheckboxChange = useCallback(
    (event) => {
      const { checked } = event.target;
      setValues((oldData) => ({ ...oldData, isActive: checked }));
      setIsFieldChanged(true);
    },
    [setValues, setIsFieldChanged]
  );

  const onInvoiceChange = useCallback(
    (event) => {
      const { value, name } = event.target;
      setValues((oldData) => ({ ...oldData, invoice: { ...oldData.invoice, [name]: value } }));
      setIsFieldChanged(true);
    },
    [setValues, setIsFieldChanged]
  );

  const onSupplierChange = useCallback(
    (event) => {
      const { value, name } = event.target;
      setValues((oldData) => ({ ...oldData, supplier: { [name]: value } }));
      setIsFieldChanged(true);
    },
    [setValues, setIsFieldChanged]
  );

  const getNavigatorIdExample = useCallback(() => {
    const prefix = isPrimaryInventory ? "OS" : "SI";
    return `${prefix}::PC-ALPHA-16`;
  }, [isPrimaryInventory]);

  useEffect(() => {
    getWorkspaceLocations({ page: currentPage, limit }).then((data) => setLocations(data));
  }, [
    getWorkspaceLocations,
    currentPage,
    limit,
  ]);

  const handleScroll = () => {
    getWorkspaceLocations({ search: searchTerm, page: currentPage + 1, limit }).then((data) =>
      setLocations((prevData) => [...prevData, ...data])
    );
    nextPage();
  };

  useEffect(() => {
    getWorkspaceLocations({ search: searchTerm, page: currentPage, limit }).then((data) => {
      setLocations(data);
    });
  }, [searchTerm, getWorkspaceLocations, currentPage, limit]);

  const handleLocationSearch = (event) => {
    resetPage();
    setSearchTerm(event);
  };

  return (
    <>
      <TextInput
        onChange={onInputChange}
        name="label"
        label="Naziv predmeta"
        inputError={isFieldDirty("label")}
        value={values.label}
        maxLength={INPUT_FIELD_MAX_LENGTH}
        onBlur={handleBlur}
        required
      />

      <TextInput
        type="number"
        onChange={onPriceChange}
        name="purchasePrice"
        label="Nabavna cena"
        inputError={isFieldDirty("purchasePrice")}
        maxLength={PRICE_FIELD_MAX_LENGTH}
        value={values.purchasePrice}
        onBlur={handleBlur}
        required
        step=".01"
      />

      {isPrimaryInventory && !isItemUpdate ? (
        <>
          <TextInput type="checkbox" onChange={onCheckboxChange} label="Aktiviraj predmet?" value={values} />
        </>
      ) : null}

      <TextInput
        type="text"
        onChange={onInputChange}
        name="serialNumber"
        label="Serijski broj"
        inputError={isFieldDirty("serialNumber")}
        value={values.serialNumber || ""}
        maxLength={INPUT_FIELD_MAX_LENGTH}
        onBlur={handleBlur}
        required={values.category.isSerialNumberRequired}
      />

      <TextInput
        type="text"
        onChange={onInputChange}
        name="navigatorId"
        label="Navigator ID"
        inputError={isFieldDirty("navigatorId")}
        value={values.navigatorId}
        maxLength={INPUT_FIELD_MAX_LENGTH}
        onBlur={handleBlur}
        hint={`Primer ID-a ako je prazno polje: ${getNavigatorIdExample()}`}
      />
      <div className={clsx("item-attributes__is-small-inventory", { show: showInventoryType })}>
        <ItemSmallInventoryLabel isChecked={values.isSmallInventory} />
      </div>

      <TextInput onChange={onInputChange} value={values.assignedTo} label="Dodeljeno kolegi" name="assignedTo" />
      <div className="dropdown-form__wrapper">
        <label>Lokacija</label>
        <Dropdown
          choices={locations}
          onChange={onDropdownChange("location")}
          allSelectedLabel="Odaberite lokaciju"
          defaultValue={[values.location]}
          handleBlur={handleBlur}
          touched={touched}
          dropdownError={isDropdownDirty()}
          name={"location"}
          searchId="searchLocation"
          onScroll={handleScroll}
          paginationConfig
          onSearchChange={handleLocationSearch}
        />
      </div>
      {!isItemUpdate && (
        <TextInput
          type="number"
          onChange={onInputChange}
          value={values.count}
          label="Broj komada"
          name="count"
          inputError={isFieldDirty("count")}
        />
      )}
    </>
  );
};
