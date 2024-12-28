import express from "express";
import { checkauth } from "../../utils/auth";
import { index, store } from "../controller/setting.controller";
import { settingValidation } from "../validator/setting.validator";

export const settingRouter = express.Router();

settingRouter.get("/", checkauth, index);
settingRouter.post("/", checkauth, settingValidation, store);
