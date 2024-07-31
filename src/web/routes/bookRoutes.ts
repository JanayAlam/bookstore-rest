import { Router } from "express";
import { validateParamsId } from "../../middlewares/validate-params-id";
import { bookController } from "../controllers";

const { getBookWithAuthor } = bookController;

const router = Router();

router.get("/:id", validateParamsId, getBookWithAuthor);

export default router;
