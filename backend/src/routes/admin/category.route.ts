import express from "express";
import {
  destroy,
  index,
  show,
  store,
  update,
} from "../../controller/category.controller";
import { categoryValidation } from "../../validator/category.validator";

export const categoryRouter = express.Router();

categoryRouter.get("/", index);

categoryRouter.get("/:id", show);

categoryRouter.post("/", categoryValidation, store);

categoryRouter.put("/:id", categoryValidation, update);

categoryRouter.delete("/:id", destroy);
