import { InternalServerError } from "../errors";
import db from "./db";

const checkDatabaseConnection = async () => {
  try {
    await db.raw("SELECT 1");
  } catch (err) {
    throw new InternalServerError(
      `Database connection failed - ${(err as Error).message}`,
    );
  }
};

export default checkDatabaseConnection;
