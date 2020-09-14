import CategoriesModel from '../domain/categoriesModel';
import CategoriesInterface from "../domain/categoriesInterface";
import UserModel from '../../users/domain/usersModel';

interface IGetCategoriesPayload {
  query: any;
  user: UserModel;
}

async function getCategories(payload: IGetCategoriesPayload): Promise<CategoriesInterface[]> {
  try {
    const query = {
      userId: payload.user.id,
      ...payload.query,
    };
    const categories = await CategoriesModel.find(query);
    return categories as unknown as CategoriesInterface[];
  } catch (error) {
    throw error;
  }
}

export default getCategories;
