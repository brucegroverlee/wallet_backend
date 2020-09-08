/* tslint:disable:ordered-imports */
import "module-alias/register"; // tslint:disable-line
/* tslint:enable:ordered-imports */

import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import database from "./shared/infrastructure/repository/database";

import _package from "../package.json";
const PORT = process.env.PORT || 3000;
const VERSION = _package.version; // require('@root/package.json').version;

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

import usersRouter from "./users/infrastructure/api/router";
app.use(usersRouter);

import accountsRouter from "./accounts/infrastructure/api/router";
app.use(accountsRouter);

app.use((request, response) => {
  response.status(404);
  response.end();
});

// ********************************************
// http server listening
// ********************************************
database.sync().then(() => {
  if (process.env.NODE_ENV !== "test" && process.env.NODE_ENV !== "test.local") {
    app.listen(PORT, () => {
      /* tslint:disable:no-console */
      console.log("NODE_ENV: ", process.env.NODE_ENV);
      console.log(`Backend v${VERSION}`);
      console.log("The RESTful Api is running at http://localhost:%d/", PORT);
      // console.log(`The Webhook Server is running at http://localhost:${PORT}/webhooks`);
      /* tslint:enable:no-console */
    });
  }
});


export default app; // for testing
