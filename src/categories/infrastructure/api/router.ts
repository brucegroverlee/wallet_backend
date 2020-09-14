import express from "express";
const router = express.Router();

import verifyAuthentication from "../../../shared/infrastructure/api/middlewares/verifyAuthentication";
import validateBodyParams from "../../../shared/infrastructure/api/middlewares/validateBodyParams";
import validateQueryParams from "../../../shared/infrastructure/api/middlewares/validateQueryParams";

import createCategoryBodySchema from "./middlewares/createCategoryBodySchema";
import getListCategoriesQuerySchema from "./middlewares/getListCategoriesQuerySchema";
import updateCategoryBodySchema from "./middlewares/updateCategoryBodySchema";

import createCategoryController from "./controllers/createCategoryController";
import getCategoryByIdController from "./controllers/getCategoryByIdController";
import getCategoriesController from "./controllers/getCategoriesController";
import updateCategoryByIdController from "./controllers/updateCategoryByIdController";
import deleteCategoryByIdController from "./controllers/deleteCategoryByIdController";

router.post("/categories",
  verifyAuthentication,
  validateBodyParams(createCategoryBodySchema),
  createCategoryController
);
router.get("/categories",
  verifyAuthentication,
  validateQueryParams(getListCategoriesQuerySchema),
  getCategoriesController
);
router.get("/categories/:categoryId", verifyAuthentication, getCategoryByIdController);
router.put("/categories/:categoryId",
  verifyAuthentication,
  validateBodyParams(updateCategoryBodySchema),
  updateCategoryByIdController
);
router.delete("/categories/:categoryId", verifyAuthentication, deleteCategoryByIdController);

export default router;
