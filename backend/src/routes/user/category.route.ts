import express from "express";
import { index, show } from "@/controller/category.controller";
export const userCategoryRouter = express.Router();

userCategoryRouter.get("/", index);

userCategoryRouter.get("/:id", show);
