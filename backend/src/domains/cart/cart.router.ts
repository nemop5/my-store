import { NextFunction, Request, Response, Router } from "express";

import { HttpStatusCode } from "../../web/http";
import {
  requireBodySchema,
  requireParamTypeToBeNumber,
} from "../../web/request";
import { asyncErrorHandler } from "../../web/response";
import { cartService } from "./cart.service";
import { Cart } from "./cart.model";
import { transaction } from "../../database";

const cartPostSchema = {
  type: "object",
  properties: {
    userId: { type: "number", minLength: 1 },
    products: { type: "array" },
  },
  required: ["userId", "products"],
};

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

  cartRouter.post(
    "/",
    requireBodySchema(cartPostSchema),
    asyncErrorHandler(async (request: Request, response: Response, next: NextFunction) => {
      const cart: Cart = request.body;
      let newCart;
      await transaction(async (trx) => {
        newCart = await cartService.createNew(cart, trx)
      });

      return response.status(HttpStatusCode.Ok200).json(newCart);
    })
  );

  cartRouter.delete(
    "/:id",
    requireParamTypeToBeNumber((params) => params.id),
    asyncErrorHandler(async (request: Request, response: Response, next: NextFunction) => {
      const id = request.params.id;
      await transaction(async (trx) => {
        const cart = await cartService.getById(id);
        await cartService.deleteCart(cart, trx)
      });

      return response.sendStatus(HttpStatusCode.NoContent204);
    })
  );

  return cartRouter;
}
