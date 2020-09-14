import Sequelize from "sequelize";
import { v1 as uuidv1 } from "uuid";
import sequelize from "../../../shared/infrastructure/repository/database";
import RepositoryModel from "../../../shared/infrastructure/repository/repositoryModel";

class CategoriesRepository extends RepositoryModel {}

CategoriesRepository.init({
  id: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: () => uuidv1(),
  },
  object: {
    type: Sequelize.VIRTUAL,
    get() {
      return "category";
    },
    set(value) {
      throw new Error("Do not try to set the `object` value!");
    },
  },
  userId: {
    type: Sequelize.UUID,
    allowNull: false,
  },
  categoryGroupId: {
    type: Sequelize.UUID,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isRecurrent: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  budget: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  currency: {
    type: Sequelize.STRING(3),
    allowNull: false,
  },
},
{
  sequelize,
  modelName: "category",
  tableName: "categories",
});

export default CategoriesRepository;
