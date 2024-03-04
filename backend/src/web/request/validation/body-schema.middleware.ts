import { Request, Response, NextFunction } from "express";
import { BadRequestException } from "../../http/http.exceptions";
import { getValidationErrors } from "./schema.validation";

// const inventoryPostSchema = {
//   type: "object",
//   properties: {
//     label: { type: "string", minLength: 1, maxLength: 35 },
//     navigatorId: { type: "string", maxLength: 50 },
//     companyId: { type: "string", minLength: 1, maxLength: 50 },
//     ownerId: { type: "string", minLength: 1, maxLength: 50 },
//     categoryId: { type: "string", minLength: 1, maxLength: 50 },
//     amortizationTypeId: { type: "string", minLength: 1, maxLength: 50 },
//     purchasePrice: { type: "string", minLength: 1, maxLength: 50 },
//     assignedTo: { type: "string", maxLength: 100 },
//     serialNumber: { type: "string", maxLength: 35 },
//     activationDate: { type: ["string", "null"], minLength: 1, maxLength: 100 },
//   },
//   required: ["label", "companyId", "categoryId", "purchasePrice"],
// };

// const workSpaceInventoryPostSchema = {
//   type: "object",
//   properties: {
//     label: { type: "string", minLength: 1, maxLength: 35 },
//     navigatorId: { type: "string", minLength: 1, maxLength: 50 },
//     companyId: { type: "string", minLength: 1, maxLength: 50 },
//     ownerId: { type: "string", minLength: 1, maxLength: 50 },
//     categoryId: { type: "string", minLength: 1, maxLength: 50 },
//     assignedTo: { type: "string", maxLength: 100 },
//   },
//   required: ["label", "companyId"],
// };

// const inventoryArchivedSchema = {
//   type: "object",
//   properties: {
//     id: { type: "integer", minLength: 1 },
//     label: { type: "string", minLength: 1, maxLength: 50 },
//     reason: { type: "string", minLength: 1, maxLength: 30 },
//     content: { type: "object" },
//   },
//   required: ["reason"],
// };

export const requireBodySchema = (schema: any) => async (request: Request, response: Response, next: NextFunction) => {
  if (request.method === "OPTIONS") return next();

  const { body } = request;
  const errors = getValidationErrors(body, schema);

  if (errors) return next(new BadRequestException("Validation failed", errors));

  return next();
};

// const tryValidateSchema = (body: any, schema: any, next: NextFunction) => {
//   const errors = getValidationErrors(body, schema);

//   if (errors) return next(new BadRequestException("Validation failed", errors));
// };
