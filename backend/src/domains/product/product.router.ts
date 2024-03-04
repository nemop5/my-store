import { NextFunction, Request, Response, Router } from "express";

import { HttpStatusCode } from "../../web/http";
import {
  requireParamTypeToBeNumber,
} from "../../web/request";
import { asyncErrorHandler } from "../../web/response";
import { productService } from "./product.service";

export function productRouterFactory() {
  const productRouter = Router({ mergeParams: true });

  productRouter.get(
    "/",
    asyncErrorHandler(async (request: Request, response: Response, next: NextFunction) => {
      const {
        searchTerm,
      } = request.query as { [key: string]: string | undefined };

      const allProducts = await productService.getAll({searchTerm});

      return response.status(HttpStatusCode.Ok200).json(allProducts);
    })
  );

  productRouter.get(
    "/:id",
    requireParamTypeToBeNumber((params) => params.id),
    asyncErrorHandler(async (request: Request, response: Response, next: NextFunction) => {
      const id = request.params.id;
      const category = await productService.getById(id);

      return response.status(HttpStatusCode.Ok200).json(category);
    })
  );

  return productRouter;
}
