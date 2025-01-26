"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuthRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../../controller/user/auth.controller");
const student_controller_1 = require("../../controller/student.controller");
const auth_1 = require("../../../utils/auth");
const forget_password_validator_1 = require("../../validator/user/forget_password.validator");
const change_password_validator_1 = require("../../validator/user/change_password.validator");
exports.userAuthRouter = express_1.default.Router();
exports.userAuthRouter.post("/register", auth_controller_1.register);
// userAuthRouter.post("/forget-password", register);
exports.userAuthRouter.post("/verify", auth_controller_1.verify);
exports.userAuthRouter.post("/log-in", auth_controller_1.login);
exports.userAuthRouter.get("/my-profile", auth_controller_1.myProfile);
exports.userAuthRouter.delete("/delete-account", auth_controller_1.profileDelete);
exports.userAuthRouter.post("/forget-password", forget_password_validator_1.forgetPasswordValidation, auth_controller_1.forgetPassword);
exports.userAuthRouter.post("/forget-password-change", change_password_validator_1.changePasswordValidation, auth_controller_1.forgetPasswordChange);
exports.userAuthRouter.post("/forget-verify", auth_controller_1.forgetVerify);
exports.userAuthRouter.post("/change-password", change_password_validator_1.changePasswordValidation, auth_controller_1.changePassword);
exports.userAuthRouter.post("/edit-profile", auth_1.usercheckauth, student_controller_1.update);
