import CategoriesModel from '../domain/categoriesModel';
import CategoriesInterface from "../domain/categoriesInterface";
import UserModel from '../../users/domain/usersModel';

interface IData {
  categoryGroupId?: string;
  name?: string;
  description?: string;
  isRecurrent?: boolean;
  budget?: number;
  currency?: string;
}

interface IUpdateCategoryByIdPayload {
  data: IData;
  categoryId: string;
  user: UserModel;
}

async function updateCategoryById(payload: IUpdateCategoryByIdPayload): Promise<CategoriesInterface|null> {
  try {
    const query = {
      userId: payload.user.id,
      id: payload.categoryId,
    };
    const result = await CategoriesModel.update(payload.data, {
      where: query,
    });
    const rowsUpdated = result[0];
    if (rowsUpdated > 0) {
      const category = await CategoriesModel.findById(payload.categoryId);
      return category.toJSON() as CategoriesInterface;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}

export default updateCategoryById;
