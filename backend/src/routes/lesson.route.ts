import express from "express";
import {
  destroy,
  index,
  show,
  store,
  update,
} from "../controller/lesson.controller";
import { checkauth } from "../../utils/auth";
import { lessonValidation } from "../validator/lesson.validator";

export const lessonRouter = express.Router();

lessonRouter.get("/", checkauth, index);

lessonRouter.get("/:id", checkauth, show);

lessonRouter.post("/", checkauth, lessonValidation, store);

lessonRouter.put("/:id", checkauth, lessonValidation, update);

lessonRouter.delete("/:id", checkauth, destroy);
