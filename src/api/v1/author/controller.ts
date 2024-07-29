import { NextFunction, Request, Response } from "express";

import { constant } from "../../../constants";
import { getAll as getAllAuthors } from "../../../lib/author";

export const getAll = async (
  req: Request<null, null, null, { page?: number; limit?: number }>,
  res: Response,
  next: NextFunction,
) => {
  const { page, limit } = req.query;
  try {
    const [authors, total] = await getAllAuthors({
      page,
      limit,
    });
    return res.status(200).json({
      items: authors,
      pagination: {
        total,
        page: !isNaN(Number(page)) ? Number(page) : constant.pagination.page,
        limit: limit ? Number(limit) : constant.pagination.limit,
      },
    });
  } catch (err) {
    next(err);
  }
};
