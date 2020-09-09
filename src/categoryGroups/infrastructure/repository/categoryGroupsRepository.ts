import Sequelize from "sequelize";
import { v1 as uuidv1 } from "uuid";
import sequelize from "../../../shared/infrastructure/repository/database";
import RepositoryModel from "../../../shared/infrastructure/repository/repositoryModel";

class CategoryGroupsRepository extends RepositoryModel {}

CategoryGroupsRepository.init({
  id: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: () => uuidv1(),
  },
  object: {
    type: Sequelize.VIRTUAL,
    get() {
      return "categoryGroup";
    },
    set(value) {
      throw new Error('Do not try to set the `object` value!');
    },
  },
  userId: {
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
},
{
  sequelize,
  modelName: 'categoryGroup',
});

export default CategoryGroupsRepository;
