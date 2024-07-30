import { constant } from "../constants";

const generatePaginationResponseObject = (
  totalItems: number,
  page?: number,
  limit?: number,
) => {
  page = !isNaN(Number(page)) ? Number(page) : constant.pagination.page;
  limit = limit ? Number(limit) : constant.pagination.limit;

  const totalPages = Math.ceil(totalItems / limit);

  let nextPage = page === totalPages ? null : page + 1;
  let prevPage = page === 1 ? null : page - 1;

  if (page > totalPages || page < 1) {
    nextPage = prevPage = null;
  }

  return {
    total_items: totalItems,
    total_pages: totalPages,
    page,
    limit,
    next: nextPage,
    prev: prevPage,
  };
};

export default generatePaginationResponseObject;
