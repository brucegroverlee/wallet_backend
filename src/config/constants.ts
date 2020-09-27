import dotenv from "dotenv";
import path from "path";
import _package from "../../package.json";

dotenv.config({
  path: path.resolve(process.cwd(), "env", `${process.env.NODE_ENV}.env`),
});

export const APP_VERSION = _package.version;
export const APP_PORT = process.env.PORT || 3000;

/** DB */
export const DB_DB = process.env.DB_DB;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = process.env.DB_PORT;

/** Swagger */
export const SWAGGER_TITLE = process.env.SWAGGER_TITLE;
export const SWAGGER_DESCRIPTION = process.env.SWAGGER_DESCRIPTION;
export const SWAGGER_SERVER = process.env.SWAGGER_SERVER;
export const SWAGGER_CONTACT_NAME= process.env.SWAGGER_CONTACT_NAME;
export const SWAGGER_CONTACT_EMAIL= process.env.SWAGGER_CONTACT_EMAIL;
export const SWAGGER_CONTACT_URL= process.env.SWAGGER_CONTACT_URL;

/** User */

export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;