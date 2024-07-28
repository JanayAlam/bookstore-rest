import ApiError from "./ApiError";

class NotFoundError extends ApiError {
  readonly message: string;
  readonly code: number;
  readonly error: string;

  constructor(message = "The requested resource is not found") {
    super(message);

    this.message = message;
    this.code = 404;
    this.error = "NotFoundError";

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export default NotFoundError;
