import {
  IBadRequestData,
  IBadRequestErrorResponse,
} from "../types/error-types";
import ApiError from "./ApiError";

class BadRequestError extends ApiError implements IBadRequestErrorResponse {
  readonly message: string;
  readonly code: number;
  readonly error: string;
  readonly in: string;
  readonly data: IBadRequestData[];

  constructor(
    message = "Request body is not valid",
    data: IBadRequestData[] = [],
    _in?: string,
  ) {
    super(message);

    this.message = message;
    this.code = 400;
    this.in = _in ?? "body";
    this.data = data;
    this.error = "BadRequest";

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

export default BadRequestError;
