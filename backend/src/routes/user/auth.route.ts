import express from "express";
import { login, register, verify } from "../../controller/user/auth.controller";
import { show, update } from "../../controller/student.controller";
export const userAuthRouter = express.Router();

userAuthRouter.post("/register", register);
userAuthRouter.post("/forget-password", register);
userAuthRouter.post("/verify", verify);
userAuthRouter.post("/log-in", login);
userAuthRouter.get("/my-profile", show);
userAuthRouter.post("/edit-profile", update);
