import CategoriesRepository from "../infrastructure/repository/categoriesRepository";

class CategoriesModel extends CategoriesRepository {
  public id: string;
  public userId: string;
  public categoryGroupId: string;
  public name: string;
  public description: string;
  public isRecurrent: boolean;
  public budget: number;
  public currency: string;
}

export default CategoriesModel;
