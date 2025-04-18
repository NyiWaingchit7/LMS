import express from "express";
import {
  create,
  destroy,
  index,
  searchLecture,
  show,
  store,
  update,
} from "../../controller/lecture.controller";
import { lectureValidation } from "../../validator/lecture.validator";

export const lectureRouter = express.Router();

lectureRouter.get("/", index);
lectureRouter.get("/create", create);

lectureRouter.get("/:id", show);

lectureRouter.post("/", lectureValidation, store);

lectureRouter.put("/:id", lectureValidation, update);

lectureRouter.delete("/:id", destroy);
