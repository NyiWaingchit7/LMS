import express from "express";
import { registerValidation } from "../../validator/user/auth.validator";
import { login, register, verify } from "../../controller/user/auth.controller";
export const userAuthRouter = express.Router();

userAuthRouter.post("/register", register);
userAuthRouter.post("/verify", verify);
userAuthRouter.post("login", login);
