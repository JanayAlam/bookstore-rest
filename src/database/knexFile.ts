require("dotenv").config({ path: "../../.env" });

import type { Knex } from "knex";
import { config } from "../constants";

interface IKnexConfig {
  development: Knex.Config;
  test: Knex.Config;
  production: Knex.Config;
}

const knexConfigs: IKnexConfig = {
  development: {
    client: "postgresql",
    connection: {
      database: config.dbName,
      user: config.dbUsername,
      password: config.dbPassword,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },
  test: {
    client: "postgresql",
    connection: {
      database: config.dbName,
      user: config.dbUsername,
      password: config.dbPassword,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },
  production: {
    client: "postgresql",
    connection: {
      database: config.dbName,
      user: config.dbUsername,
      password: config.dbPassword,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./migrations",
      tableName: "knex_migrations",
    },
  },
};

export default knexConfigs;
