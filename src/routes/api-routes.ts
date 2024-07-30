import { Router } from "express";
import authorRouter from "../api/v1/author";
import bookRouter from "../api/v1/book";

const apiRoutes: { path: string; router: Router }[] = [
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
