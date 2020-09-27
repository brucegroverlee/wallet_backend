import moment from "moment";
import { addRangeQuery } from "../../infrastructure/repository/utils/addRangeQuery";

export function addTimeRangeQuery(query: any, attribute: string, since?: any, until?: any): any {
  const _since = since ? moment(since).format('YYYY-MM-DD') : undefined;
  const _until = until ? moment(until).format('YYYY-MM-DD') : undefined;
  return addRangeQuery(query, attribute, _since, _until);
}