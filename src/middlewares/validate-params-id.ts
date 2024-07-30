/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../errors";

export const validateParamsId = async (
  req: Request<{ id: number }, any, any, any>,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    if (isNaN(Number(id)) || Number(id) < 1) {
      throw new BadRequestError(
        "The provided id is not a valid id",
        [
          {
            field: "id",
            messages: ["Provide a valid author id"],
          },
        ],
        "params",
      );
    }
    next();
  } catch (err) {
    next(err);
  }
};
