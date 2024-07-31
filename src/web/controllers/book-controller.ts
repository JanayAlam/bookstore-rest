import dayjs from "dayjs";
import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../../errors";
import { getById as getAuthorById } from "../../lib/author";
import { getById as getBookById } from "../../lib/book";
import { IParamsId } from "../../types/common-types";

export const getBookWithAuthor = async (
  req: Request<IParamsId, null, null, null>,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    const book = await getBookById(id);

    if (!book) throw new NotFoundError("Book not found");

    const author = await getAuthorById(book.author_id);

    if (!author) throw new NotFoundError("Author not found");

    return res.render("pages/book/details", {
      book: {
        ...book,
        published_date: dayjs(new Date(book.published_date)).format(
          "DD MMMM, YYYY",
        ),
      },
      author: {
        ...author,
        birthdate: dayjs(new Date(author.birthdate)).format("DD-MMM-YYYY"),
      },
    });
  } catch (err) {
    next(err);
  }
};
