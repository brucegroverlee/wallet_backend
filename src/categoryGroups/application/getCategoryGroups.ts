import CategoryGroupsModel from '../domain/categoryGroupsModel';
import CategoryGroupsInterface from "../domain/categoryGroupsInterface";
import UserModel from '../../users/domain/usersModel';

interface IGetCategoryGroupsPayload {
  query: any;
  user: UserModel;
}

async function getCategoryGroups(payload: IGetCategoryGroupsPayload): Promise<CategoryGroupsInterface[]> {
  try {
    const query = {
      userId: payload.user.id,
      ...payload.query,
    };
    const categoryGroups = await CategoryGroupsModel.find(query);
    return categoryGroups as unknown as CategoryGroupsInterface[];
  } catch (error) {
    throw error;
  }
}

export default getCategoryGroups;
