import CategoriesModel from '../domain/categoriesModel';
import CategoriesInterface from "../domain/categoriesInterface";
import UserModel from '../../users/domain/usersModel';

interface IGetCategoryByIdPayload {
  categoryId: string;
  user: UserModel;
}

async function getCategoryById(payload: IGetCategoryByIdPayload): Promise<CategoriesInterface|null> {
  try {
    const category = await CategoriesModel.findById(payload.categoryId) as CategoriesModel;
    if (category !== null && category.userId === payload.user.id) {
      return category.toJSON() as CategoriesInterface;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}

export default getCategoryById;
