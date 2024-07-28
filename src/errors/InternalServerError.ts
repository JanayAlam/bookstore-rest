import ApiError from "./ApiError";

class InternalServerError extends ApiError {
  readonly message: string;
  readonly code: number;
  readonly error: string;

  constructor(message = "Something went wrong") {
    super(message);

    this.message = message;
    this.code = 500;
    this.error = "InternalSeverError";

    // only because we are extending a built in class
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}

export default InternalServerError;
