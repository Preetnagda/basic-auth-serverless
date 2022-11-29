import express, { Router } from "express";

import {
  loginController,
  registerController,
} from "../controller/auth.controller";

import { registrationSchema } from "../validations/auth.validations";

import validate from "../middlewares/validator";

const router: Router = express.Router();

router.post("/login", loginController);
router.post("/register", validate(registrationSchema), registerController);

export default router;
