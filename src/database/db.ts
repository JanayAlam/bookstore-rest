import knex from "knex";

import { config } from "../constants";
import knexConfigs from "./knexFile";

const knexConfig = knexConfigs[config.environment || "development"];

const db = knex(knexConfig);

export default db;
