import TransactionsModel from "../domain/transactionsModel";
import TransactionsInterface from "../domain/transactionsInterface";
import UserModel from "../../users/domain/usersModel";
import { PaginationInterface } from "../../shared/domain/paginationInterface";
import { getPagination } from "../../shared/application/utils/getPagination";
import { getOffsetAndLimit } from "../../shared/application/utils/getOffsetAndLimit";
import { addTimeRangeQuery } from "../../shared/application/utils/addTimeRangeQuery";

interface IGetTransactionsPayload {
  query: any;
  page: number;
  perPage: number;
  since?: string;
  until?: string;
  user: UserModel;
}

export interface IGetTransactionsResult {
  data: TransactionsInterface[];
  pagination: PaginationInterface;
}

async function getTransactions(payload: IGetTransactionsPayload): Promise<IGetTransactionsResult> {
  try {
    let query = {
      userId: payload.user.id,
      ...payload.query,
    };
    const { offset, limit } = getOffsetAndLimit(payload.page, payload.perPage);
    query = addTimeRangeQuery(query, "createdAt", payload.since, payload.until);
    const result = await TransactionsModel.findAndCountAll({
      where: query,
      offset,
      limit,
    });
    const transactions = result.rows as unknown as TransactionsInterface[];
    const getTransactionsResult = {
      data: transactions,
      pagination: getPagination(result.count, payload.page, payload.perPage),
    };
    return getTransactionsResult;
  } catch (error) {
    throw error;
  }
}

export default getTransactions;
