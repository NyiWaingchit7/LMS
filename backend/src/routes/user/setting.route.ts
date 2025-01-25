import express from "express";
import { index } from "@/controller/setting.controller";

export const userSettingRouter = express.Router();

userSettingRouter.get("/", index);
