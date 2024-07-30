import { NextFunction, Request, Response } from "express";

import dayjs from "dayjs";
import { NotFoundError } from "../../../errors";
import {
  create as createBook,
  getAll as getAllBooks,
  getById as getBookById,
  removeById as removeBookById,
  updateById as updateBookById,
} from "../../../lib/book";
import {
  ICreateBookRequestBody,
  IUpdateBookRequestBody,
} from "../../../types/book-types";
import { IGetAllQueryParams, IParamsId } from "../../../types/common-types";
import generatePaginationResponseObject from "../../../utils/pagination-response-object";

export const create = async (
  req: Request<null, null, ICreateBookRequestBody, null>,
  res: Response,
  next: NextFunction,
) => {
  const { title, description, published_date, author_id } = req.body;
  try {
    const dateOfPublish = dayjs(new Date(published_date));

    const bookId = await createBook(
      title,
      dateOfPublish,
      author_id,
      description ?? null,
    );

    const book = await getBookById(bookId);

    return res.status(201).json({
      data: book,
    });
  } catch (err) {
    next(err);
  }
};

export const getAll = async (
  req: Request<null, null, null, IGetAllQueryParams>,
  res: Response,
  next: NextFunction,
) => {
  const { page, limit } = req.query;
  try {
    const [books, total] = await getAllBooks({
      page,
      limit,
    });
    return res.status(200).json({
      data: books,
      pagination: generatePaginationResponseObject(total, page, limit),
    });
  } catch (err) {
    next(err);
  }
};

export const get = async (
  req: Request<IParamsId, null, null, null>,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    const book = await getBookById(id);
    if (!book) {
      throw new NotFoundError("Book not found with the provided id");
    }
    return res.status(200).json({
      data: book,
    });
  } catch (err) {
    next(err);
  }
};

export const update = async (
  req: Request<IParamsId, null, IUpdateBookRequestBody, null>,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  const { title, published_date, description, author_id } = req.body;
  try {
    const dateOfPublish = published_date
      ? dayjs(new Date(published_date))
      : undefined;

    const bookId = await updateBookById(id, {
      title,
      dateOfPublish,
      description,
      authorId: author_id,
    });

    if (!bookId) {
      throw new NotFoundError("Book not found with the provided id");
    }

    const book = await getBookById(bookId);

    return res.status(200).json({
      data: book,
    });
  } catch (err) {
    next(err);
  }
};

export const remove = async (
  req: Request<IParamsId, null, null, null>,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    const bookId = await removeBookById(id);

    if (!bookId) {
      throw new NotFoundError("Book not found with the provided id");
    }

    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};
