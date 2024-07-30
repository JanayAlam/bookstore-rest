/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { BadRequestError } from "../errors";
import { IBadRequestData } from "../types/error-types";

const validate = (schema: Joi.ObjectSchema) => {
  return async (
    req: Request<any, any, any, any>,
    _res: Response,
    next: NextFunction,
  ) => {
    const { error } = schema.validate(req.body, { stripUnknown: true });

    if (error) {
      const data: IBadRequestData[] = error.details.map((details) => ({
        field: `${details.path}`,
        messages: [details.message],
      }));

      return next(new BadRequestError("Request body is not valid", data));
    }

    next();
  };
};

export default validate;
