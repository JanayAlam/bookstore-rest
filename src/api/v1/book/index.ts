import { Router } from "express";

import authenticate from "../../../middlewares/authenticate";
import validate from "../../../middlewares/body-validator";
import { validateParamsId } from "../../../middlewares/validate-params-id";
import {
  createSchema as bookCreateSchema,
  updateSchema as bookUpdateSchema,
} from "../../../validation-schemas/book-validation-schema";
import {
  create,
  get,
  getAll,
  getAllBooksOfSpecificAuthor,
  remove,
  update,
} from "./controller";

const router = Router();

router.post("/", validate(bookCreateSchema), authenticate, create);

router.get("/", getAll);

router.get("/:id", validateParamsId, get);

router.put("/:id", validateParamsId, validate(bookUpdateSchema), update);

router.delete("/:id", validateParamsId, remove);

router.get("/author/:id", validateParamsId, getAllBooksOfSpecificAuthor);

export default router;
