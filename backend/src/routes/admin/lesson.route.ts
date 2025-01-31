import express from "express";
import {
  create,
  destroy,
  index,
  show,
  store,
  update,
} from "../../controller/lesson.controller";
import { lessonValidation } from "../../validator/lesson.validator";

export const lessonRouter = express.Router();

lessonRouter.get("/", index);
lessonRouter.get("/create", create);

lessonRouter.get("/:id", show);

lessonRouter.post("/", lessonValidation, store);

lessonRouter.put("/:id", lessonValidation, update);

lessonRouter.delete("/:id", destroy);
