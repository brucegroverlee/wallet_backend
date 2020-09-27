import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { swaggerConfig } from "./config/swagger.config";
import { APP_VERSION, APP_PORT } from "./config/constants";
import database from "./shared/infrastructure/repository/database";

// Create a new express application instance
const app: express.Application = express();
app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({ type: "application/json" }));

// don"t show the log when it is test
if (process.env.NODE_ENV !== "test" && process.env.NODE_ENV !== "test.local") {
  // use morgan to log at command line
  app.use(morgan("combined")); // "combined" outputs the Apache style LOGs
}

const specs = swaggerJsdoc(swaggerConfig);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    explorer: true,
    swaggerOptions: {
      validatorUrl : null,
    },
  })
);

import usersRouter from "./users/infrastructure/api/router";
app.use(usersRouter);

import accountsRouter from "./accounts/infrastructure/api/router";
app.use(accountsRouter);

import categoryGroupsRouter from "./categoryGroups/infrastructure/api/router";
app.use(categoryGroupsRouter);

import categoriesRouter from "./categories/infrastructure/api/router";
app.use(categoriesRouter);

import transactionsRouter from "./transactions/infrastructure/api/router";
app.use(transactionsRouter);

app.use((request, response) => {
  response.status(404);
  response.end();
});

// ********************************************
// http server listening
// ********************************************
database.sync().then(() => {
  if (process.env.NODE_ENV !== "test" && process.env.NODE_ENV !== "test.local") {
    app.listen(APP_PORT, () => {
      /* tslint:disable:no-console */
      console.log("NODE_ENV: ", process.env.NODE_ENV);
      console.log(`Backend v${APP_VERSION}`);
      console.log("The RESTful Api is running at http://localhost:%d/", APP_PORT);
      // console.log(`The Webhook Server is running at http://localhost:${APP_PORT}/webhooks`);
      /* tslint:enable:no-console */
    });
  }
});


export default app; // for testing
