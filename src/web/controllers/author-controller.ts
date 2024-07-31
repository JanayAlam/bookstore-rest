import { NextFunction, Request, Response } from "express";
import { getAll as getAllAuthor } from "../../lib/author";
import { getByAuthorId } from "../../lib/book";
import { IBook } from "../../types/book-types";
import { IGetAllQueryParams } from "../../types/common-types";
import generatePaginationResponseObject from "../../utils/pagination-response-object";

const getAllBooksByAuthorId = async (ids: number[]) => {
  const authorsWithBooks: Record<number, IBook[]> = {};
  for (const id of ids) {
    const books = await getByAuthorId(id);
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
