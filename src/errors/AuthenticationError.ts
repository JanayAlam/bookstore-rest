import ApiError from "./ApiError";

class AuthenticationError extends ApiError {
  readonly message: string;
  readonly code: number;
  readonly error: string;

  constructor(message = "Unauthorized") {
    super(message);

    this.message = message;
    this.code = 401;
    this.error = "AuthenticationError";

    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}

export default AuthenticationError;
