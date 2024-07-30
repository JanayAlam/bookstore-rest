import { IUser } from "../types/user-types";

/* eslint-disable @typescript-eslint/no-namespace */
export {};

declare global {
  namespace Express {
    interface Request {
      user?: Omit<IUser, "password">;
    }
  }
}
