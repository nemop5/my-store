import { HttpStatusCode } from "./http.status-codes";

export class Exception extends Error {
  constructor(
    public status: number = HttpStatusCode.InternalServerError500,
    public message: string,
    public errors?: any[]
  ) {
    super(message);
  }
}

export class BadRequestException extends Exception {
  constructor(message?: string, errors?: any[]) {
    super(HttpStatusCode.BadRequest400, message || "Bad Request", errors);
  }
}

export class UnauthorizedRequestException extends Exception {
  constructor(message?: string, errors?: any[]) {
    super(HttpStatusCode.Unauthorized401, message || "Unauthorized Request", errors);
  }
}

export class ForbiddenRequestException extends Exception {
  constructor(message?: string, errors?: any[]) {
    super(HttpStatusCode.Forbidden403, message || "Forbidden Request", errors);
  }
}
