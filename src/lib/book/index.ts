import dayjs from "dayjs";
import { constant } from "../../constants";
import { Book } from "../../models";
import { IBook } from "../../types/book-types";

interface IPaginationParams {
  page?: number;
  limit?: number;
  offset?: number;
}

export const create = async (
  title: string,
  dateOfPublish: dayjs.Dayjs,
  authorId: number,
  description: string | null = null,
) => {
  const book = await Book.insert({
    title,
    published_date: dateOfPublish,
    description,
    author_id: authorId,
  });
  return book.id;
};

export const getAll = async ({
  page = constant.pagination.page,
  limit = constant.pagination.limit,
}: IPaginationParams): Promise<[IBook[], number]> => {
  if (page < 1) page = 1;
  const offset = (page - 1) * limit;
  return Book.findAll<IBook>(offset, limit);
};

export const getById = async (id: number) => {
  return Book.findById(id);
};

export const updateById = async (
  id: number,
  {
    title,
    dateOfPublish,
    description,
    authorId,
  }: {
    title?: string;
    dateOfPublish?: dayjs.Dayjs;
    description?: string | null;
    authorId?: number | null;
  },
): Promise<number | null> => {
  const book = await Book.updateById(id, {
    title,
    published_date: dateOfPublish,
    description,
    authorId,
  });

  return book ? book.id : null;
};

export const removeById = async (id: number): Promise<number | null> => {
  const book = await Book.removeById(id);
  return book ? book.id : null;
};

export const getByAuthorId = async (authorId: number): Promise<IBook[]> => {
  return Book.findByAuthorId(authorId);
};
