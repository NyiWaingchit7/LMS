import express from "express";
import {
  create,
  destroy,
  index,
  searchLecture,
  show,
  store,
  update,
} from "../controller/lecture.controller";
import { checkauth } from "../../utils/auth";
import { lectureValidation } from "../validator/lecture.validator";

export const lectureRouter = express.Router();

lectureRouter.get("/", checkauth, index);
lectureRouter.get("/create", checkauth, create);

lectureRouter.get("/:id", checkauth, show);

lectureRouter.post("/", checkauth, lectureValidation, store);

lectureRouter.put("/:id", checkauth, lectureValidation, update);

lectureRouter.delete("/:id", checkauth, destroy);
