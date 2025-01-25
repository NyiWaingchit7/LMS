"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("@/controller/user.controller");
const auth_1 = require("@/utils/auth");
exports.userRouter = express_1.default.Router();
exports.userRouter.use(auth_1.checkauth);
exports.userRouter.get("/", user_controller_1.index);
exports.userRouter.get("/:id", user_controller_1.show);
exports.userRouter.post("/", user_controller_1.store);
exports.userRouter.put("/:id", user_controller_1.update);
exports.userRouter.delete("/:id", user_controller_1.destroy);
