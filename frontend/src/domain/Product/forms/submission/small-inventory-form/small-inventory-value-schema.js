import * as yup from "yup";
import { DECIMAL_NUMBERS } from "environment";

const updateSmallInventoryValue = {
  value: yup
    .number()
    .positive("Polje mora biti pozitivan broj")
    .required("Obavezno Polje")
    .test("is-decimal", "Dozvoljeno je maksimalno 8 cifara i 2 decimale (npr: 99099090,99)", (val) => {
      if (!val) return;
      return DECIMAL_NUMBERS.test(val);
    })
    .typeError("polje mora biti broj"),
};

export const formSchema = yup.object().shape({ ...updateSmallInventoryValue });
