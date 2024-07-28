import express, { Express } from "express";
import configMiddlewares from "./middlewares";
import configRoutes from "./routes";

/**
 * Create a new express application.
 * @returns application instance
 */
const createAppFactory = (): Express => {
  const app: Express = express();

  // add middlewares
  configMiddlewares(app);

  // configure routes
  configRoutes(app);

  return app;
};

export default createAppFactory;
