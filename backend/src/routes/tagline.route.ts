import express from "express";
import { checkauth } from "@/utils/auth";
import {
  destroy,
  index,
  show,
  store,
  update,
} from "@/controller/tagline.controller";
import { tagLineValidation } from "@/validator/tagline.validator";

export const tagLineRouter = express.Router();
tagLineRouter.use(checkauth);

tagLineRouter.get("/", index);

tagLineRouter.get("/:id", show);

tagLineRouter.post("/", tagLineValidation, store);

tagLineRouter.put("/:id", tagLineValidation, update);

tagLineRouter.delete("/:id", destroy);
