import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../../../constants";
import {
  AuthenticationError,
  BadRequestError,
  InternalServerError,
} from "../../../errors";
import {
  create as createUser,
  getById as getUserById,
  getByUsername as getUserByUsername,
} from "../../../lib/user";
import {
  ILoginUserRequestBody,
  IRegisterUserRequestBody,
} from "../../../types/auth-types";

export const register = async (
  req: Request<null, null, IRegisterUserRequestBody, null>,
  res: Response,
  next: NextFunction,
) => {
  const { username, password } = req.body;
  try {
    const existingUser = await getUserByUsername(username);

    if (existingUser) {
      throw new BadRequestError("Username has been already taken", [
        { field: "username", messages: ['"Username" not available'] },
      ]);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = await createUser(username, hashedPassword);

    const user = await getUserById(userId);

    if (!user) {
      throw new InternalServerError("Could not create the user");
    }

    return res.status(201).json({
      data: {
        id: user.id,
        username: user.username,
        updated_at: user.updated_at,
        created_at: user.created_at,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request<null, null, ILoginUserRequestBody, null>,
  res: Response,
  next: NextFunction,
) => {
  const { username, password } = req.body;
  try {
    const user = await getUserByUsername(username);

    if (!user) {
      throw new AuthenticationError("Invalid credentials");
    }

    const result = await bcrypt.compare(password, user.password);

    if (!result) {
      throw new AuthenticationError("Invalid credentials");
    }

    const accessToken = await jwt.sign(
      {
        id: user.id,
        username: user.username,
        updated_at: user.updated_at,
        created_at: user.created_at,
      },
      config.jwtSecret,
      { expiresIn: "30m" },
    );

    return res.status(200).json({
      data: {
        access_token: accessToken,
      },
    });
  } catch (err) {
    next(err);
  }
};
