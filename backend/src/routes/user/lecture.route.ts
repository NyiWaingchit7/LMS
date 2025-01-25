import express from "express";
import { index, show } from "@/controller/lecture.controller";

export const userLectureRouter = express.Router();

userLectureRouter.get("/", index);

userLectureRouter.get("/:id", show);
