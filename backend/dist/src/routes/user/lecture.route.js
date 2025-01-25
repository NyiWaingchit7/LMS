"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLectureRouter = void 0;
const express_1 = __importDefault(require("express"));
const lecture_controller_1 = require("@/controller/lecture.controller");
exports.userLectureRouter = express_1.default.Router();
exports.userLectureRouter.get("/", lecture_controller_1.index);
exports.userLectureRouter.get("/:id", lecture_controller_1.show);
