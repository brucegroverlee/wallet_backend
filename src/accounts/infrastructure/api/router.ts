import express from "express";
const router = express.Router();

import verifyAuthentication from "../../../shared/infrastructure/api/middlewares/verifyAuthentication";
import validateBodyParams from "../../../shared/infrastructure/api/middlewares/validateBodyParams";
import validateQueryParams from "../../../shared/infrastructure/api/middlewares/validateQueryParams";

import createAccountBodySchema from "./middlewares/createAccountBodySchema";
import getListAccountsQuerySchema from "./middlewares/getListAccountsQuerySchema";
import updateAccountBodySchema from "./middlewares/updateAccountBodySchema";

import createAccountController from "./controllers/createAccountController";
import getAccountByIdController from "./controllers/getAccountByIdController";
import getAccountsController from "./controllers/getAccountsController";
import updateAccountByIdController from "./controllers/updateAccountByIdController";
import deleteAccountByIdController from "./controllers/deleteAccountByIdController";

router.post("/accounts", verifyAuthentication, validateBodyParams(createAccountBodySchema), createAccountController);
router.get("/accounts/:accountId", verifyAuthentication, getAccountByIdController);
router.get("/accounts", verifyAuthentication, validateQueryParams(getListAccountsQuerySchema), getAccountsController);
router.put("/accounts/:accountId", verifyAuthentication, validateBodyParams(updateAccountBodySchema), updateAccountByIdController);
router.delete("/accounts/:accountId", verifyAuthentication, deleteAccountByIdController);

export default router;
