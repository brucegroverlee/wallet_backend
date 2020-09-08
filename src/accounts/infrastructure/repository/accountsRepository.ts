import Sequelize from "sequelize";
import { v1 as uuidv1 } from "uuid";
import sequelize from "../../../shared/infrastructure/repository/database";
import RepositoryModel from "../../../shared/infrastructure/repository/repositoryModel";

class AccountsRepository extends RepositoryModel {}

AccountsRepository.init({
  id: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: () => uuidv1(),
  },
  object: {
    type: Sequelize.VIRTUAL,
    get() {
      return "account";
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
  total: {
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
  modelName: 'account',
});

export default AccountsRepository;
