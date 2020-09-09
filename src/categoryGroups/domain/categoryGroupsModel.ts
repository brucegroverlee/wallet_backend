import CategoryGroupsRepository from "../infrastructure/repository/categoryGroupsRepository";

class CategoryGroupsModel extends CategoryGroupsRepository {
  public id: string;
  public userId: string;
  public name: string;
  public description: string;
}

export default CategoryGroupsModel;
