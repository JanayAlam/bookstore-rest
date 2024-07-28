import winston, { format, transports } from "winston";
import { constant } from "../constants";

const { combine, timestamp, prettyPrint } = format;

const logger = winston.createLogger({
  level: "info",
  format: format.json(),
  transports: [
    new transports.Console({
      format: combine(
        timestamp({ format: constant.DATE_TIME_FORMAT_STRING }),
        prettyPrint({ depth: 2 }),
      ),
    }),
  ],
});

export default logger;
