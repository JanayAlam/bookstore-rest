import dayjs from "dayjs";
import { Application, Request, Response, Router } from "express";

import { constant } from "../constants";
import globalErrorHandler from "../middlewares/global-error-handler";
import { IErrorResponse } from "../types/error-types";

import authorRouter from "../api/v1/author";

const apiRoutes: { path: string; router: Router }[] = [
  {
    path: "authors",
    router: authorRouter,
  },
];

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
  app.use("*", (_req: Request, res: Response): Response<IErrorResponse> => {
    return res.status(404).json({
      timestamp: dayjs(new Date()).format(constant.DATE_TIME_FORMAT_STRING),
      error: "Not Found",
      code: 404,
      message: "Route does not exist",
    });
  });

  // Set route not found and global error handler
  app.use(globalErrorHandler);
};

export default configRoutes;
