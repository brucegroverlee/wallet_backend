const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.resolve(process.cwd(), "env", `${process.env.NODE_ENV}.env`),
});

const DB_DB = process.env.DB_DB;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;

module.exports = function() {
  let option = {};
  option[process.env.NODE_ENV] = {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_DB,
    host: DB_HOST,
    port: DB_PORT,
    dialect: "mysql"
  };
  return option;
}
