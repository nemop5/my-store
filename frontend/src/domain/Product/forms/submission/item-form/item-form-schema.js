import * as yup from "yup";
import { INPUT_FIELD_MAX_LENGTH, DECIMAL_NUMBERS } from "environment";

const simpleInventoryFields = {
  label: yup
    .string()
    .max(INPUT_FIELD_MAX_LENGTH, `Polje može sadržati najviše ${INPUT_FIELD_MAX_LENGTH} karaktera`)
    .required("Obavezno Polje"),
  purchasePrice: yup
    .number()
    .positive("Polje mora biti pozitivan broj")
    .required("Obavezno Polje")
    .test("is-decimal", "Dozvoljeno je maksimalno 8 cifara i 2 decimale (npr: 99099090,99)", (val) => {
      if (!val) return;
      return DECIMAL_NUMBERS.test(val);
    })
    .typeError("polje mora biti broj"),
  serialNumber: yup
    .string()
    .max(INPUT_FIELD_MAX_LENGTH, `Polje može sadržati najivše ${INPUT_FIELD_MAX_LENGTH} karaktera`)
    .test("isRequired", "Obavezno Polje", (value, context) => {
      const { category } = context.parent;
      if (category.isSerialNumberRequired) return !!value;
      return true;
    })
    .nullable(),
  assignedTo: yup.string(),
  company: yup.object({
    name: yup.string().required("Obavezno Polje"),
  }),
  category: yup.object({
    name: yup.string().required("Obavezno Polje"),
  }),
  count: yup
    .number()
    .integer("Polje mora biti ceo broj")
    .min(1)
    .positive("Polje mora biti pozitivan broj")
    .typeError("Polje mora biti broj"),
};

export const formSchema = yup.object().shape({ ...simpleInventoryFields });

export const formSchemaWithAmortizationType = yup.object().shape({ ...simpleInventoryFields });

export const workStationFormSchema = yup.object().shape({
  label: yup
    .string()
    .max(INPUT_FIELD_MAX_LENGTH, `Polje može sadržati najivše ${INPUT_FIELD_MAX_LENGTH} karaktera`)
    .required("Obavezno Polje"),
  assignedTo: yup.string(),
  company: yup.object({
    name: yup.string().required("Obavezno Polje"),
  }),
  category: yup.object({
    name: yup.string().required("Obavezno Polje"),
  }),
  count: yup
    .number()
    .integer("Polje mora biti ceo broj")
    .min(1)
    .positive("Polje mora biti pozitivan broj")
    .typeError("Polje mora biti broj"),
});
