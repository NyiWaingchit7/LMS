import express from "express";

import { checkauth } from "../../../utils/auth";
import { index, show } from "../../controller/popular-lecture.controller";

export const userPopularLectureRouter = express.Router();
userPopularLectureRouter.use(checkauth);

userPopularLectureRouter.get("/", index);

userPopularLectureRouter.get("/:id", show);
