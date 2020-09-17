import Sequelize from "sequelize";
import { v1 as uuidv1 } from "uuid";
import sequelize from "../../../shared/infrastructure/repository/database";
import RepositoryModel from "../../../shared/infrastructure/repository/repositoryModel";

class TransactionsRepository extends RepositoryModel {}

TransactionsRepository.init({
  id: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: () => uuidv1(),
  },
  object: {
    type: Sequelize.VIRTUAL,
    get() {
      return "transaction";
    },
    set(value) {
      throw new Error("Do not try to set the `object` value!");
    },
  },
  userId: {
    type: Sequelize.UUID,
    allowNull: false,
  },
  categoryId: {
    type: Sequelize.UUID,
    allowNull: false,
  },
  accountId: {
    type: Sequelize.UUID,
    allowNull: false,
  },
  description: {
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
  modelName: "transaction",
});

export default TransactionsRepository;
