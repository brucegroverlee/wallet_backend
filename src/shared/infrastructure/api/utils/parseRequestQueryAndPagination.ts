interface RequestQueryAndPaginationInterface {
  query: any;
  page: number;
  perPage: number;
}

export function parseRequestQueryAndPagination(requestQuery: any): RequestQueryAndPaginationInterface {
  const page = requestQuery.page as unknown as number;
  const perPage = requestQuery.perPage as unknown as number;
  delete requestQuery.page;
  delete requestQuery.perPage;
  return {
    query: requestQuery,
    page,
    perPage,
  };
}