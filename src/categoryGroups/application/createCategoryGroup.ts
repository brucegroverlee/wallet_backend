import CategoryGroupsModel from '../domain/categoryGroupsModel';
import CategoryGroupsInterface from "../domain/categoryGroupsInterface";
import UserModel from '../../users/domain/usersModel';

interface ICreateCategoryGroupPayload {
  type: string;
  name: string;
  description: string;
  user: UserModel;
}

async function createCategoryGroup(payload: ICreateCategoryGroupPayload): Promise<CategoryGroupsInterface> {
  try {
    const { type, name, description, user } = payload;
    const categoryGroup = await CategoryGroupsModel.create({
      userId: user.id,
      type,
      name,
      description,
    });
    return categoryGroup.toJSON() as CategoryGroupsInterface;
  } catch (error) {
    throw error;
  }
}

export default createCategoryGroup;
