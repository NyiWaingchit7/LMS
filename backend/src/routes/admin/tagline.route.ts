import express from "express";
import { checkauth } from "../../../utils/auth";
import {
  destroy,
  index,
  show,
  store,
  update,
} from "../../controller/tagline.controller";
import { tagLineValidation } from "../../validator/tagline.validator";

export const tagLineRouter = express.Router();

tagLineRouter.get("/", checkauth, index);

tagLineRouter.get("/:id", checkauth, show);

tagLineRouter.post("/", checkauth, tagLineValidation, store);

tagLineRouter.put("/:id", checkauth, tagLineValidation, update);

tagLineRouter.delete("/:id", checkauth, destroy);
