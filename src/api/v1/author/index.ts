import { Router } from "express";

import validate from "../../../middlewares/body-validator";
import { validateParamsId } from "../../../middlewares/validate-params-id";
import {
  createSchema as authorCreateSchema,
  updateSchema as authorUpdateSchema,
} from "../../../validation-schemas/author-validation-schema";
import { create, get, getAll, getAllBooks, remove, update } from "./controller";

const router = Router();

router.post("/", validate(authorCreateSchema), create);

router.get("/", getAll);

router.get("/:id", validateParamsId, get);

router.put("/:id", validateParamsId, validate(authorUpdateSchema), update);

router.delete("/:id", validateParamsId, remove);

router.get("/:id/books", validateParamsId, getAllBooks);

export default router;
