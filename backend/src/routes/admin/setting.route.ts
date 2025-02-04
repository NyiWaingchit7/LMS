import express from "express";
import { index, store } from "../../controller/setting.controller";
import { settingValidation } from "../../validator/setting.validator";

export const settingRouter = express.Router();

settingRouter.get("/", index);
settingRouter.post("/", store);
