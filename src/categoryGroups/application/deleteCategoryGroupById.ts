import CategoryGroupsModel from '../domain/categoryGroupsModel';
import UserModel from '../../users/domain/usersModel';

interface IDeleteCategoryGroupsByIdPayload {
  categoryGroupId: string;
  user: UserModel;
}

/**
 * Returns true if found the object. Otherwise, returns false.
 * @param payload
 */
async function deleteCategoryGroupById(payload: IDeleteCategoryGroupsByIdPayload): Promise<boolean> {
  try {
    const query = {
      userId: payload.user.id,
      id: payload.categoryGroupId,
    };
    const categoryGroup = await CategoryGroupsModel.findOne({
      where: query,
    });
    if (categoryGroup !== null) {
      await categoryGroup.destroy();
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
}

export default deleteCategoryGroupById;
