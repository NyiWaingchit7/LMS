import express from "express";
import {
  destroy,
  index,
  show,
  store,
  update,
} from "../controller/lecture.controller";

export const lectureRouter = express.Router();

lectureRouter.get("/", index);

lectureRouter.get("/:id", show);

lectureRouter.post("/", store);

lectureRouter.put("/:id", update);

lectureRouter.delete("/:id", destroy);
