import Ajv from "ajv";
const ajv = new Ajv({ allErrors: true });

interface AjvError {
  property: string;
  message: string;
}

export function getValidationErrors(data: any, schema: any): AjvError[] | undefined {
  const isDataValid = ajv.compile(schema);
  const isValid = isDataValid(data);

  if (isValid) return;

  return isDataValid.errors!.map((error: any) => ({
    property: error.instancePath.substring(1),
    message: error.message,
  }));
}
