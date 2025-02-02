"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userPopularLectureRouter = void 0;
const express_1 = __importDefault(require("express"));
const popular_lecture_controller_1 = require("../../controller/popular-lecture.controller");
exports.userPopularLectureRouter = express_1.default.Router();
exports.userPopularLectureRouter.get("/", popular_lecture_controller_1.index);
exports.userPopularLectureRouter.get("/:id", popular_lecture_controller_1.show);
