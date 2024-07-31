import dayjs from "dayjs";
import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../../errors";
import {
  getAll as getAllAuthor,
  getById as getAuthorById,
} from "../../lib/author";
import { getByAuthorId as getBooksByAuthorId } from "../../lib/book";
import { IBook } from "../../types/book-types";
import { IGetAllQueryParams, IParamsId } from "../../types/common-types";
import generatePaginationResponseObject from "../../utils/pagination-response-object";

const getAllBooksByAuthorId = async (ids: number[]) => {
  const authorsWithBooks: Record<number, IBook[]> = {};
  for (const id of ids) {
    const books = await getBooksByAuthorId(id);
    authorsWithBooks[id] = [...books];
  }
  return authorsWithBooks;
};

export const getAllAuthorsWithBooks = async (
  req: Request<null, null, null, IGetAllQueryParams>,
  res: Response,
  next: NextFunction,
) => {
  const { page, limit } = req.query;
  try {
    const [authors, totalAuthors] = await getAllAuthor({ page, limit });

    const books = await getAllBooksByAuthorId(
      authors.map((author) => author.id),
    );

    return res.render("pages/author/index", {
      authors: authors,
      books: books,
      pagination: generatePaginationResponseObject(totalAuthors, page, limit),
    });
  } catch (err) {
    next(err);
  }
};

export const getAuthorWithBooks = async (
  req: Request<IParamsId, null, null, null>,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    const author = await getAuthorById(id);

    if (!author) throw new NotFoundError("Author not found");

    const books = await getBooksByAuthorId(id);

    return res.render("pages/author/details", {
      author: {
        ...author,
        birthdate: dayjs(new Date(author.birthdate)).format("DD-MMM-YYYY"),
      },
      books: books.map((book) => ({
        ...book,
        published_date: dayjs(new Date(book.published_date)).format(
          "DD MMMM, YYYY",
        ),
      })),
    });
  } catch (err) {
    next(err);
  }
};
