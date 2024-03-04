import { Request, Response, NextFunction } from "express";

import { BadRequestException, UnauthorizedRequestException, ForbiddenRequestException } from "../../http";

export const requireParamTypeToBeNumber = (toParam: (params: any) => string) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const param = toParam(request.params);

    if (isNaN(+param)) return next(new BadRequestException("Expected parameter value type is number."));
    return next();
  };
};

export const requireQueryParamToBeTrue = (toParam: (params: any) => string) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const param = toParam(request.query);
    if (param && param.toLowerCase() !== "true")
      return next(new BadRequestException("Expected parameter value is true."));
    return next();
  };
};

/** Requires another middleware. @see auth.middleware for more info. */
export const requireRoles = (...allowedRoles: string[]) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const user = response.locals.user;
    if (!user) return next(new UnauthorizedRequestException("Unauthorized access"));

    const validRoles = allowedRoles.some((role) => user?.role === role);
    if (!validRoles)
      return next(
        new ForbiddenRequestException(
          `Pristup ovom sadržaju za korisnika: ${user.googleUser.email} nije dozvoljen.\nMolimo vas da kontaktirate korisničku podršku zahtevi.inventar@vegait.rs kako bi vam pristup bio omogućen.`
        )
      );
    return next();
  };
};
