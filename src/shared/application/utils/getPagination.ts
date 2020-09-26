import { PaginationInterface } from "../../domain/paginationInterface";

export function getPagination(count: number, page: number, perPage: number): PaginationInterface {
  page = (count > 0) ? (page) : (0);
  const pages = Math.ceil(count / perPage);
  const total = count;
  return {
    page,
    perPage,
    pages,
    total,
  };
}