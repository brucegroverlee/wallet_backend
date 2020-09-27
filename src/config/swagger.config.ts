import {
  APP_VERSION,
  SWAGGER_TITLE,
  SWAGGER_DESCRIPTION,
  SWAGGER_SERVER,
  SWAGGER_CONTACT_NAME,
  SWAGGER_CONTACT_EMAIL,
  SWAGGER_CONTACT_URL
} from "./constants";

export const swaggerConfig = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: SWAGGER_TITLE,
      version: APP_VERSION,
      description: SWAGGER_DESCRIPTION,
      contact: {
        name: SWAGGER_CONTACT_NAME,
        url: SWAGGER_CONTACT_URL,
        email: SWAGGER_CONTACT_EMAIL,
      },
    },
    servers: [
      {
        url: SWAGGER_SERVER,
      },
    ],
  },
  apis: [
    "./src/**/*.ts",
    "./src/**/*.yml",
  ],
};