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
import { forgetPasswordValidation } from "../../validator/user/forget_password.validator";
import { changePasswordValidation } from "../../validator/user/change_password.validator";
export const userAuthRouter = express.Router();

userAuthRouter.post("/register", register);
userAuthRouter.post("/forget-password", register);
userAuthRouter.post("/verify", verify);
userAuthRouter.post("/log-in", login);
userAuthRouter.get("/my-profile", myProfile);
userAuthRouter.get("/delete-account", profileDelete);
userAuthRouter.get(
  "/forget-password",
  forgetPasswordValidation,
  forgetPassword
);
userAuthRouter.get(
  "/forget-password-change",
  changePasswordValidation,
  forgetPasswordChange
);
userAuthRouter.get("/forget-verify", forgetVerify);
userAuthRouter.get(
  "/change-password",
  changePasswordValidation,
  changePassword
);

userAuthRouter.post("/edit-profile", usercheckauth, update);
