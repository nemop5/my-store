import { Request, Response, NextFunction, RequestHandler } from "express";
import { HttpStatusCode } from "../http/http.status-codes";
import { BadRequestException, ForbiddenRequestException, UnauthorizedRequestException } from "../http/http.exceptions";
import { EntityAlreadyExists, EntityDoesNotExist } from "./crud.exceptions";

interface ErrorDto {
  message: string;
  error: Error;
}

export async function errorHandler(error: Error, request: Request, response: Response, next: NextFunction) {
  const errorJson: ErrorDto = {
    message: error.message,
    error,
  };

  switch (true) {
    case error instanceof BadRequestException:
      return response.status(HttpStatusCode.BadRequest400).json(errorJson);
    case error instanceof UnauthorizedRequestException:
      return response.status(HttpStatusCode.Unauthorized401).json(errorJson);
    case error instanceof ForbiddenRequestException:
      return response.status(HttpStatusCode.Forbidden403).json(errorJson);
    case error instanceof EntityDoesNotExist:
      return response.status(HttpStatusCode.NotFound404).json(errorJson);
    case error instanceof EntityAlreadyExists:
      return response.status(HttpStatusCode.Conflict409).json(errorJson);
    default:
      return response.status(HttpStatusCode.InternalServerError500).json(error.message);
  }
}

export function asyncErrorHandler(callback: RequestHandler) {
  return async function (request: Request, response: Response, next: NextFunction) {
    return Promise.resolve(callback(request, response, next)).catch(next);
  };
}
