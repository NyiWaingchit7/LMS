import express from "express";
import {
  changePassword,
  forgetPassword,
  forgetPasswordChange,
  forgetVerify,
  login,
  myProfile,
  profileDelete,
  register,
  verify,
} from "../../controller/user/auth.controller";
import { show, update } from "../../controller/student.controller";
import { usercheckauth } from "../../../utils/auth";
export const userAuthRouter = express.Router();

userAuthRouter.post("/register", register);
userAuthRouter.post("/forget-password", register);
userAuthRouter.post("/verify", verify);
userAuthRouter.post("/log-in", login);
userAuthRouter.get("/my-profile", myProfile);
userAuthRouter.get("/delete-account", profileDelete);
userAuthRouter.get("/forget-password", forgetPassword);
userAuthRouter.get("/forget-password-change", forgetPasswordChange);
userAuthRouter.get("/forget-verify", forgetVerify);
userAuthRouter.get("/change-password", changePassword);

userAuthRouter.post("/edit-profile", update);
