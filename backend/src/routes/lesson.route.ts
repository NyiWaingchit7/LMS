import express from "express";
import { index } from "../controller/lesson.controller";

export const lessornRouter = express.Router();

lessornRouter.get("/", index);
