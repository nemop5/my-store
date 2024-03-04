import "./_small-inventory-form.scss";
import DatePicker from "react-datepicker";
import { useCallback, useMemo } from "react";
import { PreviewChangesSmallInventoryValue } from "domain/SmallInventoryValue";
import { Button, TextInput } from "shared";
import { common } from "shared/constants/constants";
import { PRICE_FIELD_MAX_LENGTH } from "environment";
import { useFormik } from "formik";
import { formSchema } from "./small-inventory-value-schema";

export const SmallInventoryForm = ({
  title,
  onSubmit,
  isBtnLoading,
  inventoryInfo,
  setInventoryInfo,
  minDate,
  maxDate,
  ...props
}) => {
  const { setValues, values, errors, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      value: props.createNewValue ? inventoryInfo.value : props.initPrice,
      effectiveDate: inventoryInfo.effectiveDate ? inventoryInfo.effectiveDate : new Date(),
    },
    validationSchema: formSchema,
    onSubmit: () => submit(),
  });

  const isButtonDisabled = useMemo(() => {
    return !inventoryInfo.effectiveDate || isNaN(values.value) || errors.value;
  }, [inventoryInfo.effectiveDate, values.value, errors.value]);

  const onValueChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      if (value.length > PRICE_FIELD_MAX_LENGTH) return;
      setValues((oldData) => ({ ...oldData, [name]: value }));
    },
    [setValues]
  );

  const convertStateForSubmission = useMemo(() => {
    if (isNaN(parseInt(values.value))) return;
    if (props.createNewValue) {
      return {
        value: parseInt(values.value),
        effectiveDate: values.effectiveDate,
      };
    }
    return {
      id: inventoryInfo.id.toString(),
      value: parseInt(values.value),
      effectiveDate: values.effectiveDate,
    };
  }, [inventoryInfo, values, props.createNewValue]);

  const submit = useCallback(() => {
    if (!inventoryInfo.effectiveDate || isNaN(values.value)) return;
    onSubmit(convertStateForSubmission);
  }, [onSubmit, inventoryInfo, values.value, convertStateForSubmission]);

  return (
    <div className="small-inventory-value">
      <h2 className="small-inventory-value__heading">{title}</h2>
      <TextInput
        label="Vrednost"
        min={0}
        type="number"
        onChange={onValueChange}
        value={values.value}
        className="small-inventory-value__input-field"
        name="value"
        inputError={errors["value"]}
        maxLength={PRICE_FIELD_MAX_LENGTH}
      />
      <label className="small-inventory-value__label">Datum primene ove vrednosti</label>
      <DatePicker
        dateFormat={common.PREFERRED_DATE_FORMAT}
        className="small-inventory-value__input-field update-small-inventory-value__date-field"
        selected={values.effectiveDate}
        onChange={(date) => setFieldValue("effectiveDate", date)}
        defaultValue={new Date()}
        minDate={minDate}
        maxDate={maxDate}
      />
      <PreviewChangesSmallInventoryValue smallInventoryValue={convertStateForSubmission} />
      <Button
        buttonText={"Sačuvaj"}
        buttonColor={"blue"}
        event={handleSubmit}
        spinnerColor={"light"}
        isLoading={isBtnLoading}
        isDisabled={isButtonDisabled}
      />
    </div>
  );
};
