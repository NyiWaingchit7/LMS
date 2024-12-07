"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLessonRouter = void 0;
const express_1 = __importDefault(require("express"));
const lesson_controller_1 = require("../../controller/lesson.controller");
exports.userLessonRouter = express_1.default.Router();
exports.userLessonRouter.get("/", lesson_controller_1.index);
exports.userLessonRouter.get("/:id", lesson_controller_1.show);
