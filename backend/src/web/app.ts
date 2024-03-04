import express, { Express, NextFunction, Request, Response } from "express";

import { errorHandler } from "./response";
import { registerRoutes } from "./routes.register";

export function appFactory(): Express {
  const app: Express = express();

  app.use("/api", registerRoutes());
  app.use(express.static(__dirname + "/public"));

  app.use(fallbackRoute);
  app.use(errorHandler);

  return app;
}

function fallbackRoute(request: Request, response: Response, next: NextFunction) {
  if (request.url.startsWith("/api") || request.method !== "GET") return next();
  return response.sendFile(__dirname + "/public/index.html");
}
