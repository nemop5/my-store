import { NextFunction, Request, Response, Router } from "express";

import { HttpStatusCode } from "../../web/http";
import {
  requireParamTypeToBeNumber,
} from "../../web/request";
import { asyncErrorHandler } from "../../web/response";
import { cartService } from "./cart.service";

export function cartRouterFactory() {
  const cartRouter = Router({ mergeParams: true });

  cartRouter.get(
    "/",
    asyncErrorHandler(async (request: Request, response: Response, next: NextFunction) => {
      const allCarts = await cartService.getAll();

      return response.status(HttpStatusCode.Ok200).json(allCarts);
    })
  );

  cartRouter.get(
    "/:id",
    requireParamTypeToBeNumber((params) => params.id),
    asyncErrorHandler(async (request: Request, response: Response, next: NextFunction) => {
      const id = request.params.id;
      const cart = await cartService.getById(id);

      return response.status(HttpStatusCode.Ok200).json(cart);
    })
  );

  return cartRouter;
}
