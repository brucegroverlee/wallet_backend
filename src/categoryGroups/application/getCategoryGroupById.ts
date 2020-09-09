import CategoryGroupsModel from '../domain/categoryGroupsModel';
import CategoryGroupsInterface from "../domain/categoryGroupsInterface";
import UserModel from '../../users/domain/usersModel';

interface IGetCategoryGroupByIdPayload {
  categoryGroupId: string;
  user: UserModel;
}

async function getCategoryGroupById(payload: IGetCategoryGroupByIdPayload): Promise<CategoryGroupsInterface|null> {
  try {
    const categoryGroup = await CategoryGroupsModel.findById(payload.categoryGroupId) as CategoryGroupsModel;
    if (categoryGroup !== null && categoryGroup.userId === payload.user.id) {
      return categoryGroup.toJSON() as CategoryGroupsInterface;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}

export default getCategoryGroupById;
