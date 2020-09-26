import CategoriesModel from '../domain/categoriesModel';
import CategoriesInterface from "../domain/categoriesInterface";
import UserModel from '../../users/domain/usersModel';
import { PaginationInterface } from "../../shared/domain/paginationInterface";
import { getPagination } from "../../shared/application/utils/getPagination";
import { getOffsetAndLimit } from "../../shared/application/utils/getOffsetAndLimit";

interface IGetCategoriesPayload {
  query: any;
  page: number;
  perPage: number;
  user: UserModel;
}

export interface IGetCategoriesResult {
  data: CategoriesInterface[];
  pagination: PaginationInterface;
}

async function getCategories(payload: IGetCategoriesPayload): Promise<IGetCategoriesResult> {
  try {
    const query = {
      userId: payload.user.id,
      ...payload.query,
    };
    const { offset, limit } = getOffsetAndLimit(payload.page, payload.perPage);
    const result = await CategoriesModel.findAndCountAll({
      where: query,
      offset,
      limit,
    });
    const categories = result.rows as unknown as CategoriesInterface[];
    const getCategoriesResult = {
      data: categories,
      pagination: getPagination(result.count, payload.page, payload.perPage),
    };
    return getCategoriesResult;
  } catch (error) {
    throw error;
  }
}

export default getCategories;
