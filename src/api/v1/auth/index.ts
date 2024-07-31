import { Router } from "express";
import validate from "../../../middlewares/body-validator";
import {
  createSchema as userCreateSchema,
  userLoginSchema,
} from "../../../validation-schemas/auth-validation-schema";
import { login, register } from "./controller";

const router = Router();

router.post("/register", validate(userCreateSchema), register);

router.post("/login", validate(userLoginSchema), login);

export default router;
