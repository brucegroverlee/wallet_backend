import CategoryGroupsModel from '../domain/categoryGroupsModel';
import CategoryGroupsInterface from "../domain/categoryGroupsInterface";
import UserModel from '../../users/domain/usersModel';
import { PaginationInterface } from "../../shared/domain/paginationInterface";
import { getPagination } from "../../shared/application/utils/getPagination";
import { getOffsetAndLimit } from "../../shared/application/utils/getOffsetAndLimit";

interface IGetCategoryGroupsPayload {
  query: any;
  page: number;
  perPage: number;
  user: UserModel;
}

export interface IGetCategoryGroupsResult {
  data: CategoryGroupsInterface[];
  pagination: PaginationInterface;
}

async function getCategoryGroups(payload: IGetCategoryGroupsPayload): Promise<IGetCategoryGroupsResult> {
  try {
    const query = {
      userId: payload.user.id,
      ...payload.query,
    };
    const { offset, limit } = getOffsetAndLimit(payload.page, payload.perPage);
    const result = await CategoryGroupsModel.findAndCountAll({
      where: query,
      offset,
      limit,
    });
    const categoryGroups = result.rows as unknown as CategoryGroupsInterface[];
    const getAccountsResult = {
      data: categoryGroups,
      pagination: getPagination(result.count, payload.page, payload.perPage),
    };
    return getAccountsResult;
  } catch (error) {
    throw error;
  }
}

export default getCategoryGroups;
