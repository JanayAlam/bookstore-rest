import { Router } from "express";
import authRouter from "../api/v1/auth";
import authorRouter from "../api/v1/author";
import bookRouter from "../api/v1/book";

const apiRoutes: { path: string; router: Router }[] = [
  {
    path: "auth",
    router: authRouter,
  },
  {
    path: "authors",
    router: authorRouter,
  },
  {
    path: "books",
    router: bookRouter,
  },
];

export default apiRoutes;
