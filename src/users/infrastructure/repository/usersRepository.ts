import Sequelize from "sequelize";
import { v1 as uuidv1 } from "uuid";
import sequelize from "../../../shared/infrastructure/repository/database";
import RepositoryModel from "../../../shared/infrastructure/repository/repositoryModel";

class UserRepository extends RepositoryModel {}

UserRepository.init({
  id: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: uuidv1(),
  },
  object: {
    type: Sequelize.VIRTUAL,
    get() {
      return "user";
    },
    set(value) {
      throw new Error('Do not try to set the `object` value!');
    },
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
},
{
  sequelize,
  modelName: 'user',
});

export default UserRepository;
