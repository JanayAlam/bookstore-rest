import { Router } from "express";
import { validateParamsId } from "../../middlewares/validate-params-id";
import { authorController } from "../controllers";

const { getAllAuthorsWithBooks, getAuthorWithBooks } = authorController;

const router = Router();

router.get("/", getAllAuthorsWithBooks);

router.get("/:id", validateParamsId, getAuthorWithBooks);

export default router;
