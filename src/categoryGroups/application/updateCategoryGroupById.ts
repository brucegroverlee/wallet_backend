import CategoryGroupsModel from '../domain/categoryGroupsModel';
import CategoryGroupsInterface from "../domain/categoryGroupsInterface";
import UserModel from '../../users/domain/usersModel';

interface IData {
  type?: string;
  name?: string;
  description?: string;
}

interface IUpdateCategoryGroupByIdPayload {
  data: IData;
  categoryGroupId: string;
  user: UserModel;
}

async function updateCategoryGroupById(payload: IUpdateCategoryGroupByIdPayload): Promise<CategoryGroupsInterface|null> {
  try {
    const query = {
      userId: payload.user.id,
      id: payload.categoryGroupId,
    };
    const result = await CategoryGroupsModel.update(payload.data, {
      where: query,
    });
    const rowsUpdated = result[0];
    if (rowsUpdated > 0) {
      const categoryGroup = await CategoryGroupsModel.findById(payload.categoryGroupId);
      return categoryGroup.toJSON() as CategoryGroupsInterface;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}

export default updateCategoryGroupById;
