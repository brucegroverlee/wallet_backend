import express from "express";
const router = express.Router();

import verifyAuthentication from "../../../shared/infrastructure/api/middlewares/verifyAuthentication";
import verifyLoginParams from "./middlewares/verifyLoginParams";
import verifySignupParams from "./middlewares/verifySignupParams";

import loginController from "./controllers/loginController";
import meController from "./controllers/meController";
import signupController from "./controllers/signupController";

router.post("/login", verifyLoginParams, loginController);
router.post("/signup", verifySignupParams, signupController);
router.get("/me", verifyAuthentication, meController);

export default router;
