import express from "express";
import {
  destroy,
  index,
  show,
  store,
  update,
} from "../controller/lesson.controller";
import { checkauth } from "../../utils/auth";

export const lessonRouter = express.Router();

lessonRouter.get("/", checkauth, index);

lessonRouter.get("/:id", checkauth, show);

lessonRouter.post("/", checkauth, store);

lessonRouter.put("/:id", checkauth, update);

lessonRouter.delete("/:id", checkauth, destroy);
