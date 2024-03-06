import { Request, Response, NextFunction } from "express";
import { BadRequestException } from "../../http/http.exceptions";
import { getValidationErrors } from "./schema.validation";

export const requireBodySchema = (schema: any) => async (request: Request, response: Response, next: NextFunction) => {
  if (request.method === "OPTIONS") return next();

  const { body } = request;
  const errors = getValidationErrors(body, schema);

  if (errors) return next(new BadRequestException("Validation failed", errors));

  return next();
};
