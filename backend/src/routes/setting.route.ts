import express from "express";
import { checkauth } from "../../utils/auth";
import { index, store } from "../controller/setting.controller";

export const settingRouter = express.Router();

settingRouter.get("/", index);
settingRouter.post("/", store);
