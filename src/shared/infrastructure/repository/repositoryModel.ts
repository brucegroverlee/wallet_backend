import { Model } from "sequelize";

class RepositoryModel extends Model {
  public id: string;

  static findById(id: string){
    try {
      return this.findOne({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @param {object} query
   */
  static find(query: any) {
    try {
      return this.findAll({
        where: query,
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @param {object} query
   * @returns {Promise<object>}
   */
  static delete(query: any) {
    try {
      return this.destroy({
        where: query,
      });
    } catch (error) {
      throw error;
    }
  }
}

export default RepositoryModel;
