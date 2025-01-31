import express from "express";
import {
  destroy,
  index,
  show,
  store,
  update,
} from "../../controller/tagline.controller";
import { tagLineValidation } from "../../validator/tagline.validator";

export const tagLineRouter = express.Router();

tagLineRouter.get("/", index);

tagLineRouter.get("/:id", show);

tagLineRouter.post("/", tagLineValidation, store);

tagLineRouter.put("/:id", tagLineValidation, update);

tagLineRouter.delete("/:id", destroy);
