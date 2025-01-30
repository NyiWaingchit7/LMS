import express from "express";

import { index, show } from "../../controller/popular-lecture.controller";

export const userPopularLectureRouter = express.Router();

userPopularLectureRouter.get("/", index);

userPopularLectureRouter.get("/:id", show);
