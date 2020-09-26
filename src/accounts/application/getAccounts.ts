import AccountsModel from "../domain/accountsModel";
import AccountsInterface from "../domain/accountsInterface";
import UserModel from "../../users/domain/usersModel";
import { PaginationInterface } from "../../shared/domain/paginationInterface";
import { getPagination } from "../../shared/application/utils/getPagination";
import { getOffsetAndLimit } from "../../shared/application/utils/getOffsetAndLimit";

interface IGetAccountsPayload {
  query: any;
  page: number;
  perPage: number;
  user: UserModel;
}

export interface IGetAccountsResult {
  data: AccountsInterface[];
  pagination: PaginationInterface;
}

export async function getAccounts(payload: IGetAccountsPayload): Promise<IGetAccountsResult> {
  try {
    const query = {
      userId: payload.user.id,
      ...payload.query,
    };
    const { offset, limit } = getOffsetAndLimit(payload.page, payload.perPage);
    const result = await AccountsModel.findAndCountAll({
      where: query,
      offset,
      limit,
    });
    const accounts = result.rows as unknown as AccountsInterface[];
    const getAccountsResult = {
      data: accounts,
      pagination: getPagination(result.count, payload.page, payload.perPage),
    };
    return getAccountsResult;
  } catch (error) {
    throw error;
  }
}

export default getAccounts;
