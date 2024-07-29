/* eslint-disable @typescript-eslint/no-namespace */
export {};

declare global {
  namespace Express {
    interface Request {
      user?: any; //! change it
    }
  }
}
