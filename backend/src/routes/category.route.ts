import express from "express";
import {
  destroy,
  index,
  show,
  store,
  update,
} from "../controller/category.controller";
import { checkauth } from "../../utils/auth";
import { categoryValidation } from "../validator/category.validator";

export const categoryRouter = express.Router();

categoryRouter.get("/", checkauth, index);

categoryRouter.get("/:id", checkauth, show);

categoryRouter.post("/", checkauth, categoryValidation, store);

categoryRouter.put("/:id", checkauth, categoryValidation, update);

categoryRouter.delete("/:id", checkauth, destroy);
