interface GetOffsetAndLimitInterface {
  offset: number;
  limit: number;
}

export function getOffsetAndLimit(page: number, perPage: number): GetOffsetAndLimitInterface {
  const offset = (page - 1) * perPage;
  const limit = perPage as number;
  return {
    offset,
    limit,
  };
}