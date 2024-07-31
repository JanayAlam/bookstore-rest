import { NextFunction, Request, Response } from "express";

export const getAllAuthorsWithBooks = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  return res.render("pages/author/index");
};
