import CategoriesModel from '../domain/categoriesModel';
import UserModel from '../../users/domain/usersModel';

interface IDeleteCategoryByIdPayload {
  categoryId: string;
  user: UserModel;
}

/**
 * Returns true if found the object. Otherwise, returns false.
 * @param payload
 */
async function deleteCategoryById(payload: IDeleteCategoryByIdPayload): Promise<boolean> {
  try {
    const query = {
      userId: payload.user.id,
      id: payload.categoryId,
    };
    const category = await CategoriesModel.findOne({
      where: query,
    });
    if (category !== null) {
      await category.destroy();
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
}

export default deleteCategoryById;
