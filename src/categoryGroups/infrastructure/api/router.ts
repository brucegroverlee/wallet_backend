import express from "express";
const router = express.Router();

import verifyAuthentication from "../../../shared/infrastructure/api/middlewares/verifyAuthentication";
import validateBodyParams from "../../../shared/infrastructure/api/middlewares/validateBodyParams";
import validateQueryParams from "../../../shared/infrastructure/api/middlewares/validateQueryParams";

import createCategoryGroupBodySchema from "./middlewares/createCategoryGroupBodySchema";
import getListCategoryGroupsQuerySchema from "./middlewares/getListCategoryGroupsQuerySchema";
import updateCategoryGroupBodySchema from "./middlewares/updateCategoryGroupBodySchema";

import createCategoryGroupController from "./controllers/createCategoryGroupController";
import getCategoryGroupByIdController from "./controllers/getCategoryGroupByIdController";
import getCategoryGroupsController from "./controllers/getCategoryGroupsController";
import updateCategoryGroupByIdController from "./controllers/updateCategoryGroupByIdController";
import deleteCategoryGroupByIdController from "./controllers/deleteCategoryGroupByIdController";

router.post("/category-groups",
  verifyAuthentication,
  validateBodyParams(createCategoryGroupBodySchema),
  createCategoryGroupController
);
router.get("/category-groups/:categoryGroupId", verifyAuthentication, getCategoryGroupByIdController);
router.get("/category-groups",
  verifyAuthentication,
  validateQueryParams(getListCategoryGroupsQuerySchema),
  getCategoryGroupsController
);
router.put("/category-groups/:categoryGroupId",
  verifyAuthentication,
  validateBodyParams(updateCategoryGroupBodySchema),
  updateCategoryGroupByIdController
);
router.delete("/category-groups/:categoryGroupId", verifyAuthentication, deleteCategoryGroupByIdController);

export default router;
