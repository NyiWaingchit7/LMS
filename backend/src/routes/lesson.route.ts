import express from "express";
import {
  destroy,
  index,
  show,
  store,
  update,
} from "../controller/lesson.controller";

export const lessonRouter = express.Router();

lessonRouter.get("/", index);

lessonRouter.get("/:id", show);

lessonRouter.post("/", store);

lessonRouter.put("/:id", update);

lessonRouter.delete("/:id", destroy);
