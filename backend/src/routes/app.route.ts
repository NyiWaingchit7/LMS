import express from "express";
import { index, login } from "../controller/app.controller";
export const appRouter = express.Router();
appRouter.get("/", index);
appRouter.post("/log-in", login);
