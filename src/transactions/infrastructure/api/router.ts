import express from "express";
const router = express.Router();

import verifyAuthentication from "../../../shared/infrastructure/api/middlewares/verifyAuthentication";
import validateBodyParams from "../../../shared/infrastructure/api/middlewares/validateBodyParams";
import validateQueryParams from "../../../shared/infrastructure/api/middlewares/validateQueryParams";

import createTransactionBodySchema from "./middlewares/createTransactionBodySchema";
import getListTransactionsQuerySchema from "./middlewares/getListTransactionsQuerySchema";
import updateTransactionBodySchema from "./middlewares/updateTransactionBodySchema";

import createTransactionController from "./controllers/createTransactionController";
import getTransactionByIdController from "./controllers/getTransactionByIdController";
import getTransactionsController from "./controllers/getTransactionsController";
import updateTransactionByIdController from "./controllers/updateTransactionByIdController";
import deleteTransactionByIdController from "./controllers/deleteTransactionByIdController";

router.post("/transactions",
  verifyAuthentication,
  validateBodyParams(createTransactionBodySchema),
  createTransactionController
);
router.get("/transactions",
  verifyAuthentication,
  validateQueryParams(getListTransactionsQuerySchema),
  getTransactionsController
);
router.get("/transactions/:transactionId", verifyAuthentication, getTransactionByIdController);
router.put("/transactions/:transactionId",
  verifyAuthentication,
  validateBodyParams(updateTransactionBodySchema),
  updateTransactionByIdController
);
router.delete("/transactions/:transactionId", verifyAuthentication, deleteTransactionByIdController);

export default router;
