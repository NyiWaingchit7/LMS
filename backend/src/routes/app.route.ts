import express from "express";
import { index } from "../controller/app.controller";
export const appRouter = express.Router();
appRouter.get("/", index);
