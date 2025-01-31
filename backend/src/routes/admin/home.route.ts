import express from "express";
import { home } from "../../controller/home.controller";
export const homeRouter = express.Router();

homeRouter.get("/", home);
