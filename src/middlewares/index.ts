import bodyParser from "body-parser";
import express, { Application, json } from "express";
import morgan from "morgan";

import path from "path";
import { config } from "../constants";
import { logger } from "../utils";

/**
 * config and add all the middlewares
 * @param app application instance of express
 * @returns undefined
 */
const configMiddlewares = (app: Application): void => {
  app.use(json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(express.static("public"));

  app.set("view engine", "ejs");

  // set the views directory
  app.set("views", path.join(__dirname, "../views"));

  // configure morgan
  app.use(
    morgan(config.environment === "production" ? "combined" : "tiny", {
      stream: {
        write: (message: string) => {
          logger.info(message);
        },
      },
    }),
  );
};

export default configMiddlewares;
