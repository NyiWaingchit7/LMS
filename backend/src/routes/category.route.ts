import express from "express";
import {
  destroy,
  index,
  show,
  store,
  update,
} from "../controller/category.controller";

export const categoryRouter = express.Router();

categoryRouter.get("/", index);

categoryRouter.get("/:id", show);

categoryRouter.post("/", store);

categoryRouter.put("/:id", update);

categoryRouter.delete("/:id", destroy);
