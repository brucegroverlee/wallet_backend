import CategoriesModel from '../domain/categoriesModel';
import CategoriesInterface from "../domain/categoriesInterface";
import UserModel from '../../users/domain/usersModel';

interface ICreateAccountPayload {
  categoryGroupId: string;
  name: string;
  description: string;
  isRecurrent: boolean;
  budget: number;
  currency: string;
  user: UserModel;
}

async function createCategory(payload: ICreateAccountPayload): Promise<CategoriesInterface> {
  try {
    const {
      categoryGroupId,
      name,
      description,
      isRecurrent,
      budget,
      currency,
      user,
    } = payload;
    const category = await CategoriesModel.create({
      userId: user.id,
      categoryGroupId,
      name,
      description,
      isRecurrent,
      budget,
      currency,
    });
    return category.toJSON() as CategoriesInterface;
  } catch (error) {
    throw error;
  }
}

export default createCategory;
