import express from "express";
import { registerValidation } from "../../validator/user/auth.validator";
import { register } from "../../controller/user/auth.controller";
export const userAuthRouter = express.Router();

userAuthRouter.post("/register", registerValidation, register);
