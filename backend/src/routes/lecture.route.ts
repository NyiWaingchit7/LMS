import express from "express";
import { index } from "../controller/lecture.controller";

export const lectureRouter = express.Router();

lectureRouter.get("/", index);
