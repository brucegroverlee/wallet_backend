import { Sequelize } from "sequelize";
import { DB_DB, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER} from "./constants";

export const sequelize = new Sequelize(DB_DB, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT as unknown as number,
  dialect: 'mysql',
  dialectOptions: {
    connectTimeout: 60000
  },
  logging: false,
  timezone: '-05:00',
});
