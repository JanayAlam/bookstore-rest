import dotenv from "dotenv";
dotenv.config();

import { Express } from "express";
import http from "http";

import createAppFactory from "./app";
import { config } from "./constants";
import checkDatabaseConnection from "./database/check-database-connection";
import { logger } from "./utils";

const main = async (): Promise<void> => {
  // create a express application
  const app: Express = createAppFactory();

  // create a server with the express application
  const server = http.createServer(app);

  try {
    // checking database connection status
    await checkDatabaseConnection();
    logger.info("Database connected");

    // listening the server
    await server.listen(config.port);
    logger.info(`Server running on port ${config.port}`);
  } catch (err) {
    logger.error((err as Error).message);
  }
};

main();
