import { Router } from "express";
import { productRouterFactory } from "../domains/product";
import { cartRouterFactory } from "../domains/cart";

export function registerRoutes(): Router {
  const router: Router = Router();

  router.use("/products", productRouterFactory());
  router.use("/carts", cartRouterFactory());

  return router;
}
