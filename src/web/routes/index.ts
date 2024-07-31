import { Router } from "express";
import authorRouter from "./authorRoute";
import bookRouter from "./bookRoutes";

const router = Router();

// author routes
router.use(["/", "/authors"], authorRouter);

// book routes
router.use("/books", bookRouter);

export default router;
