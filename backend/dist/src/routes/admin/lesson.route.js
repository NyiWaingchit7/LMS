"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lessonRouter = void 0;
const express_1 = __importDefault(require("express"));
const lesson_controller_1 = require("@/controller/lesson.controller");
const auth_1 = require("@/utils/auth");
const lesson_validator_1 = require("@/validator/lesson.validator");
exports.lessonRouter = express_1.default.Router();
exports.lessonRouter.use(auth_1.checkauth);
exports.lessonRouter.get("/", lesson_controller_1.index);
exports.lessonRouter.get("/create", lesson_controller_1.create);
exports.lessonRouter.get("/:id", lesson_controller_1.show);
exports.lessonRouter.post("/", lesson_validator_1.lessonValidation, lesson_controller_1.store);
exports.lessonRouter.put("/:id", lesson_validator_1.lessonValidation, lesson_controller_1.update);
exports.lessonRouter.delete("/:id", lesson_controller_1.destroy);
