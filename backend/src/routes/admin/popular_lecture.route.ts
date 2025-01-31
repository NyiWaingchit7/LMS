import express from "express";

import { popularLectureValidation } from "../../validator/popular_lecture.validator";
import {
  create,
  destroy,
  detail,
  index,
  store,
  update,
} from "../../controller/popular-lecture.controller";

export const popularLectureRouter = express.Router();

popularLectureRouter.get("/", index);
popularLectureRouter.get("/create", create);

popularLectureRouter.get("/:id", detail);

popularLectureRouter.post("/", popularLectureValidation, store);

popularLectureRouter.put("/:id", popularLectureValidation, update);

popularLectureRouter.delete("/:id", destroy);
