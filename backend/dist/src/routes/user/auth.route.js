"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuthRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../../controller/user/auth.controller");
exports.userAuthRouter = express_1.default.Router();
exports.userAuthRouter.post("/register", auth_controller_1.register);
exports.userAuthRouter.post("/verify", auth_controller_1.verify);
exports.userAuthRouter.post("login", auth_controller_1.login);
