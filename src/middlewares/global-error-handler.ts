import { NextFunction, Request, Response } from "express";
import { ApiError, BadRequestError, InternalServerError } from "../errors";
import { IBadRequestErrorResponse, IErrorResponse } from "../types/error-types";
import logger from "../utils/logger";

/**
 * global error handler
 * @param err error instance
 * @param _req request instance
 * @param req response instance
 * @param _next next middleware function
 * @returns Response<TErrorResponse | TBadRequestErrorResponse>
 */
const globalErrorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  logger.error(err.message);

  if (err instanceof ApiError) {
    return res
      .status(err.code)
      .json(
        err instanceof BadRequestError
          ? { ...(err as IBadRequestErrorResponse), message: err.message }
          : { ...(err as IErrorResponse), message: err.message },
      );
  }

  const errorObj: IErrorResponse = new InternalServerError(err.message);

  res.status(500).send({ ...errorObj, message: errorObj.message });
};

export default globalErrorHandler;
