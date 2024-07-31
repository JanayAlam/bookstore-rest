import { Router } from "express";
import { authorController } from "../controllers";

const { getAllAuthorsWithBooks } = authorController;

const router = Router();

router.get("/", getAllAuthorsWithBooks);

export default router;
