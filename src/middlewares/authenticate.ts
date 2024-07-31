import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import jwt from "jsonwebtoken";
import { AuthenticationError } from "../errors";
import { getById as getUserById } from "../lib/user";
import { IUser } from "../types/user-types";

const authenticate = async (
  req: Request<unknown, unknown, unknown, unknown>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) throw new AuthenticationError();

    const { value, error } = await Joi.string()
      .custom((value, helpers) => {
        if (!value.startsWith("Bearer ")) {
          return helpers.error("string.pattern.base", { value });
        }
        return value;
      }, "Bearer Token Validation")
      .messages({
        "string.pattern.base": 'Access token must start with "Bearer "',
      })
      .validate(authHeader);

    if (error || !value) throw new AuthenticationError(error?.message);

    const jwtToken = value.split(" ")[1] as string;
    const payload: unknown = jwt.decode(jwtToken);

    const user = await getUserById((payload as Omit<IUser, "password">).id);

    if (!user) throw new AuthenticationError();

    next();
  } catch (err) {
    next(err);
  }
};

export default authenticate;
