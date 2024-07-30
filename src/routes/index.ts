import { Application, NextFunction, Request, Response } from "express";

import { NotFoundError } from "../errors";
import globalErrorHandler from "../middlewares/global-error-handler";
import apiRoutes from "./api-routes";

/**
 * Config and add all the routes
 * @param app Application instance of express
 * @returns undefined
 */
const configRoutes = (app: Application): void => {
  // api health endpoint
  app.get("/api/v1/health", (_req: Request, res: Response) => {
    return res.status(200).send("OK");
  });

  // adding api endpoints
  apiRoutes.forEach(({ path, router }) => {
    app.use(`/api/v1/${path}`, router);
  });

  // not implemented endpoints
  app.use("*", (_req: Request, _res: Response, next: NextFunction) => {
    return next(new NotFoundError("Route does not exist"));
  });

  // Set route not found and global error handler
  app.use(globalErrorHandler);
};

export default configRoutes;
