import { constant } from "../../constants";
import { Author } from "../../models";
import { IAuthor } from "../../types/author-types";

interface IPaginationParams {
  page?: number;
  limit?: number;
  offset?: number;
}

export const getAll = async ({
  page = constant.pagination.page,
  limit = constant.pagination.limit,
}: IPaginationParams): Promise<[IAuthor[], number]> => {
  if (page < 1) page = 1;
  const offset = (page - 1) * limit;
  return Author.findAll<IAuthor>(offset, limit);
};
