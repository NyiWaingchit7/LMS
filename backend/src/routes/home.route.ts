import express from "express";
import { checkauth } from "../../utils/auth";
import { home } from "../controller/home.controller";
export const homeRouter = express.Router();

homeRouter.get("/", checkauth, home);
