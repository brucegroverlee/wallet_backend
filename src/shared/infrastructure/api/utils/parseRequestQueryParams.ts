interface RequestQueryParamsInterface {
  query: any;
  page: number;
  perPage: number;
  since?: string;
  until?: string;
}

export function parseRequestQueryParams(requestQuery: any): RequestQueryParamsInterface {
  const page = requestQuery.page as unknown as number;
  const perPage = requestQuery.perPage as unknown as number;
  const since = requestQuery.since as unknown as string;
  const until = requestQuery.until as unknown as string;
  delete requestQuery.page;
  delete requestQuery.perPage;
  delete requestQuery.since;
  delete requestQuery.until;
  return {
    query: requestQuery,
    page,
    perPage,
    since,
    until,
  };
}