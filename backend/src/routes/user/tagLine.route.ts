import express from "express";
import { index } from "../../controller/tagline.controller";

export const userTagLineRouter = express.Router();

userTagLineRouter.get("/", index);
