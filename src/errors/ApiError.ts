import dayjs from "dayjs";
import { constant } from "../constants";
import { IErrorResponse } from "../types/error-types";

abstract class ApiError extends Error implements IErrorResponse {
  readonly timestamp: string;

  abstract readonly message: string;
  abstract readonly code: number;
  abstract readonly error: string;

  constructor(message: string) {
    super(message);

    this.timestamp = dayjs(new Date()).format(constant.DATE_TIME_FORMAT_STRING);

    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export default ApiError;
