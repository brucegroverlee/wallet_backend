import { Op } from "sequelize";

export function addRangeQuery(query: any, attribute: string, since?: any, until?: any): any {
  const _query = {...query};
  if (since && until) {
    _query[attribute] = {
      [Op.lt]: until,
      [Op.gt]: since,
    };
  }
  return _query;
}