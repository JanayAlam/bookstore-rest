import dayjs from "dayjs";
import { constant } from "../../constants";
import { Author } from "../../models";
import { IAuthor } from "../../types/author-types";
import { IBook } from "../../types/book-types";
import { getByAuthorId as getBooksByAuthorId } from "../book";

interface IPaginationParams {
  page?: number;
  limit?: number;
  offset?: number;
}

export const create = async (
  name: string,
  dateOfBirth: dayjs.Dayjs,
  bio: string | null = null,
) => {
  const author = await Author.insert({ name, birthdate: dateOfBirth, bio });
  return author.id;
};

export const getAll = async ({
  page = constant.pagination.page,
  limit = constant.pagination.limit,
}: IPaginationParams): Promise<[IAuthor[], number]> => {
  if (page < 1) page = 1;
  const offset = (page - 1) * limit;
  return Author.findAll<IAuthor>(offset, limit);
};

export const getById = async (id: number): Promise<IAuthor | null> => {
  return Author.findById(id);
};

export const updateById = async (
  id: number,
  {
    name,
    dateOfBirth,
    bio,
  }: {
    name?: string;
    dateOfBirth?: dayjs.Dayjs;
    bio?: string | null;
  },
): Promise<number | null> => {
  const author = await Author.updateById(id, {
    name,
    birthdate: dateOfBirth,
    bio,
  });

  return author ? author.id : null;
};

export const removeById = async (id: number): Promise<number | null> => {
  const author = await Author.removeById(id);
  return author ? author.id : null;
};

export const getAuthorBooksById = async (id: number): Promise<IBook[]> => {
  return getBooksByAuthorId(id);
};
