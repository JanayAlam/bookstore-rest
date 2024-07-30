import { Router } from "express";

import validate from "../../../middlewares/body-validator";
import { validateParamsId } from "../../../middlewares/validate-params-id";
import {
  createSchema as bookCreateSchema,
  updateSchema as bookUpdateSchema,
} from "../../../validation-schemas/book-validation-schema";
import { create, get, getAll, remove, update } from "./controller";

const router = Router();

router.post("/", validate(bookCreateSchema), create);

router.get("/", getAll);

router.get("/:id", validateParamsId, get);

router.put("/:id", validateParamsId, validate(bookUpdateSchema), update);

router.delete("/:id", validateParamsId, remove);

export default router;
