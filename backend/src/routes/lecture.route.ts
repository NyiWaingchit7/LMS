import express from "express";
import {
  destroy,
  index,
  show,
  store,
  update,
} from "../controller/lecture.controller";
import { checkauth } from "../../utils/auth";

export const lectureRouter = express.Router();

lectureRouter.get("/", checkauth, index);

lectureRouter.get("/:id", checkauth, show);

lectureRouter.post("/", checkauth, store);

lectureRouter.put("/:id", checkauth, update);

lectureRouter.delete("/:id", checkauth, destroy);
