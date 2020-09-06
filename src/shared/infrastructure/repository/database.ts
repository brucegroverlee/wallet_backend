import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(process.cwd(), "env", `${process.env.NODE_ENV}.env`),
});
const sequelize = new Sequelize(process.env.DB_DB, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: 8889, // process.env.DB_PORT as unknown as number,
  dialect: 'mysql',
  dialectOptions: {
    connectTimeout: 60000
  },
  logging: false,
  timezone: '-05:00',
});

export default sequelize;
