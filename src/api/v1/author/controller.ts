import { NextFunction, Request, Response } from "express";

import dayjs from "dayjs";
import { NotFoundError } from "../../../errors";
import {
  create as createAuthor,
  getAll as getAllAuthors,
  getAuthorBooksById,
  getById as getAuthorById,
  removeById as removeAuthorById,
  updateById as updateAuthorById,
} from "../../../lib/author";
import {
  ICreateAuthorRequestBody,
  IUpdateAuthorRequestBody,
} from "../../../types/author-types";
import { IGetAllQueryParams, IParamsId } from "../../../types/common-types";
import generatePaginationResponseObject from "../../../utils/pagination-response-object";

export const create = async (
  req: Request<null, null, ICreateAuthorRequestBody, null>,
  res: Response,
  next: NextFunction,
) => {
  const { name, birthdate, bio } = req.body;
  try {
    const dateOfBirth = dayjs(new Date(birthdate));

    const authorId = await createAuthor(name, dateOfBirth, bio ?? null);

    const author = await getAuthorById(authorId);

    return res.status(201).json({
      data: author,
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
    const [authors, total] = await getAllAuthors({
      page,
      limit,
    });
    return res.status(200).json({
      data: authors,
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
    const author = await getAuthorById(id);
    if (!author) {
      throw new NotFoundError("Author not found with the provided id");
    }
    return res.status(200).json({
      data: author,
    });
  } catch (err) {
    next(err);
  }
};

export const update = async (
  req: Request<IParamsId, null, IUpdateAuthorRequestBody, null>,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  const { name, bio, birthdate } = req.body;
  try {
    const dateOfBirth = birthdate ? dayjs(new Date(birthdate)) : undefined;

    const authorId = await updateAuthorById(id, { name, bio, dateOfBirth });

    if (!authorId) {
      throw new NotFoundError("Author not found with the provided id");
    }

    const author = await getAuthorById(authorId);

    return res.status(200).json({
      data: author,
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
    const authorId = await removeAuthorById(id);

    if (!authorId) {
      throw new NotFoundError("Author not found with the provided id");
    }

    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export const getAllBooks = async (
  req: Request<IParamsId, null, null, null>,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    const books = await getAuthorBooksById(id);

    return res.status(200).json({
      data: books,
    });
  } catch (err) {
    next(err);
  }
};
